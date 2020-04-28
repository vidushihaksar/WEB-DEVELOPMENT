let fs = require("fs");
console.log("before")
console.log("start")
//async work ko serially krna hai to => callback ke andar callback
fs.readFile("f1.html", function(err, content){
    if(err){
        console.log(err)
    }
    else{
        console.log(content)
    }
    console.log("finish")
})
console.log("After")