var express = require('express');
var chalk = require('chalk');
const log = console.log;
var user = require('../models/users');

var route = function(){

    var userRoute = express.Router();
    userRoute.route("/user")
        .get(function(req,res){
            log(chalk.blue("Get All User"));            
            user.find(function(err,val){
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
            log(chalk.blue.bgWhite.bold("Creating an user : ", req.body.username));
            var us = new user({
                "username": req.body.username,
                "email": req.body.email,
                "password": req.body.password,
                "favteam" : req.body.favteam
            });
            us.save(function(err){
                if(err) {
                    log(chalk.red("create user error", req.body.username,err));
                    res.status(202).json({"message": "user creation error"});
                } else {
                    log(chalk.magenta("Account created successfully", req.body.username));
                    res.status(200).json({"message":"user created"});
                }
            });
        })
        userRoute.route("/user/:id")
            .get(function(req,res){
                user.findById(req.params.id,function(err,val){
                    if(err) {
                        log(chalk.red(" ",ers));
                        res.status(404).json({"message": "user not found"});
                    } else {
                        log(chalk.magenta("User Detail"));
                        res.status(200).json(val);
                    }
                });
            })
            .put(function(req,res){
                var data = req.body;
                console.log(data);
                user.findOneAndUpdate({_id: req.params.id},{$set:data},function(err){
                    if(err) {
                        log(chalk.red("update user error", req.body.username,err));
                        res.status(202).json({"message": "user update error"});
                    } else {
                        user.findById(req.params.id,function(ers,val){
                            if(err) {
                                log(chalk.red(" ",ers));
                                res.status(202).json({"message": "user not found"});
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
                console.log(data);
                user.findOneAndUpdate({_id: req.params.id},{$set:data},function(err){
                    if(err) {
                        log(chalk.red("patch user error", req.body.username,err));
                        res.status(202).json({"message": "user patch error"});
                    } else {
                        user.findById(req.params.id,function(ers,val){
                            if(err) {
                                log(chalk.red(" ",ers));
                                res.status(202).json({"message": "user not found"});
                            } else {
                                log(chalk.magenta("Patch Success"));
                                res.status(200).json(val);
                            }
                        });
                    }
                });
            })
            .delete(function(req,res){
                user.findOneAndDelete({_id:req.params.id},function(err){
                    if(err) {
                        log(chalk.red("delete user error", req.body.username,err));
                        res.status(202).json({"message": "user delete error"});
                    }else {
                        user.find(function(err,val){
                            log(chalk.magenta("Deleted and user listed"));
                            res.status(200).json(val);
                        });
                    }
                });
            });

    userRoute.route("/signin")
        .post(function(req,res){
            log(chalk.blue.bgWhite.bold("User Login", req.body.email));
            var us = {
                "email": req.body.email,
                "password": req.body.password
            };
            user.find(us,function(err,val){
                if(err) {
                    log(chalk.red("User not found ", req.body.email,err));
                    res.status(202).json({"message": "user not found"});
                } else {
                    if(val.length == 0 ){
                        log(chalk.red("No user", req.body.email,err));
                        res.status(202).json({"message": "please create an account"});
                    } else {
                        log(chalk.magenta("Login success", req.body.email));
                        res.status(200).json({"message":"login success"});
                    }
                }
            });
        })

    return userRoute;

};

module.exports = route;