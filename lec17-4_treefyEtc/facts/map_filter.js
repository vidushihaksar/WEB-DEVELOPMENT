let arr =[4,14,17,23,48,66]

let myarr = arr.map(function(num){
    if(num%2==0){
        return num +1;
    }
    else{
        return num-1;
    }
})
console.log(myarr);

let myarr2 = myarr.filter(function isPrime(num) {
   
    for (let i = 2; i*i <= num; i++){
        if (num % i === 0)
            return false;
        return num;
    }
})

console.log(myarr2);