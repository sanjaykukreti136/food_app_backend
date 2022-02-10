const express = require("express");
// const planModel = require("../models/planModel");
const planModel = require('../models/planModel')
const app = express();
const planRouter = express.Router();

const {protectRoute , bodyChecker ,isAuthorized} = require('./userRouterHelper');
const { createElement , getElement, getElements , deleteElement , updateElement } = require('../helpers/factory');
app.use(protectRoute)

planRouter.route("/").get( isAuthorized(["admin" , "ce"]),  getElements(planModel)).post( protectRoute ,isAuthorized(["admin"]) ,  createElement(planModel));

planRouter.route("/:id").get(getElement(planModel)).patch( isAuthorized(["admin", "ce"]) , updateElement(planModel)).delete(isAuthorized(["admin"]) , deleteElement(planModel));


module.exports  = planRouter;