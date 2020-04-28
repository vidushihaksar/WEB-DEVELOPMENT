let fs = require("fs")
let path = require("path")
module.exports.treefy = function (){
    let src = arguments[0]
    let dest = arguments[1]
    
    let root = require(path.join(src, "metadata.json"))
    treefy_fn(src,dest, root)
}

function treefy_fn(src, dest, node){
    if(node.isFile == true){
        let srcPath = path.join(src, node.newName)
        let destPath = path.join(dest, node.oldName)
        
        
        fs.copyFileSync(srcPath, destPath);

    }
    else{
        let dirPath = path.join(dest, node.oldName)
        fs.mkdirSync(dirPath)

        let children = node.children;

        for(let i =0; i< children.length; i++){
            let child = children[i];
            let pPath  =  dirPath
            treefy_fn(src,pPath, child)
        }
    }
}