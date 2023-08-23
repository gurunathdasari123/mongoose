const express=require('express')
const app=express()
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
const userRouter=require('./routes/user')
app.use(express.json())

//mongodb connection using mongoose
const url='mongodb://localhost:27017/rest'
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log('mongodb successfully connected')
})
.catch((err)=>{
    console.log(err)
})

app.use('/guru',userRouter)




app.listen(3000)
