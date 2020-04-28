let fs == require("fs");

function promisifyfs(path){
    let fileWillBeReadPromise = new Promise(function ( success, failure){

        fs.readFile(path, function(err, data){
            if(err){
                failure(err);
            }
            else{
                success(data);
            }
        })
    })
    return fileWillBeReadPromise;
}

let fileWillBeReadPromise = promisifyfs("f1.html");

fileWillBeReadPromise.then(function(data){
    console.log("inside then");
    console.log(data.length);
})
fileWillBeReadPromise.catch(function(err){
    console.log("catch");
})