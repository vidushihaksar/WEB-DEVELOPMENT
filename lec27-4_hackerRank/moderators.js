// "pwd" :"paarth0303",
// "user" :"theace031999@gmail.com"

let fs = require("fs");
require("chromedriver");
let swd = require("selenium-webdriver");
let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build();

let cFile = process.argv[2];
let questionsFile = process.argv[3];

( async function(){

    try{
//************ login ******************************** */
        await loginHelper();
        
        let adminLinkAnchor = await driver.findElement(swd.By.css(  "a[data-analytics=NavBarProfileDropDownAdministration"));
        
        let adminPageUrl =  await adminLinkAnchor.getAttribute("href");
        await driver.get(adminPageUrl);
        
//************* manage challenges *********************************** */



await driver.navigate().refresh();
await waitForOverlay();
        let manageTab =  await driver.findElements(swd.By.css(".administration header ul li"));
        await manageTab[1].click();

        let manageChallengePage = await driver.getCurrentUrl();
        
        await waitForOverlay();

        //await createNewChallenge();
        let questions = require(questionsFile);
        
        //json file read
        for(let i=0; i<questions.length; i++){
            
            await driver.get(manageChallengePage);
            await waitForOverlay();
            await createNewChallenge(questions[i]);

        }

        console.log("logged in");

    }
    catch(err){
        console.log(err);
    }


})()


async function loginHelper(){
    await driver.manage().setTimeouts({ implicit: 10000, pageLoad: 10000})

        let data = await fs.promises.readFile(cFile);
        let {url, pwd, user} = JSON.parse(data);

        await driver.get(url);
         
        let userNameImputWillBePromise = driver.findElement(swd.By.css("#input-1"));
        let passwordImputWillBePromise = driver.findElement(swd.By.css("#input-2"));
    
        let loginElem = await Promise.all( [userNameImputWillBePromise,passwordImputWillBePromise  ] )
         
        let usernameWillBeSendPromise = loginElem[0].sendKeys(user);
        let pswdWillBeSendPromise = loginElem[1].sendKeys(pwd);
        
        await Promise.all([ usernameWillBeSendPromise, pswdWillBeSendPromise]);
        let loginBtn = await driver.findElement(swd.By.css("button[data-analytics=LoginPassword]"));
        await loginBtn.click();

}
async function waitForOverlay(){
   let loader= await driver.findElement(swd.By.css("#ajax-msg"));
   await driver.wait(swd.until.elementIsNotVisible(loader));
}
async function editorHandler(parentSelector, element, data){
    let textAreaParent= await driver.findElement(swd.By.css(parentSelector));
        await driver.executeScript("arguments[0].style.height='10px'", textAreaParent);
        await element.sendKeys(data);

}
async function createNewChallenge(question){
    let createChallenge = await driver.findElement(swd.By.css(".btn.btn-green.backbone.pull-right"));
       
    await createChallenge.click();


        await waitForOverlay();

        //challenge name, description, problem statement, input format, constraints, output format, tags, save changes
        const EleSlecetor = ["#name", "textarea.description", "#problem_statement-container .CodeMirror textarea", "#input_format-container .CodeMirror textarea", "#constraints-container .CodeMirror textarea", "#output_format-container .CodeMirror textarea", "#tags_tag"];

        let eleWillBeSlectedPromise = EleSlecetor.map(function(selector){
            return driver.findElement(swd.By.css(selector));

        })

        let AllElements  = await Promise.all(eleWillBeSlectedPromise);

        //submit name, description
        let namewillAddedPromise = AllElements[0].sendKeys(question["Challenge Name"]);
        let descWillAddedPromise = AllElements[1].sendKeys(question["Description"]);
        await Promise.all( [namewillAddedPromise,descWillAddedPromise] );



        await editorHandler("#problem_statement-container .CodeMirror div",AllElements[2], question["Problem Statement"]);
        await editorHandler("#input_format-container .CodeMirror div",AllElements[3], question["Input Format"]);
        await editorHandler("#constraints-container .CodeMirror div",AllElements[4], question["Constraints"]);
        await editorHandler("#output_format-container .CodeMirror div", AllElements[5] ,question["Output Format"]);

        let TagsInput = AllElements[6];
        await TagsInput.sendKeys(question["Tags"]);
        await TagsInput.sendKeys(swd.Key.ENTER);
        let submitBtn = await driver.findElement(swd.By.css(".save-challenge.btn.btn-green"));
        await submitBtn.click();

}