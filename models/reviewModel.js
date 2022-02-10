const mongose = require('mongoose');
const db = process.env || require('../secrets')
const validator = require('email-validator');


/// CONNNECT DATABASE 
mongose.connect(db.link).then(()=>{
    console.log('db connect');
}).catch((err)=>{
    console.log(err);
})
/// Plan Schema

const reviewSchema = new mongose.Schema({
    review : {
        type : String,
    },
    rating : {
        type : Number,
        min : 1,
        max : 5,
        required : true
    },
    createAt : {
        type : Date,
        default : Date.now
    },
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
    

})


const reviewModel = mongose.model('reviewModel', reviewSchema );

module.exports = reviewModel;