var Mongoose = require('mongoose');

Mongoose.connect("mongodb://localhost:27017/games",{useNewUrlParser: true},function(err,res){
    if(err){
        console.log(err);
    } else {
       // console.log(res);
    }
});