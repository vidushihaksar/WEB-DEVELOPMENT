let fs = require("fs");
console.log("Started executing");
console.log("cpu is busy now");
let content = fs.readFileSync("f1.html");
console.log(content.byteLength);
console.log("cpu is fre now");
