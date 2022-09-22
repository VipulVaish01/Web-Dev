const fs = require("fs");
const path = require("path");

let types = {
  media: ["mp4", "mkv", "mp3", "jpeg", "jpg"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  documents: [
    "docx",
    "doc",
    "pdf",
    "xlsx",
    "xls",
    "odt",
    "ods",
    "odp",
    "odg",
    "odf",
    "txt",
    "ps",
    "tex",
  ],
  app: ["exe", "dmg", "pkg", "deb"],
};

function organise(dirpath) {
  let destpath;
  if (dirpath == undefined) {
    console.log("Please Enter a Directory Path");
    return;
  } else {
    let doesExist = fs.existsSync(dirpath);
    if (doesExist) {
      destpath = path.join(dirpath, "organised_files");
      if (fs.existsSync(destpath)) {
        console.log("Organised folder already exist");
      } else {
        fs.mkdirSync(destpath);
      }
    } else {
      console.log("Please enter a valid Directory path");
    }
  }

  organiseHelper(dirpath, destpath);
}

function organiseHelper(src, dest) {
  let content = fs.readdirSync(src);
  console.log("content of the source folder are " + content);
  for (let i = 0; i < content.length; i++) {
    let contentPath = path.join(src, content[i]);
    let isFile = fs.lstatSync(contentPath).isFile();
    // console.log(isFile)
    if (isFile) {
      let fileCategory = getCategory(content[i]);
      console.log(content[i] + " belongs to " + fileCategory);
      sendFiles(contentPath, dest, fileCategory);
    }
  }
}

function getCategory(name) {
  let ext = path.extname(name).slice(1);
  // console.log(ext);

  for (let type in types) {
    let typeArr = types[type];
    for (let i = 0; i < typeArr.length; i++) {
      if (ext == typeArr[i]) {
        return type;
      }
    }
  }
  return "others";
}

function sendFiles(fileSrcPath, destPath, fileCategory) {
  let fileCategoryPath = path.join(destPath, fileCategory);
  if (!fs.existsSync(fileCategoryPath)) {
    fs.mkdirSync(fileCategoryPath);
  }
  let fileName = path.basename(fileSrcPath);
  let fileAddress = path.join(fileCategoryPath, fileName);
  fs.copyFileSync(fileSrcPath, fileAddress);
  fs.unlinkSync(fileSrcPath);
}

module.exports = {
  organisekey: organise,
};
