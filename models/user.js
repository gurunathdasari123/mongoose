const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    date:{
        required:true,
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('User',userSchema)