const express = require("express");
// const reviewModel = require("../models/reviewModel");
const reviewModel = require('../models/reviewModel')
const app = express();
const reviewRouter = express.Router();
const {protectRoute,bodyChecker,isAuthorized  } = require('./userRouterHelper');

const { createElement , getElement, getElements , deleteElement , updateElement } = require('../helpers/factory');

app.use(protectRoute)

reviewRouter.route("/").get( isAuthorized(["admin", "ce"]),  getElements(reviewModel)).post( protectRoute , isAuthorized(["admin"]) ,  createElement(reviewModel));

reviewRouter.route("/:id").get(getElement(reviewModel)).patch( isAuthorized(["admin", "ce"]) , updateElement(reviewModel)).delete(isAuthorized(["admin"]) , deleteElement(reviewModel));


module.exports = reviewRouter;