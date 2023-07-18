const express=require('express')
const myPosts=express.Router()
const mymodel=require('../Schemas/Schema2')
const usermodel=require("../Schemas/Schema1")

myPosts.get("/",(req,res)=>{

res.send("hello jayant this is posts ")

})

//create a post


myPosts.post('/post',async(req,res)=>{

const newpost =await mymodel.create(req.body)

console.log("post uploded")
res.send(newpost)
})







//update a post 


myPosts.put("/:id/updatepost",async(req,res)=>{

    const post =await mymodel.findById(req.params.id)
     try{ if(post.userId===req.body.userId){
        await post.updateOne({$set:req.body})
        res.send("post has been updated")

      }else{

        res.send("you can update your post only ")
      }
    }catch(err){

res.send(err)
    }

})
// delete a post 

// myPosts.delete("/:id/deletepost",async(req,res)=>{

//     const post =await mymodel.findById(req.params.id)
//     if(post.userId===req.body.userId){
//       await mymodel.deleteOne({id:req.params.id})
//       res.send("your post is deleted ....")
//     }else{

//          res.send("you can delete only your post ...")

//     }
   

// })
myPosts.delete("/:id/deletepost",async(req,res)=>{

  const post =await mymodel.findById(req.params.id)
  
    await mymodel.deleteOne({_id:req.params.id})
    res.send("your post is deleted ....")
  
 

})



//like a post 
myPosts.put("/:id/likes",async(req,res)=>{
     
  try{
    const post =await mymodel.findById(req.params.id)
   if(!post.likes.includes(req.body.userId)){
       await post.updateOne({$push:{likes:req.body.userId}})
        res.send("you have liked it")


   }else{
        
    await post.updateOne({$pull:{likes:req.body.userId}})
        res.send("you have  unliked it")
   }
  }catch(err){res.status(500).json(err)}

})


//getallposts 

myPosts.get('/getallpost',async(req,res)=>{
  
  const post = await mymodel.find()
  res.send(post)
  
})

//get a post 
myPosts.get('/getpost/:id',async(req,res)=>{

  const post = await mymodel.findById(req.params.id)
  res.send(post)
  
  })

//get timeline  posts 

myPosts.get("/timeline/:userId", async (req, res) => {
  

  try {
    const currentUser = await usermodel.findById(req.params.userId);
    const userPosts = await mymodel.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return mymodel.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});








module.exports =myPosts;