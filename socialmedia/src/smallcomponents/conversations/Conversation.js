import axios from "axios"
import { useEffect, useState } from "react"
import  "./conversation.css"

export default function Conversation({Conversation}) {

const [ user ,setuser ]= useState(null)

const profiledata=localStorage.getItem("thekey")
const myprofile=JSON.parse(profiledata)


useEffect(()=>{

const freindid=Conversation.members.find((m)=>m!==myprofile._id)

 const getuser=async()=>{
   const res = await axios(`http://localhost:7000/User/${freindid}`)
   setuser(res.data)
 }

 getuser();
},[myprofile._id])

  return (
    <div className="conversation">
       <img
        className="conversationImg"
        src={user&&user.profilePicture||"/assets/person/1.jpeg"}
        alt="image was here "
      />
      <span className="conversationName">{user&&user.Username}</span>
    </div>
  )
}
