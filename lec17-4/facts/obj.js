//key : value pair

let cap ={
    name : "Steve",
    lastname : "Rogers",
    age : 45,
    friends : ["peter", "bruce", "tony"],
    address : {
        state : "New York",
        region : "Manhatten"
    },
    isAvenger : true
}
function updateCap(prop, val){
    cap[prop] = val;
}
updateCap("address", "slovalia");

// console.log(cap.name);
// console.log(cap.friends[1]);
// console.log(cap);
// cap.movies=["civil war", "first avenger", "avengers"];

// //update
// cap.age = 46;

// //delete
// delete cap.isAvenger;
console.log(cap);

//console.log(cap.key);            //undefined
