var express = require('express');
var chalk = require('chalk');
const log = console.log;

var game = require('../models/games');

var route = function(){

    var gameRoute = express.Router();
    gameRoute.route("/game")
        .get(function(req,res){
            log(chalk.blue("Get All game"));            
            game.find(function(err,val){
                if(err) { 
                    log(chalk.blue(err)); 
                    res.statusMessage("Server down");
                    res.status(400).end();
                    log(chalk.red("Error in get"));
                }
                log(chalk.green("Success"));
                res.status(200).json(val);
            });
        })
        .post(function(req,res){
            log(chalk.blue.bgWhite.bold("Creating an game "));
            var ga = new game({
                "hometeam": {
                    "isBatting" : req.body.hometeam.isBatting,
                    "id" : req.body.hometeam.id,
                    "hometeamscore": req.body.hometeam.hometeamscore
                },
                "awayteam": {
                    "isBatting" : req.body.awayteam.isBatting,
                    "id" : req.body.awayteam.id,
                    "awayteamscore": req.body.awayteam.awayteamscore
                },
                "venue": {
                    "name" : req.body.venue.name,
                    "shortName" : req.body.venue.shortName
                },
                "status": req.body.status,
                "isMatchDrawn" : req.body.isMatchDrawn,
                "winningTeamId" : req.body.winningTeamId,
                "startDateTime" : req.body.startDateTime,
                "endDateTime" : req.body.endDateTime
            });
            ga.save(function(err){
                if(err) {
                    log(chalk.red("create game error",err));
                    res.status(202).json({"message": "game creation error"});
                } else {
                    log(chalk.magenta("game created successfully"));
                    res.status(200).json({"message":"game created"});
                }
            });
        })
        gameRoute.route("/game/:id")
            .put(function(req,res){
                var data = req.body;
                game.findOneAndUpdate({_id: req.params.id},{$set:data},function(err){
                    if(err) {
                        log(chalk.red("update game error",err));
                        res.status(202).json({"message": "game update error"});
                    } else {
                        game.findById(req.params.id,function(ers,val){
                            if(err) {
                                log(chalk.red(" ",ers));
                                res.status(202).json({"message": "game not found"});
                            } else {
                                log(chalk.magenta("Update Success"));
                                res.status(200).json(val);
                            }
                        });
                    }
                });
            })
            .patch(function(req,res){
                var data = req.body;
                game.findOneAndUpdate({_id: req.params.id},{$set:data},function(err){
                    if(err) {
                        log(chalk.red("patch game error",err));
                        res.status(202).json({"message": "game patch error"});
                    } else {
                        game.findById(req.params.id,function(ers,val){
                            if(err) {
                                log(chalk.red(" ",ers));
                                res.status(202).json({"message": "game not found"});
                            } else {
                                log(chalk.magenta("Patch Success"));
                                res.status(200).json(val);
                            }
                        });
                    }
                });
            })
            .delete(function(req,res){
                game.findOneAndDelete({_id:req.params.id},function(err){
                    if(err) {
                        log(chalk.red("delete game error",err));
                        res.status(202).json({"message": "game delete error"});
                    }else {
                        game.find(function(err,val){
                            log(chalk.magenta("Deleted and game listed"));
                            res.status(200).json(val);
                        });
                    }
                });
            });

    return gameRoute;

};

module.exports = route;