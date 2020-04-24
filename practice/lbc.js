let request = require("request");
let cheerio =  require("cheerio");
let fs = require("fs");

let url = "https://www.espncricinfo.com/series/19322/commentary/1187683/new-zealand-vs-india-2nd-odi-india-in-new-zealand-2019-20"

request(url,function(err, res, html){
    if(res.statusCode== 200){
        parseHtml(html)
        
    }else if(statusCode == 404){
        console.log("invalid url")
    }
    else{
        console.log(err)
    }

})
function parseHtml(html){
     let $  = cheerio.load(html);
     let content = $(".item-wrapper .description");
     
     let con = $(content[0]).text();
     console.log(con);
}