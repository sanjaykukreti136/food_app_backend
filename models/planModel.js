const mongose = require('mongoose');
const {link} =process.env || require('../secrets')
// const validator = require('email-validator');


/// CONNNECT DATABASE 
mongose.connect(link).then(()=>{
    console.log('db connect');
}).catch((err)=>{
    console.log(err);
})
/// Plan Schema

const planSchema = new mongose.Schema({
    name : {
        type : String,
        required : [true , "name must be required"],
        unique : [true , "plan name should be unique"],
        maxlength : [60 , "maximum length should be 60"]
    },
    duration : {
        type : Number
    },
    price : {
        type : Number,
        required : true
    },
    discount : {
        type : Number , 
        validate : {
            validator : function(){
                return this.discount < this.price;
            },
            message : "discount should be less than price"
        }
    },
    planImages : {
        type : [String]
    },
    averageRating : Number,
    reviews :{
        type : [mongose.Schema.ObjectId],
        ref : "reviewModel"
    }

})


const planModel = mongose.model('planModel', planSchema );

module.exports = planModel;