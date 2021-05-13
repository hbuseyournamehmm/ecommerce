const mongoose=require('mongoose')

const{ObjectId}= mongoose.Schema

const orderSchema=new mongoose.Schema({
    orderItems:[{
        type:ObjectId,
        required:true,
        ref:'OrderItem'

    }],
    shippingAdress:{
        type:String,
        required:true,

    },
    phone_number:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    zip:{
        type:String,
        required:true
    },
    user:{
        type:ObjectId,
        ref:"User",
        requuired:true

    },
    totalPrice:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:'pending',
        required:true
    },
    dateOrder:{
        type:Date,
        default:Date.now(),
        required:true
    }

})

module.exports=mongoose.model('Order',orderSchema)