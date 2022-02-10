const express = require("express");
// const reviewModel = require("../models/reviewModel");
const reviewModel = require('../models/reviewModel')
const app = express();
const reviewRouter = express.Router();
const {protectRoute,bodyChecker,isAuthorized  } = require('./userRouterHelper');

const {   getElement, getElements  , updateElement } = require('../helpers/factory');
const planModel = require("../models/planModel");

app.use(protectRoute)

async function createElement(req , res){
    try{
        let review = await reviewModel.create(req.body);
        let planId = review.plan;
        let plan = await planModel.findById(planId);
        plan.reviews.push(review["_id"]);

        if(plan.averageRating){
            let sum = plan.averageRating * plan.reviews.length;
            let newRating = (sum + review.rating) / (plan.reviews.length + 1);
            plan.averageRating = newRating;
        }else{
            plan.averageRating = review.rating;
        }
        await plan.save();
        return res.status(200).json({ message : "review created succesfully" , review : review })
        // plan.save();
    }catch(err){
        return res.status(500).json({ message : err.message });
    }
}

async function deleteElement(req , res){
    try{
        let review  = await reviewModel.findByIdAndDelete(req.body.id);
        console.log("review delete");
        let plan = await planModel.findById(review.plan);
        let reviewIdx = plan.reviews.indexOf(review["_id"]);
        plan.reviews.slice(reviewIdx , 1);
        await plan.save();
        return res.status(200).json({ message : "review deletion done"  })
    }
    catch(err){
        return res.status(500).json({ message : err.message });
    }
}

reviewRouter.route("/").get( isAuthorized(["admin", "ce"]),  getElements(reviewModel)).post( protectRoute , isAuthorized(["admin"]) ,  createElement);

reviewRouter.route("/:id").get(getElement(reviewModel)).patch( isAuthorized(["admin", "ce"]) , updateElement(reviewModel)).delete(isAuthorized(["admin"]) , deleteElement);


module.exports = reviewRouter;