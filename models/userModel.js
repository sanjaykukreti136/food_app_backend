const mongose = require('mongoose');
const db = require('../secrets')
const validator = require('email-validator');


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
    }

})




/// undefined confrimPassword after validation , so it can remove from databse
userSchema.pre('save', function(){
    this.confirmPassword = undefined;
} )


//! CREATION OF MODEL
 const userModel = mongose.model('userModel', userSchema );

module.exports = userModel;