const express=require('express');

var mongoose=require('mongoose');
var mymodel=require('../Schemas/Schema1')
const Authr=express.Router()

const bcrypt=require('bcrypt')


Authr.get('/',(req,res)=>{
res.send("you are on auth page....")
})


Authr.post("/signup", async(req,res)=>{
    console.log(req)
     const salt= await bcrypt.genSalt(11)
     const hashedspassword=await bcrypt.hash(req.body.Password,salt)
    const a=  await  mymodel.create( {
        Username:req.body.Username,
        E_mail:req.body.E_mail,
        Password:hashedspassword,
        city:req.body.city,
        from:req.body.from,
        relationship:req.body.relationship,


    })
        res.send(a)
    })



    Authr.post('/profile',async(req,res)=>{

        const newpost =await mymodel.create(req.body)
        
        console.log("profile uploded")
        res.send(newpost)
        })
        

        //
        Authr.put("/updateuser/:userId", async (req, res) => {
  
            const user = await mymodel.findById(req.params.userId);
            
            const newpost= await mymodel.updateOne(
              {_id:req.params.id},
              {$set:req.body}
              
          )
          res.send(newpost);
          });






    Authr.get("/fetchsignup", async(req,res)=>{
    console.log(req)

    const a=  await  mymodel.find()
        res.send(a)
    })

    
    Authr.get("/fetchsignup/:Username", async(req,res)=>{
    console.log(req)

    const a=  await  mymodel.findOne({Username:req.params.Username})
        res.send(a)
    })

    Authr.get("/fetchtimelineusers/:id", async(req,res)=>{
        console.log(req)
    
        const a=  await  mymodel.findById(req.params.id)
            res.send(a)
        })


//     Authr.post("/login", async(req,res)=>{
//     console.log(req)

//     // const a=  await  mymodel.findOne({E_mail:req.body.E_mail})
//     let user=  await  mymodel.findOne({ Username:req.body.Username})

//     !user&&res.status(400).send("User Not Found ")
//       console.log(user.Password)
//     let password= await bcrypt.compare(req.body.Password,user.Password)
//     !password && res.status(400).send("invalid password")
// console.log(user)
//    if(  user){
//     res.send(user)
//     console.log("logged in..")
//    }else{
//     console.log("vgghh")

//     res.send("please enter valid cardinals ")
//    }

//     })


Authr.post('/login',async(req,res)=>{
    let user=await mymodel.findOne({Username:req.body.Username})
    if(!user){

     res.send("invalid username")


    }else{
     let password= await bcrypt.compare(req.body.Password,user.Password)


    if(user&&password){
    
    res.send(user)
    console.log("logged in ")
    
    }else{
    
        console.log("invalid cardinals ....")
        res.send("invalid password")
    }
}
    
    })
    

module.exports =Authr;
