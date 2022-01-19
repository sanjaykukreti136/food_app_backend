
const express = require("express");
const app = express();
const cookieParser= require('cookie-parser');
app.listen("4000", () => {
  console.log("running");
});

app.use(express.json());
app.use(express.static("public")); ///! to server public folder on browser , iske bare me padna padega

app.use(cookieParser());

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
app.use("/auth", authRouter);
app.use("/user" , userRouter);
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


