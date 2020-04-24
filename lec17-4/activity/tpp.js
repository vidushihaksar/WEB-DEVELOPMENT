let { view } = require("./commands/view")
let { treefy } = require("./commands/treefy")
let { untreefy } = require("./commands/untreefy")
let { help } = require("./commands/help")

//node tpp.js view "/Users/vidushi/Documents/webd/lec17-4/poc/d10" -t      -->      for tree view
//node tpp.js view "/Users/vidushi/Documents/webd/lec17-4/poc/d10" -f      -->      for flat file view



const input = process.argv;
let cmd = process.argv[2];
//node tpp view src -t

switch(cmd){
    case "view":
        view(process.argv[3], process.argv[4]);
        break;
    
    case "treefy":
        treefy(process.argv[3], process.argv[4]);
        break;

    case "untreefy":
        untreefy(process.argv[3], process.argv[4]);
        break;

    case "help":
        help();
        break;
    default:
        console.log("wrong command");
}