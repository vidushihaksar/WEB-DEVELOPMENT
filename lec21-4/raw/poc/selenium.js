let fs = require("fs")
require("chromedriver");
let swd = require("selenium-webdriver");
let metadataFile = process.argv[3];
let credentialFile = process.argv[2];
let courseName = process.argv[4];

let username, password, gmodules
let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build();

let credentialFileWillBeReadPromise = fs.promises.readFile(credentialFile);
credentialFileWillBeReadPromise.then(function(credentials){
    credentials = JSON.parse(credentials);
    username = credentials.username;
    password = credentials.password
    let pepPageWillBeOpenedPromise = driver.get("https://www.pepcoding.com/login")
    return pepPageWillBeOpenedPromise
})

.then(function(){
    let emailWillBeSelevtedPromise = driver.findElement(swd.By.css("input[type=email"))
    let passwordWillBeSelevtedPromise = driver.findElement(swd.By.css("input[type=password"))
    
    let combinedPromise = Promise.all([emailWillBeSelevtedPromise, passwordWillBeSelevtedPromise]);
    return combinedPromise;

}).then(function(elementArray){
    let emailWillBeSendPromise = elementArray[0].sendKeys(username);
    let passwordWillBeSendPromise = elementArray[1].sendKeys(password);

    let combinedInputPromise = Promise.all([emailWillBeSendPromise, passwordWillBeSendPromise]);
    return combinedInputPromise;

}).then(function(){
    let buttonWillBeSelevtedPromise = driver.findElement(swd.By.css("button[type=submit]"))
    return buttonWillBeSelevtedPromise;
}).then(function(buttonElement){
     let buttonWillBeSelectedPromise = buttonElement.click();
    return buttonWillBeSelectedPromise;

}).then(function () {
    // you shouls always wait 
    let willWaitForResourceToLoad = driver.wait(swd.until.elementLocated(swd.By.css(".resource a")));
    return willWaitForResourceToLoad;

}).then(function(){
    let resourceCardAnchorWillBeSelectedPromise = driver.findElement(swd.By.css(".resource a"));
    return resourceCardAnchorWillBeSelectedPromise;
}).then(function(resourceCardAnchor){
    let resPageLinkPromise = resourceCardAnchor.getAttribute("href");
    return resPageLinkPromise;
}).then(function(rPageLink){
    let navigateToCoursePage = driver.get(rPageLink)
    return navigateToCoursePage;
}).then(function(){
    let siteoverlayWillBeSelectedPromise = driver.findElement(swd.By.css("#siteOverlay"));
    return siteoverlayWillBeSelectedPromise;
}).then(function(soe){
    let waitForOverlay = driver.wait(swd.until.elementIsNotVisible(soe),10000);
    return waitForOverlay
}).then(function(){
    let courseWillBeLocatedPromise = driver.findElement(swd.By.css("#courseCard33"))
    return courseWillBeLocatedPromise;
}).then(function(courseCard){
    let courseCardWillBeClickedPromise = courseCard.click();
    return courseCardWillBeClickedPromise;
}).then(function(){
    let metaDataWillBeReadPromise = fs.promises.readFile(metadataFile);
    return metaDataWillBeReadPromise;
}).then(function(metadata){
    metadata = JSON.parse(metadata);
    let que = metadata[0];
    let willOpenQuePagePromise = driver.get(que.url);
    return willOpenQuePagePromise;
})
.catch(function(err){
    console.log(err);
})



// function gotoQue(){
//     .then(function(){
//         let lisTabToBeLocatedPromise = driver.wait(swd.until.elementsLocated(swd.By.css(".lis.tab"),10000))
//         return lisTabToBeLocatedPromise;
//     })
    
    
//     .then(function(){
//         let modulesWillBeSelectedPromise =     driver.findElements(swd.By.css(".lis.tab"));
//         return modulesWillBeSelectedPromise;
//     }).then(function(modules){
//         gModules = modules;
    
//         let modulesTextPromiseArr=[];
//         for(let i=0; i< modules.length; i++){
//             let moduleNAmePromise = modules[i].getText();
//             modulesTextPromiseArr.push(moduleNAmePromise);
//         }
//         let AllModuleNamePromise = Promise.all(modulesTextPromiseArr);
//         return AllModuleNamePromise;
//     }).then(function(AllModuleText){
//         let i;
//         for(i=0; i< AllModuleText.length; i++){
//             if(AllModuleText[i].includes("Dynamic Programming")==true){
//                 break;
//             }
//         }
    
//         let moduleWillBeClickedPromise = gModules[i].click();
//         return moduleWillBeClickedPromise;
//     }).then(function(){
    
//     })
    
//}



//search email => input
//input email
//search password => password
//input password
//search submit
//press submit

///--------------------------------- run command = sh pep.sh -----------------------------------------

