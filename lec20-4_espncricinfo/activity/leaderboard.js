// let fs = require("fs");
// let cheerio = require("cheerio")
// let request = require("request")


// console.log("sending request");

// request("https://www.espncricinfo.com/scores/series/19322", function(err, res, html){
//     if(err === null && res.statusCode === 200){
//         console.log("Received request")
//         fs.writeFileSync("scorecard.html", html)
//         parsehtml(html)
        
//     }
//     else if(res.statusCode === 404){
//         console.log("invalid url");
//     }
//     else{
//         console.log(err);
//         console.log(res.statusCode);
//     }

// })
// function parsehtml(html){
//     console.log("*****parsing html*****")
//     let $ = cheerio.load(html);
//     let cards = $(".cscore.cscore--final.cricket.cscore--watchNotes")
//     //console.log(cards.length)

//     for(let i=0; i<cards.length; i++){
//         let matchType = $(cards[i]).find(".cscore_info-overview").html();
//         //console.log(matchType)
//         let test = matchType.includes("ODI")  || matchType.includes("T20")
//         if(test === true){
//             console.log(matchType)

//             let anchor = $(cards[i]).find(".cscore_buttonGroup ul li a").attr("href")
//             let matchLink = `https:///www.espncricinfo.com${anchor}`;
//             goToMarchPage(matchLink)
//         }
//     }
// }
// console.log("------------------------------------------")

// function goToMarchPage(matchLink){
//     request(matchLink, function(err, res, html){
//         if(err === null && res.statusCode === 200){
           
//             handleMatch(html)
//         }
//         else if(res.statusCode === 404){
//             console.log("invalid url");
//         }
//         else{
//             console.log(err);
//             console.log(res.statusCode);
//         }
    
//     })
// }

// function handleMatch(html){
//     const $ = cheerio.load(html)
//     //batsman, runs, format, teams
//    let format =  $(".cscore.cscore--final.cricket .cscore_info-overview").html();
   

//    //teams
//    let teams = $(".sub-module.scorecard h2")
//    let innings = $4(".sub-module.scorecard")
//    console.log(format)

//    for(let i=0; i< innings.length; i++){
//        let batsManRows = $(innings[i]).find(".scorecard-section.batsmen .flex-row .wrap.batsmen");
//        console.log(teams[i].text());
//        for(let br =0; br < batsManRows.length; br++){
//            let batsMan = $(batsManRows[br])
//            let batsManName = batsMan.find(".cell.batsmen").text();
//            let batsManRunns = batsMan.find(".cell.runs").html();
//            console.log(batsManName + " "+ batsManRunns);
//        }
//    }
// }
let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");

// Declarations
let url = `https://www.espncricinfo.com/scores/series/19322`;
let count = 0;
let leaderBoard = [];

request(url, function(err, res, html){
    if(err === null && res.statusCode === 200){
        parseHtml(html);
    }
    else if(res.statusCode === 404){
        console.log("Invalid URL");
    }
    else{
        console.log(err);
        console.log(res.statusCode);
    }
})

function parseHtml(html){
    // parsing series
    let $ = cheerio.load(html);
    let cards = $(".cscore.cscore--final.cricket.cscore--watchNotes");
    for(let i = 0; i < cards.length; i++){
        let matchType = $(cards[i]).find(".cscore_info-overview").html();
        let test = matchType.includes("ODI") || matchType.includes("T20");
        if(test === true){
            // console.log(matchType);
            // find anchors => href => manual request
            let anchor = $(cards[i]).find(".cscore_buttonGroup ul li a").attr("href");
            let matchLink = `https://espncricinfo.com/${anchor}`;
            goToMatchPage(matchLink);
        }
    }
    console.log("..............................");
}

function goToMatchPage(matchLink){
    count++;
    request(matchLink, function(err, res, html){
        if(err == null && res.statusCode === 200){
            handleMatch(html);
            count--;
            if(count == 0){
                console.table(leaderBoard);
            }
        }
        else if(res.statusCode == 404){
            console.log("Invalid URL");
        }
        else{
            console.log(err);
            console.log(res.statusCode);
        }
    })
}

function handleMatch(html){
    const $ = cheerio.load(html);
    // batsMan, runs, format, teams
    let format = $(".cscore.cscore--final.cricket .cscore_info-overview").html();
    format = format.includes("ODI")? "ODI": "T20";
    let teams = $(".sub-module.scorecard h2");
    let innings = $(".sub-module.scorecard");
    // console.log(format);
    for(let i = 0; i < innings.length; i++){
        let batsManrow = $(innings[i]).find(".scorecard-section.batsmen .flex-row .wrap.batsmen");
        let team = $(teams[i]).text();
        for(let br = 0; br < batsManrow.length; br++){
            let batsMan = $(batsManrow[br]);
            let batsManName = batsMan.find(".cell.batsmen").text();
            let batsManRuns = batsMan.find(".cell.runs").html();
            handlePlayer(format, team, batsManName, batsManRuns);
            // console.log(batsManName + " " + batsManRuns);
        }
        // console.log("..............................");
    }
}

function handlePlayer(format, team, batsManName, batsManRuns){
    batsManRuns = Number(batsManRuns);
    for(let i = 0; i < leaderBoard.length; i++){
        let pObj = leaderBoard[i];
        if(pObj.name == batsManName && pObj.team == team && pObj.format == format){
            pObj.runs += batsManRuns;
            return;
        }
    }
    let obj = {
        name: batsManName,
        runs: batsManRuns,
        format: format,
        team: team
    }
    leaderBoard.push(obj);
}