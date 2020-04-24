let request = require("request")
let fs = require("fs");

console.log("before");

request("http://www.google.com", function(err, res, html){
    if(er === null && res.statusCode === 200 ){
        fs.writeFile("index.html", html, function(err){
            console.log("file written to disk");
        })
    }
    else if(res.statusCode === 404){
        console.log("invalid url");
    }
    else{
        console.log(err);
        console.log(res.statusCode);
    }

})

console.log("after");