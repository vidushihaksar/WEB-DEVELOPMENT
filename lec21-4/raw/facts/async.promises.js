let fs = require("fs");
console.log("before")
console.log("start")

let fillWillBeReadPromise = fs.promises.readFile("f1.html")

fillWillBeReadPromise.then(function(content){
    console.log("content"+" ")
    console.log("finish")
})

fillWillBeReadPromise.catch(function(err){
    console.log(err)
})
console.log("after")
