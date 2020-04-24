let fs = require("fs");

let fileWillBeReadPrmoise = fs.promises.readFile("f1.html");
fileWillBeReadPrmoise.then(function(content){
    console.log(content+" ")
})
fileWillBeReadPrmoise.catch(function(err){
    console.log(err)
})