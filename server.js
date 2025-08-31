const express=require('express')
const mongoose=require('mongoose')
const path =require('path')
const port=3022

const app=express();
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/userss')
const db= mongoose.connection
db.once('open',()=>{
    console.log("mongodb connection succesful")
})

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    pass:String
})
const Users=mongoose.model("data",userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'signup.html'))
})

app.post('/post',async(req,res)=>{
    const {name,email,pass}=req.body
    const user= new Users({
        name,
        email,
        pass
    })
    await user.save()
    console.log(user)
    res.send("signup succesfull")
})

app.listen(port,()=>{
    console.log("server started")
})





