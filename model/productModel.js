const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema
const productSchema=new mongoose.Schema({
product_name:{
    type:String,
    required:true,
    trim:true,
},
product_price:{
    type:Number,
    required:true,
},
product_quantity:{
    type:Number,
    required:true,

},
product_description:{
    type:String,
    required:true,
},
category:{
    type:ObjectId,
    required:true,
    ref:`Category`
},
product_rating:{
    type:Number,
    defaut:0,
    max:5
},
sold_quantity:{
    type:Number,
    default:0,
},
product_image:{
    type:String,
    required:true
},



},{timestamps:true})



module.exports=mongoose.model('Product',productSchema)

