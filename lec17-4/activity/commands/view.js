var fs = require('fs');
var path = require("path");


module.exports.view = function (){
    //console.log(arguments); [0: src, 1: -t]
    let mode = arguments[1];
    let src  = arguments[0];

    if(mode == "-t"){
        viewAsTree(src,"");
    }
    else if(mode == "-f"){
        viewAsFlatFile(src);
    }
    else{
        console.log("Wrong mode");
    }
}

function viewAsTree(src, indent){
    let ans = fs.lstatSync(src).isFile();
    if(ans == true){
        console.log(indent + path.basename(src)+"*");
    }
    else{
        console.log(indent + path.basename(src));
        let children = fs.readdirSync(src);

        for(let i=0; i< children.length;i++){
            let child = children[i];
            let childpath = path.join(src, child);
            viewAsTree(childpath, indent + "\t");
        }

    }
}

function viewAsFlatFile(src){
    let ans = fs.lstatSync(src).isFile();
    if(ans == true){
        console.log(src+"*");
    }
    else{
        console.log(src);
        let children = fs.readdirSync(src);

        for(let i=0; i< children.length;i++){
            let child = children[i];
            let childpath = path.join(src, child);
            viewAsFlatFile(childpath);
        }

    }
}