let fs = require("fs");
console.log("Started ececuting");
console.log("cpu is stuck");

fs.readFile("../../f1.html", function(err, data){
    console.log("file 1 read");
})
fs.readFile("../../f2.html", function(err, data){
    console.log("file 2 read");
})
console.log("cpu is free now");
console.log("now i can print something");