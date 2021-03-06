const express = require("express");
// const userModel = require("../models/userModel");
const userModel = require('../models/userModel')
const app = express();
const cookieParser= require('cookie-parser');
const userRouter = express.Router();
const {protectRoute , bodyChecker, isAuthorized} = require('./userRouterHelper');

const { createElement , getElement, getElements , deleteElement , updateElement } = require('../helpers/factory');

app.use(protectRoute)

userRouter.route("/").get( isAuthorized(["admin", "ce"]),  getElements(userModel)).post(isAuthorized(["admin"]) ,  createElement(userModel));

userRouter.route("/:id").get(getElement(userModel)).patch( isAuthorized(["admin", "ce"]) , updateElement(userModel)).delete(isAuthorized(["admin"]) , deleteElement(userModel));


module.exports = userRouter;