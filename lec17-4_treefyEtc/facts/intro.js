let {exec} = require("child_process");

//--------------library--------------------
function lib(number){
    for(let div= 2; div*div <= number; div++){
        if(number % div ==0){
            return false;
        }
    }
    return true;
}
let ans = lib(21);
if(ans == true){
    console.log("No is prime");
}
else{
    console.log("No is not prime");

}

//------------------framework--------------------
function framework(data, success, failure){
    for(let div= 2; div*div <= data; div++){
        if(data % div ==0){
            failure();
            return;
        }
    }
    success();
}
function success(){
    exec("start chrome");
}

function failure(){
    console.log("No is not prime");

    exec("calc");
}
framework(12, success, failure);