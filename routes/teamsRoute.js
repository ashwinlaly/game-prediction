var express = require('express');
var chalk = require('chalk');
var log = console.log;
var team = require('../models/teams');

var route = function(){

    var teamRoute = express.Router();
        teamRoute.route("/team")
            .post(function(req,res){
                var tm = new team({
                    "name": req.body.name,
                    "shortName" : req.body.shortName,
                    "logoUrl" : req.body.logoUrl,
                    "teamColour" : req.body.teamColour
                });
                tm.save(function(err){
                    if(err){
                        log(chalk.red("create team error",err));
                        res.status(202).json({"message": "team creation error"});
                    } else {
                        log(chalk.magenta("Team created successfully", req.body.name));
                        res.status(200).json({"message":"team created"});
                    }
                });
            })
            .get(function(req,res){
                team.find(function(err,val){
                    if(err){
                        log(chalk.red("GET team error",err));
                        res.status(202).json({"message": "team get error"});
                    } else {
                        log(chalk.magenta("Team Listed", req.body.name));
                        res.status(200).json(val);
                    }
                });
            })
        teamRoute.route("/team/:id")
            .get(function(req,res){
                team.findById(req.params.id,function(err,val){
                    if(err){
                        log(chalk.red("GET team error",err));
                        res.status(202).json({"message": "team get error"});
                    } else {
                        log(chalk.magenta("Team Listed", req.body.name));
                        res.status(200).json(val);
                    }
                });
            })
            .patch(function(req,res){

            })
            .delete(function(req,res){

            })
            .put(function(req,res){

            })

    return teamRoute;

}

module.exports = route;