let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");

let url = "https://www.espncricinfo.com/series/19322/scorecard/1187683"
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
    let $ = cheerio.load(html);
    let bowlers= $(".sub-module.scorecard .scorecard-section.bowling table tbody tr")
    let highestWicket =0;
    let highestWicketTaker =""

     for(let i=0; i< bowlers.length; i++){
        let bowlerName = $($(bowlers[i]).find("td")[0]).text();
        let wickets = $($(bowlers[i]).find("td")[5]).text();
        //fs.writeFileSync("bowling.html", bowlerName)
        if(wickets > highestWicket){
            highestWicket = wickets;
            highestWicketTaker = bowlerName;
        }
        
     }
     console.log(highestWicketTaker+" "+highestWicket)
}