
const express = require("express");
const app = express();
const cookieParser= require('cookie-parser');
const rateLimit = require("express-rate-limit");




app.listen(process.env.PORT || "4000", () => {
  console.log("running");
});

app.use(rateLimit({ 
  max : 100,
  message : "too many requests , try after sometime",
  windowMs : 15*60*1000
}))

app.use(express.json());
app.use(express.static("public")); ///! to server public folder on browser , client jo hai vo sirf public folder ki files ko access kr sakta hai 
app.use(cookieParser());  /// req ki body ke ander , cookies ko populate kr deta hai  , ek tarike se req ke object me cookie ki key bna deta hai 

///! use case of next
app.use((req, res, next) => {
  console.log("i am middleware");
  next();
});

function showPage(req, res) {
  res.sendFile("./public/index.html", { root: __dirname });
}

const homeRouter = express.Router();
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter')
const planRouter = require('./routes/planRouter')
const reviewRouter = require('./routes/reviewRouter');
app.use("/auth", authRouter);
app.use("/user" , userRouter);
app.use("/plan" , planRouter);
app.use("/review", reviewRouter);
app.use("/", homeRouter);


// app.use(express.static('index'))

homeRouter.route("/").get(showPage);

///! redirect
app.get("/user-all", (req, res) => {
  res.redirect("/");
});


//! 404 page
app.use((req, res) => {
  res.sendFile("/public/404.html", { root: __dirname });
});


