const fs = require('fs')
const path = require('path')
function treefn(dirpath) {
    if (dirpath == undefined) {
      console.log("Please Enter a  Directory Path");
      return;
    } else {
      let doesExist = fs.existsSync(dirpath);
      if (doesExist) {
        treeHelper(dirpath, " ");
      } else {
        console.log("Please Enter a valid Directory Path");
      }
    }
  }
  
  function treeHelper(targetPath, indent) {
    let pathCheck = fs.lstatSync(targetPath).isFile();
    if (pathCheck) {
      let fileName = path.basename(targetPath);
      console.log(indent + "├──" + fileName);
    } else {
      let dirName = path.basename(targetPath);
      console.log(indent + "└──" + dirName);
  
      let children = fs.readdirSync(targetPath);
      for (let i = 0; i < children.length; i++) {
        let childPath = path.join(targetPath, children[i]);
        treeHelper(childPath, indent + "\t");
      }
    }
  }

  module.exports = {
    treekey : treefn
  }