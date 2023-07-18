import React, { useRef, useState } from "react";
import "./share.css";
import axios from 'axios'
import {  useNavigate } from "react-router-dom";
import { PermMedia,Label,Room ,EmojiEmotions} from "@mui/icons-material";
export default function Share() {

    const navigate=useNavigate()
   



  const profiledata=localStorage.getItem("thekey")
  const myprofile=JSON.parse(profiledata)
  console.log(typeof(myprofile))

   const desc= useRef()
   const [file,setfile]=useState(null)
   


   const gotoprofile=()=>{
    navigate(`/profile/${myprofile.Username}`)

 }   


   const submitHandler=async(e)=>{
     e.preventDefault()
     const newpost={
      userId:myprofile._id,
      desc:desc.current.value
     };
       if(file){
        const data=new FormData();
        const filename=Date.now() + file.name;
        data.append("name",filename);
        data.append("file",file);
        newpost.img= filename;
        console.log(newpost)
        try{
           await axios.post("http://localhost:7000/project/upload",data);       
        }catch(err){
          console.log(err)
        }

       }
    try{

      await axios.post("http://localhost:7000/posts/post",newpost)
        alert("you have posted your post .....")
        window.location.reload();
      
    }catch(err){

    }




   }




  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          Go to profile
          <img  onClick={gotoprofile}
            className="shareProfileImg"
            src={ 'http://localhost:7000/images/'+ myprofile.profilePicture|| "/assets/person/1.jpeg"}
            alt=""
          ></img>
          <input
            className="shareInput"
            placeholder={"Whats in your mind "+ myprofile.Username+"?"}
            ref={desc}
          ></input>
        </div>
        <hr className="shareHr"></hr>
        {/* {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setfile(null)} />
          </div>
        )} */}
        <form className="shareBottom"  onSubmit={submitHandler}>
          <div className="shareOptions">
            <label  htmlFor="file"   className="shareOption">
              <PermMedia htmlColor="blue" className="shareIcon"/>
              <span className="shareOptionText">photo/vedio</span>
              <input style={{display:"none"}} type='file' id='file' accept='.png,.jpeg,.jpg' onChange={(e)=>setfile(e.target.files[0])} ></input>
            </label>
            <div className="shareOption">
              <Label htmlColor="tomato"  className="shareIcon"/>
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon"/>
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
              <span className="shareOptionText">Emotions</span>
            </div>
          </div>
          <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  );
}
