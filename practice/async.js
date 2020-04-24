let fs = require("fs");
console.log("before")
fs.readFile("f1.html",function(err, content ){
    console.log(content+" ");
})
console.log("after")