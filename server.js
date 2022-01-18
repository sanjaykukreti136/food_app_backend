
const express = require("express");
const app = express();

app.listen("4000", () => {
  console.log("running");
});

app.use(express.json());
app.use(express.static("public")); ///! to server public folder on browser , iske bare me padna padega

///! use case of next
app.use((req, res, next) => {
  console.log("i am middleware");
  next();
});

const homeRouter = express.Router();
const authRouter = express.Router();
app.use("/auth", authRouter);
app.use("/", homeRouter);
authRouter.route("/signup").post(createdAt , getUser).get(showPage);
// app.use(express.static('index'))

homeRouter.route("/").get(showPage);

///! redirect
app.get("/user-all", (req, res) => {
  res.redirect("/");
});

function showPage(req, res) {
  res.sendFile("/public/index.html", { root: __dirname });
}

//! 404 page
app.use((req, res) => {
  res.sendFile("/public/404.html", { root: __dirname });
});



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

const userModel = require('./models/userModel')

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
