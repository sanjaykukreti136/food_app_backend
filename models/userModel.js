const mongose = require('mongoose');
const db = process.env || require('../secrets')
const validator = require('email-validator');
const bcrypt = require("bcrypt")

/// CONNNECT DATABASE 
mongose.connect(db.link).then(()=>{
    console.log('db connect');
}).catch((err)=>{
    console.log(err);
})


// CREATION OF SCHEMA
const userSchema = new mongose.Schema({

    name :{
        type : String,
        required : true
    },
    
    age :{
        type : Number,
        required : true,
    },

    email :{
        type : String,
        required : true,
        unique : true , 
        validate : function(){
           return  validator.validate(this.email);
        }
    },
    password :{
        type : String,
        required : true,
        min : 8
       
    },
    createdAt : {
        type : String
    },
    confirmPassword :{
        type : String,
        required : true,
        min :8,
        validate : function(){
            return this.password == this.confirmPassword;
        }
    },
    token : String,
    roles : {
        type : String,
        enum : ["admin", "ce" , "user"],
        default : "user"
    },
    bookings : {
        type : [mongose.Schema.ObjectId],
        ref : "bookingModel"
    }

})




/// undefined confrimPassword after validation , so it can remove from databse
userSchema.pre('save', async function(){

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt);

    this.confirmPassword = undefined;
} )


//! CREATION OF MODEL
const userModel = mongose.model('userModel', userSchema );

module.exports = userModel;