let fs = require("fs");
console.log("Started ecxecuting");
console.log("cpu is stuck");

fs.readFile("f1.html",function(err, content){
    console.log(content.byteLength);
})

console.log("cpu is free now");
