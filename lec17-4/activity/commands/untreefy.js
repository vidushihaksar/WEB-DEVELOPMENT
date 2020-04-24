//file => copy data of file with new name
//directory => move ahead and do  nothing
let fs = require("fs")
let path = require("path")
let uniqid = require("uniqid")

module.exports.untreefy = function(){
    let src = arguments[0]
    let dest = arguments[1]
    let root = {};
    untreefy_fun(src, dest,root)

    let data = JSON.stringify(root);

    fs.writeFileSync(path.join(dest, "metadata.json"),data);

    console.log(root);
}

function untreefy_fun(src, dest, node){
    let ans = fs.lstatSync(src).isFile();
    if(ans === true){
        let newFileName = uniqid();

        node.isFile = true
        node.oldName = path.basename(src)
        node.newName = newFileName
        
        let destPath = path.join(dest, newFileName)
        fs.copyFileSync(src, destPath)
    }
    else
    {
        node.isFile = false
        node.oldName = path.basename(src)
        node.children = []
        
        let children = fs.readdirSync(src);
        for(let i=0; i< children.length;i++){
            let child = children[i];
            let childpath = path.join(src, child);
            let childobj = {}
            untreefy_fun(childpath, dest, childobj);
            node.children.push(childobj)
        }
    }
}