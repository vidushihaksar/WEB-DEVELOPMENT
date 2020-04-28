function promisecreater(){
    return new Promise(function mfn(resolve, reject){
        setTimeout(function(){
            resolve(10);
        },2000);
    })
}
let pPromise = promisecreater();
console.log("pending receives from p1");
console.log(pPromise);
console.log("--------------------------");

function resolve(data){
    console.log("Inside resolve of Ist then")
    console.log(data);
    console.log("------------------------------");
    return 20;
}

function reject(data){
    console.log(data);
}

const pPromiseFromThen = pPromise.then(resolve, reject)
console.log("pending received from then");
console.log(pPromiseFromThen);

setTimeout(function(){
    console.log("-------------------------");
    console.log(pPromiseFromThen);
},1500);