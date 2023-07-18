const express = require("express");
const app = express();
var mongoose = require("mongoose");
var mymodel = require("../Schemas/Schema1");
const user = express.Router();

const bcrypt = require("bcrypt");

// user.get("/", (req, res) => {
//   res.send("you are on User page....");
// });



//get a user
user.get("/:id", async (req, res) => {
  const user = await mymodel.findById(req.params.id)
   res.status(200).json(user)
})

//delete user 
user.delete("/deluser", async (req, res) => {
  const a = await mymodel.deleteOne({ _id: "6330749a4a9d9775e0a44b58" });
  res.send(a);
  console.log("deleted");
});


//update user 
user.put("/updateuser", async (req, res) => {
  const salt = await bcrypt.genSalt(11);
  const hashedspassword = await bcrypt.hash(req.body.Password, salt);

  const a = await mymodel.updateOne(
    { _id: "633290d8f6418782f7da1af1" },
    {
      $set: {
        Username: req.body.Username,
        E_mail: req.body.E_mail,
        Password: hashedspassword,
      
      },
    }
  );
  res.send(a);

  console.log("updated");
});



//
user.put("/updateuser/:userId", async (req, res) => {
  
  
  
  const newpost= await mymodel.updateOne(
    {profilePicture:req.params.userId},
    {$set:req.body}
    
)
res.send(newpost);
});













//get friends
user.get("/friends/:userId", async (req, res) => {
  
    const user = await mymodel.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map(friendId => {
        return mymodel.findById(friendId);
      })

    );
    res.send(friends)
  //   let friendList = [];
  //  friends&& friends.map(friend => {
  //     console.log(friend)
  //     const { _id, Username, profilePicture } = friend;
  //     friendList.push({ _id, Username, profilePicture });
  //   });
  //   res.status(200).json(friendList)
});










//follow user 
user.put('/:id/follow',async(req,res)=>{

if(req.body.userId!==req.params.id){
const user =await mymodel.findById(req.params.id)
const currentuser =await mymodel.findById(req.body.userId)
if(!user.followers.includes(req.body.userId)){
await  user. updateOne({$push:{followers:req.body.userId}})
await  currentuser. updateOne({$push:{followings:req.params.id}})
res.send("user has been followed ")
}else{
res.send("you are allready followed this user ")

}


}else{

  res.send("you cant follow yourself ")


}


})




//unfollow user 

user.put('/:id/unfollow',async(req,res)=>{

if(req.body.userId!==req.params.id){
const user=await  mymodel.findById(req.params.id)
const currentuser =await mymodel.findById(req.body.userId) 
if( user.followers.includes(req.body.userId)){

  await user.updateOne({$pull:{followers:req.body.userId}})
  await currentuser.updateOne({$pull:{followings:req.params.id}})
res.send("you unfollowed this user .....")

}else{
res.send("this is not in your followings list ")

}

}else{

res.send("you can't unfoloow yourself ")


}



})










module.exports = user;
