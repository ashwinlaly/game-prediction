var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    bodyParser = require('body-parser');

var userRoute = require('./routes/usersRoute')();
var gameRoute = require('./routes/gamesRoute')();
var teamRoute = require('./routes/teamsRoute')();
var db = require('./db');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    res.setHeader("Access-Control-Allow-Credentials",false);
    res.setHeader("Access-Control-Allow-Methods","GET, PUT, PATCH, DELETE, POST");
    next();
});

app.use(userRoute);
app.use(gameRoute);
app.use(teamRoute);

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    //res.send("whoo whoo!!!  You can Predict.");
})

io.sockets.on("connection",function(socket){
    console.log("User connected");
    socket.emit("connect","success");
});

http.listen(1234,function(){
    console.log("App Started",1234);
});