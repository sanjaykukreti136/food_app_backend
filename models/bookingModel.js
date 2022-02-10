const mongose = require('mongoose');
const {link} = process.env || require('../secrets')
// const validator = require('email-validator');


/// CONNNECT DATABASE 
mongose.connect(link).then(()=>{
    console.log('db connect');
}).catch((err)=>{
    console.log(err);
})
/// Plan Schema

const bookingSchema = new mongose.Schema({
    
    user : {
        type : mongose.Schema.ObjectId,
        required : true,
        ref : "userModel"
    },
    plan : {
        type : mongose.Schema.ObjectId,
        required : true,
        ref : "planModel"
    },
    bookedAt : {
        type : Date,
        default : Date.now()
    },
    priceAtThatTime :{
        type : Number,
        required : true
    },
    status : {
        type: String,
        enum : ["pending" , "failed", "sucess"],
        default : "pending"
    }

})


const bookingModel = mongose.model('bookingModel', bookingSchema );

module.exports = bookingModel;