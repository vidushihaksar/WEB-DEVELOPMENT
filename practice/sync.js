let fs = require("fs");
console.log("before")
let content =  fs.readFileSync("f1.html")
console.log(content+" ");
console.log("after")