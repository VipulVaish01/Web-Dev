const helpModule = require("./commands/help")
const organiseModule = require("./commands/organise")
const treeModule = require("./commands/tree")




let input = process.argv.slice(2);
let command = input[0];

switch (command) {
  case "tree":
    treeModule.treekey(input[1]);
    break;
  case "organise":
    organiseModule.organisekey(input[1]);
    break;
  case "help":
    helpModule.helpkey();
    break;
  default:
    console.log("PLEASE ENTER A VALID COMMAND");
}




