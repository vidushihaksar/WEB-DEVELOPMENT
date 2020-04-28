
let fs = require("fs");
require("chromedriver");
let swd = require("selenium-webdriver");
let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build();

let cFile = process.argv[2];
let uToAdd = process.argv[3];

( async function(){

    try{
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

        // let adminBtn = (await driver).findElement(swd.By.css(  "a[data-analytics=NavBar"));
        console.log("logged in");

    }
    catch(err){
        console.log(err);
    }


})()