let request = require("request")
let fs = require("fs");
let cheerio = require("cheerio")

console.log("before");

request("https://www.espncricinfo.com/series/19322/commentary/1187683", function(err, res, html){
    if(err === null && res.statusCode === 200){
        //fs.writeFileSync("index.html", html)
        parsehtml(html)
        
    }
    else if(res.statusCode === 404){
        console.log("invalid url");
    }
    else{
        console.log(err);
        console.log(res.statusCode);
    }

})

function parsehtml(html){
    console.log("*parsing html*")
    let $ = cheerio.load(html);
    let itemWrapper = $(".item-wrapper .description");
    let text = $(itemWrapper[0]).text();
    console.log(text)
}

console.log("after");