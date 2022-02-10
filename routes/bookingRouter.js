const express = require("express");
// const bookingModel = require("../models/bookingModel");
const bookingModel = require('../models/bookingModel')
const app = express();
const bookingRouter = express.Router();
const {protectRoute,bodyChecker,isAuthorized  } = require('./userRouterHelper');

const {   getElement, getElements  , updateElement } = require('../helpers/factory');
const planModel = require("../models/planModel");
const userModel = require("../models/userModel");
const razorpay = require("razorpay")
const { KEY_ID , KEY_SECRET } = require('../secrets');
var razorpay = new razorpay({
    key_id : KEY_ID,
    key_secret : KEY_SECRET
})
app.use(protectRoute)

async function createElement(req , res){
    try{
        let booking = await bookingModel.create(req.body);
        let bookingId = booking["_id"];
        let userId = req.body.user;
        let user = await userModel.findById(userId);
        user.bookings.push(bookingId);
        await user.save();

        /// razorpay 
        const payment_capture= 1;
        const amount = 500;
        const currency= "INR";
        const options = {
            amount ,
            currency ,
            payment_capture , 
            receipt : `rs_${bookingId}`
        }
         
        const response = await razorpay.orders.create(options);
        console.log(response);
        res.status(200).json({
            response_id : response.id,
            amount : response.amount,
            currency : response.currency,
            message : "payment done",
            booking : booking
        })

    }catch(err){
        return res.status(500).json({ message : err.message });
    }
}

async function deleteElement(req , res){
    try{
        let booking  = await bookingModel.findByIdAndDelete(req.body.id);
        console.log("booking delete");
        let user = await userModel.findById(booking.user);
        let bookingIdx = user.bookings.indexOf(booking["_id"]);
        user.bookings.slice(bookingIdx , 1);
        await user.save();
        return res.status(200).json({ message : "booking deletion done"  })
    }
    catch(err){
        return res.status(500).json({ message : err.message });
    }
}

async function verifyPayment(req , res){
    const secret = KEY_SECRET;

    const shasum =  crypto.createHmac("sha256" , secret);
    shasum.update(JSON.stringify(req.body));
    const digest  = shasum.digest("hex");

    if(digest == req.headers["x-razorpay-signature"]){
        console.log("request is legit");
        return res.status(200).json({message :"done"});
    }else{
        return res.status(400).json({message : "invalid"});
    }
}

bookingRouter.route("/verification" , verifyPayment);

bookingRouter.route("/").get( isAuthorized(["admin", "ce"]),  getElements(bookingModel)).post( protectRoute , isAuthorized(["admin"]) ,  createElement);

bookingRouter.route("/:id").get(getElement(bookingModel)).patch( isAuthorized(["admin", "ce"]) , updateElement(bookingModel)).delete(isAuthorized(["admin"]) , deleteElement);


module.exports = bookingRouter;