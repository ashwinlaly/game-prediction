var Mongoose = require('mongoose');

Mongoose.connect("mongodb://localhost:27017/games",{useNewUrlParser: true},function(err,res){
    if(err){
        console.log(err);
    } else {
       // console.log(res);
    }
});

/*const db = Mongoose.connection;

db.once('open',() =>{
    const userCollection = db.collection('users');
    const Cs = userCollection.watch();

    Cs.on('change',(data) =>{
        console.log(data);
    });
    
});*/