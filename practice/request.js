let request = require("request");
let fs = require("fs");

let url = "https://www.google.com"
request(url,function(err, res, html){
    if(res.statusCode== 200){
        fs.writeFileSync("index.html",html)
    }else if(statusCode == 404){
        console.log("invalid url")
    }
    else{
        console.log(err)
    }

})