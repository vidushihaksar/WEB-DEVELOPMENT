
// ///--------------------------------- run command = sh pep.sh -----------------------------------------

let fs = require("fs")
require("chromedriver");
let swd = require("selenium-webdriver");
let metadataFile = process.argv[3];
let credentialFile = process.argv[2];
let courseName = process.argv[4];

let username, password, gelemnts,gModules
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
    let emailWillBeSelevtedPromise = driver.findElement(swd.By.css("input[type=email]"))
    let passwordWillBeSelectedPromise = driver.findElement(swd.By.css("input[type=password]"))
    
    let combinedPromise = Promise.all([emailWillBeSelevtedPromise, passwordWillBeSelectedPromise]);
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

})
.then(function () {
        // you should always wait 
        let willWaitForResourceToLoad = driver.wait(swd.until.elementLocated(swd.By.css(".resource a" )));
        return willWaitForResourceToLoad;
})

.then(function(){
    let ResourceAnchorWillBeSelected = driver.findElement(swd.By.css(".resource a"))
    return ResourceAnchorWillBeSelected;
})
.then(function(ResAnchor){
    let hrefAtttrWillBeSelectedPromise =  ResAnchor.getAttribute("href");
    return hrefAtttrWillBeSelectedPromise
})
.then(function(resLink){
    let resCardWillBeSelectedPromise = driver.get(resLink);
    return resCardWillBeSelectedPromise;
})
.then(willWaitForOverlay)

.then(function(){
    let courseWillBeLocatedPromise = driver.findElement(swd.By.css("#courseCard33"))
    return courseWillBeLocatedPromise;
}).then(function(courseCard){
    let courseCardWillBeClickedPromise = courseCard.click();
    return courseCardWillBeClickedPromise;
})
.then(function(){
    let metaDataWillBeReadPromise = fs.promises.readFile(metadataFile);
    return metaDataWillBeReadPromise;
})
.then(function(metadata){
    metadata = JSON.parse(metadata);
    let question = metadata[0];
    let willWaitToBeNavigatedToQnp = goToQuestionPage(question);
    return willWaitToBeNavigatedToQnp;
})
.then(function(){
     console.log("reached");
})
.catch(function(err){
    console.log(err);
})

//************** overlay function  ****************************/
function willWaitForOverlay(){
    let waitTillPromiseIsDismissed = new Promise(function(resolve,reject){

        
        //search overlay
        let siteoverlayWillBeSelectedPromise = driver.findElement(swd.By.css("#siteOverlay"))
    
        //wait
        siteoverlayWillBeSelectedPromise.then(function(soe){
            let waitForOverlay = driver.wait(swd.until.elementIsNotVisible(soe),10000);
            return waitForOverlay
        })
        .then(function(){
            resolve();
        })
        .catch(function(err){
            reject();
        })

    })
    return waitTillPromiseIsDismissed;
}

//********************* go to question page function ************** */
function goToQuestionPage(question){
    return new Promise(function(resolve,reject){

        //will wait for overlay
        let waitPromise = willWaitForOverlay();

        waitPromise.then(function(){
            //will click on module
            let willClickOnModule = navigationHelper(question.module,".lis.tab");
            return willClickOnModule;

        })
        //will wait for overlay
        .then(willWaitForOverlay).then(function(){
            //will click on lecture
            let willClickOnLecture = navigationHelper(question.lecture, ".collection-item");
            return willClickOnLecture;
        })
        //will wait for overlay
        .then(willWaitForOverlay).then(function(){
            //will click on question
            let willClickOnQuestion = navigationHelper(question.problem, ".collection-item");
            return willClickOnQuestion;

        })
        .then(function(){
            resolve();
        })
        .catch(function(){
            reject();
        })


    })
}

//************ navigator helper *********************** */
function navigationHelper(nameToBeSelected, selector){
    let gelemnts
    return new Promise(function(resolve, reject){
        
        let modulesToBeLocatedPromise = driver.findElements(swd.By.css(selector));
        
        modulesToBeLocatedPromise.then(function(modules){
            
             gelemnts = modules;
            let modulesText=[];
            for(let i=0; i<modules.length; i++){
                let textToBeLocated = modules[i].getText();
                 modulesText.push(textToBeLocated);
             }
        
             let AllModuleNamePromise = Promise.all(modulesText);
             return AllModuleNamePromise;
        })
        .then(function(AllModuleText){
            let i;
            for(i=0; i<AllModuleText.length; i++){
                if(AllModuleText[i].includes(nameToBeSelected)==true){
                    break;
                }
            }
        
            let modulesToBeClickedPromise = gelemnts[i].click();
            return modulesToBeClickedPromise;
        })
        .then(function(){
            resolve();
        })
        .catch(function(err){
            reject(err);
        })
    
})

}