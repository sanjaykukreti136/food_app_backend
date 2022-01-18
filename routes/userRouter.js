const express = require("express");
const userModel = require("../models/userModel");
const app = express();

const userRouter = express.Router();



userRouter.route("/").get( protectRoute ,  showUser);




///// ! FUNCTIONS
let flag = true;
// Boolean f = true
function protectRoute(req, res , next){
     if(flag){
         next();
     }
}

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