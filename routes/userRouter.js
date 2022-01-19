const express = require("express");
const userModel = require("../models/userModel");
const app = express();
const cookieParser= require('cookie-parser');
const userRouter = express.Router();
const protectRoute = require('./userRouterHelper');


userRouter.route("/").get( protectRoute ,  showUser);




///// ! FUNCTIONS

async function showUser(req , res){
    try{
    let users =await userModel.find();
    if(users){
        return res.json(users);
    }else{
        return res.json({
            message : "users not found"
        })
    }
}
catch(err){
    return res.json({ message : err.message });
}
}

module.exports = userRouter;