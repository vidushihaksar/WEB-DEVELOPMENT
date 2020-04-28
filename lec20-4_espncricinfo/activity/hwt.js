//highest wicket takerlet request = require("request")
let fs = require("fs");
let cheerio = require("cheerio")
let request = require("request")


console.log("sending request");

request("https://www.espncricinfo.com/series/19322/scorecard/1187683", function(err, res, html){
    if(err === null && res.statusCode === 200){
        console.log("Received request")
        fs.writeFileSync("scorecard.html", html)
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
    console.log("*****parsing html*****")
    let $ = cheerio.load(html);
    let bowlers= $(".scorecard-section.bowling table tbody tr");

    let highestWicket=0;
    let highestWicketTaker = "";
    for(let i=0; i< bowlers.length;i++){
        let bowlerName = $($(bowlers[i]).find("td")[0]).text();
        let wickets = $($(bowlers[i]).find("td")[5]).text();
        
        if(wickets > highestWicket){
            highestWicket = wickets
            highestWicketTaker = bowlerName
        }
    }
    console.log(highestWicketTaker + "           " + highestWicket);
    
}