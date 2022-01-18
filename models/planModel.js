
/// Plan Schema

const planSchems = new mongose.Schema({
    id : {
        type : Number,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    ratings : {
        type : Number
    },
    price : {
        type : Number,
    },
    delivery : {
        type : Boolean,
    },
    meals :{
        type : Number,
    },
    description : {
        type : String
    }

})