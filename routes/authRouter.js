const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const { JWT_KEY }  = require('../secrets');
const authRouter = express.Router();


authRouter.route("/signup").post(createdAt , getUser).get(showPage);

authRouter.route("/login").post(loginUser);




///// ! FUNCTIONS

async function loginUser(req , res){
  try{
  if(req.body.email){
    let user = await userModel.findOne({ email : req.body.email });
    if(user){
      if(user.password == req.body.password){
        let payload = user['_id'];
        let token = jwt.sign( { id: payload } ,   JWT_KEY )
        res.cookie('login' , token , { httpOnly : true } );
       return res.json({ message : "user matched" })
      }else{
       return res.json({ message : "pass not matched" })
      }
    }else{
     return res.json({ message : "mail not found" })
    }
  }else{
   return res.json({ message : "user not found" })
  }
}
catch(err){
 return res.status(500).json({ message : err.message })
}
}




function showPage(req, res) {
    res.sendFile("./public/index.html", { root: __dirname });
  }

  
function createdAt(req , res , next){
    let obj = req.body;
    console.log(obj + " from createdAt");
    let length = Object.keys(obj).length;
    console.log(length);
    if(length == 0){
      return res.status(400).json({ message : " user not found " })
    }
    req.body.createdAt = new Date().toISOString();
    next();
  }
  
  const userModel = require('../models/userModel')
  
  async function getUser(req, res) {
    try{
    let userObj = req.body;
    let user = await userModel.create(userObj);
    console.log(user);
    // res.json({ email , pass , name });
    res.json({
      message : "user signed up",
      userObj : user 
    })
  }
  catch(err){
    res.json({
      message : err.message
    })
  }
  }
  

module.exports = authRouter;