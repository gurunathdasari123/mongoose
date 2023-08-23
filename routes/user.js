const express=require('express')
const router=express.Router()
const User=require('../models/user')
const bcrypt=require('bcrypt')
const user = require('../models/user')
/// getting all the users from this api
router.get('/user',async(req,res)=>{
try{
    const allUsers=await User.find()
    if(allUsers=== null){
        res.status(404).json({message:'no user found'})
    }
res.status(201).json(allUsers)

}
catch(err){
    res.status(500).json({message:err.message})
}

})


//create the user by using this api


router.post('/user',async(req,res)=>{
const hashedPass=await bcrypt.hash(req.body.password,10) ///hashing the password


const userData=new User({
    name:req.body.name,
    email:req.body.email,
    password:hashedPass
})
try{
const newuser= await userData.save()
res.status(201).json(newuser)
}
catch(err){
    res.status(500).json({message:err.message})

}
})
////get the user by id
router.get('/user/:id',getUser,(req,res)=>{
res.status(201).json(res.user)
})

//update the resource by usingpatch

router.patch('/user/:id',getUser,async(req,res)=>{
if(req.body.name !==null){
    res.user.name=req.body.name
}
if(req.body.email !==null){
    res.user.email=req.body.email
}
if(req.body.password !==null){
    res.user.password=req.body.password
}
    
try{
const userUpdate=await res.user.save()
res.status(201).json(userUpdate)


}catch(err){
console.log(err)
}

})


router.delete('/user/:id',getUser,async(req,res)=>{
    try{
        await User.findByIdAndDelete({_id:req.params.id})
        res.status(201).json('successfully deleted')
    }
    catch(err){
        console.log(err)
    }
})

    async function  getUser(req,res,next){
    let user
    const Id=req.params.id;
    try{
    user=await User.findById(Id)
    if(user=== null){
        res.status(400).json({message:'no user found by Id'})
    }
    console.log(user)
    res.user=user
    next()

}
catch(err){
    console.log(err)
}
}

module.exports=router