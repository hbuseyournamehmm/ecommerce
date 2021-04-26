const mongoose=require('mongoose')
const uuidv1=require('uuidv1')
const crypto= require('crypto')//crypto is default in nodejs so no installmet is required


const userSchema=new mongoose. Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true

    },
    role:{
        type:Number,
        define:0
    },
    hashed_password:{
        type:String,
        required:true
    },
    salt:String

},{timestamps:true})

//virtual fields
userSchema.virtual('password')
// set le nabujne way ma password pataucha
.set(function(password){
    this._password=password
    this.salt=uuidv1()// different string banayera pathaucha
    this.hashed_password=this.encryptPassword(password)//hashed vaneko user wa aru kasaile nabujhne para ma password lai turn garnu

})
.get(function(){
    return this._password
})

userSchema.methods={
    authenticate:function(plainText){
        return this.encryptPassword(plainText)===this.hashed_password
    },
    encryptPassword:function(password){
        if(!password) return ''
        try{
            return crypto
            .createHmac('sha1',this.salt)
            .update(password)
            .digest('hex')
        }catch(err){
            return ''
        }
    }
}




module.exports=mongoose.model('User',userSchema)