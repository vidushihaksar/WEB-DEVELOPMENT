let fs = require("fs");
fs.readFile("f1.txt",function(err,res){

    
    if(res.byteLength > 20){
        fs.readFile("f2.txt", function(err, res){
            if(res.byteLength > 40){
                fs.readFile("f6.txt", function(err,res){
                     console.log(`file6 read ${res.byteLength}`)
                })
            }
            else{
                fs.readFile("f7.txt", function(err,res){
                    console.log(`file7 read ${res.byteLength}`)
               })
            }
        })
    }
    else{
        fs.readFile("f3.txt", function(err, res){
            if(res.byteLength < 30){
                fs.readFile("f4.txt", function(err,res){
                     console.log(`file4 read ${res.byteLength}`)
                })
            }
            else{
                fs.readFile("f5.txt", function(err,res){
                    console.log(`file5 read ${res.byteLength}`)
               })
            }
        })
    }
})