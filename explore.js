const express=require('express')
const mongoose=require('mongoose')
const path =require('path')
const port=3021

const app=express();
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/eventss')
const db= mongoose.connection
db.once('open',()=>{
    console.log("mongodb connection succesful")
})

const userSchema=new mongoose.Schema({
    eventName:String,
    eventDate:Date,
    eventTime: String, 
    eventVenue:String,
    eventWebsite:String,
    eventDomain:String,
    eventDescription:String
})
const Event = mongoose.model("data", userSchema);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'add-event.html'))
})

app.post('/post',async(req,res)=>{
    const {eventName,eventDate,eventTime,eventVenue,eventWebsite,eventDomain,eventDescription}=req.body
    const user= new Event({
    eventName,
    eventDate:new Date(eventDate),
    eventTime,
    eventVenue,
    eventWebsite,
    eventDomain,
    eventDescription
    })
    await user.save()
    console.log(user)
    res.send("adding event succesfull")
})

app.listen(port,()=>{
    console.log("server started")
})

