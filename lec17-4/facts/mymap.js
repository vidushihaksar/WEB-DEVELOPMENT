let arr =[4,14,17,23,48,66];

function cb(num){
    if(num%2==0){
        return num +1;
    }
    else{
        return num-1;
    }
}

Array.prototype.mymap = function (cb){
    let myarr =[];
    for(let i=0; i<this.length;i++){
        myarr.push(cb(this[i]));    
    }
    return myarr
}
let myarr  = arr.mymap(cb);
console.log(myarr);