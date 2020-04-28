let arr =[4,14,17,23,48,66];


function cb(num){
    for (let i = 2; i*i <= num; i++){
        if (num % i === 0)
            return false;
        return true;
    }
}
function myfilter(arr, cb){
    let myarr=[];

    for(let i=0; i<arr.length;i++){
        if(cb(arr[i])){
            myarr.push(arr[i]);

        }
    }
    return myarr;
}
let myarr = myfilter(arr,cb);
console.log(myarr);
