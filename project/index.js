




const express = require('express');
const app=express();
app.use(express.json())
const dotenv=require('dotenv')
const corse= require('cors')
app.use(corse())
dotenv.config();
const mongoose =require('mongoose')
const multer = require('multer')
const path =require('path')
mongoose.connect(process.env.D,function(){
console.log("Database connected")

})


app.use("/images",express.static(path.join(__dirname,"public/images")))



const Auth=require("./Routes/Auth");
const User=require("./Routes/User");
const myPosts=require('./Routes/Posts');
const Conversation=require('./Routes/Conversations');
const Message=require('./Routes/Messages');
app.get('/',(req,res)=>{

    res.send("INDEX Page....")
    
    })



    const storage =multer.diskStorage({

        destination: (req,file,cb)=>{
         cb(null ,"public/images");
        },
        filename: (req,file,cb)=>{
            cb(null,req.body.name);
        },

    });

    const upload =multer({storage:storage});
app.post("/project/upload",upload.single("file"),(req,res)=>{

    try{
        return res.status(200).json("file uploaded succesfully..")
    }catch(err){
console.log(err)

    }
});

app.use("/Auth",Auth);
app.use("/user",User);
app.use('/posts',myPosts);
app.use('/Conversations',Conversation);
app.use('/Messages',Message);


app.listen(7000);