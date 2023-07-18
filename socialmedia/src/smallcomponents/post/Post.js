import "./post.css";
import {format} from 'timeago.js'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
export default function Post({post}) {
  const profiledata=localStorage.getItem("thekey")
  const myprofile=JSON.parse(profiledata)
  console.log(typeof(myprofile))

useEffect(()=>{

  setisliked(post.likes.includes(myprofile._id))

},[myprofile._id,post.likes])




const [like,setlike]=useState(post.likes.length)
const[isliked,setisliked]=useState(false);


const Likehandler=()=>{

  try{
    const x=myprofile._id
    const y=post._id
   axios.put(`http://localhost:7000/posts/${y}/likes`,{userId:x})
  
}
  catch(err){}



  setlike(isliked ? like-1 : like+1)
  setisliked(!isliked);

}




const [user,setuser]=useState('')



       const timelineprofile=async()=>{
          await fetch(`http://localhost:7000/Auth/fetchtimelineusers/${post.userId}`).then(a=>a.json()).then(z=>setuser(z))
        
         

       }
 
useEffect(()=>{
timelineprofile();

},[post.userId])


 
console.log(user.Username)




// const deletepost=(z,p)=>{
  
  


//     if(myprofile._id&&myprofile._id===z){

   
//      const y =myprofile._id
//      console.log(y,z,p)
//      axios.delete(`http://localhost:7000/posts/${p}/deletepost`)
//      alert("post deleted")
    
//     }else{
//       alert("you can delete only your post ")
      
//     }



// }
const deletepost=(p,s)=>{
  
  
  if(myprofile._id===s){

    axios.delete(`http://localhost:7000/posts/${p}/deletepost`)
    alert("post deleted")
   
  }else{
    alert("you can delete only your post .")
  }
   
 
 
 }
  


 

// const deletepost=()=>{

//   try{
//     const x=myprofile._id
//     const y=post._id
//    axios.delete(`http://localhost:7000/posts/${y}/deletepost`,{userId:x})
  
// }
//   catch(err){}




// }


  return (

    <>

   
   <div className="post">
           
      <div className="postWrapper">
        <div className="postTop">
        <div className="postTopLeft">
       <Link to={`/profilerightbar/${user.Username}`} >   <img  className="postProfileImg" src={'http://localhost:7000/images/'+user.profilePicture || "/assets/person/1.jpeg"} alt="" ></img></Link>
          <span className="postUsername">{user.Username}</span>
          <span className="postDate">{format(post.createdAt)}</span>
        </div>
        <div className="postTopRight">
        <button  className="delbutton"    onClick={e=>{
          deletepost(post._id,post.userId)
        }}>
           Delete         
          </button>  
        </div>
        </div>
        <div className="postCenter">

        <span className="postText">{post.desc}</span>
          <img className="postImg" src={ 'http://localhost:7000/images/'+post.img|| "/assets/post/1.jpeg" } alt="" />
 
        </div>
        <div className="postBottom">
            <div className="postBottomLeft">
                <img onClick={Likehandler}   className="likeIcon" src="/assets/heart.png" alt=""></img>
                <img onClick={Likehandler}   className="likeIcon" src="/assets/like.png" alt=""></img>
                  <span className="postLikeCounter">{like}</span>
            </div>
            <div className="postBottomRight">
                <span className="postCommentText">9 comments</span>
            </div>
        </div>
      </div>
    </div>






        </>
  );
}
