import './Messenger.css'
import Conversation from '../../smallcomponents/conversations/Conversation'
import Message from '../../smallcomponents/message/Message'
import ChatOnline from '../../smallcomponents/chatonline/Chatonline'
import Topbar from '../../smallcomponents/topbar/Topbar'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import {io} from "socket.io-client"


export const Messenger=()=> {
const [conversations,setconversations]=useState([])
const [currentchat,setcurrentchat]=useState(null)
const [messages,setmessages]=useState([])
const [arrivalMessage,setArrivalMessage]=useState(null)
const [onlineusers,setonlineusers]=useState([])
const [newmessage,setnewmessage]=useState("")
  const socket=useRef();



const profiledata=localStorage.getItem("thekey")
const myprofile=JSON.parse(profiledata)

const scrollRef = useRef();

useEffect(() => {
  socket.current = io("ws://localhost:8900");
  socket.current.on("getMessage", data => {
    setArrivalMessage({
      sender: data.senderId,
      text: data.text,
      createdAt: Date.now(),
    });
 });
}, []);




useEffect(()=>{
arrivalMessage&&currentchat?.members.includes(arrivalMessage.sender)&&
setmessages((prev)=>[...prev,arrivalMessage]);
},[arrivalMessage,currentchat])




useEffect(()=>{
socket.current.emit("adduser",myprofile._id)
socket.current.on("getusers",(users)=>{
  setonlineusers(users)
})
},[myprofile._id])





useEffect(()=>{
const getconversations= async()=>{

  try{
    const res = await axios.get(`http://localhost:7000/Conversations/${myprofile._id}`)
     setconversations(res.data);
  }catch(err){
    console.log(err)
  }

}
getconversations();
},myprofile._id)


// console.log(currentchat)
useEffect(()=>{
const getmessages=async()=>{

const res =await axios.get (`http://localhost:7000/messages/${currentchat?._id}`)
setmessages(res.data)
}
getmessages();
},[currentchat])

const handlesubmit= async(e)=>{
  e.preventDefault();
  const message={
    sender:myprofile._id,
    text:newmessage,
    conversationId:currentchat._id,
  };

const receiverId= currentchat.members.find((member)=>member !==myprofile._id);
socket.current.emit("sendMessage",{
  senderId:myprofile._id,
  receiverId,
text:newmessage,
});



try{
  const res = await axios .post(`http://localhost:7000/messages`,message);
  setmessages([...messages,res.data])
  setnewmessage("");
}catch(err){
  console.log(err)
}

}




useEffect(()=>{
scrollRef.current?.scrollIntoView({behaviour:"smooth"});
},[messages])
  return (
 <>


    <Topbar/>
  
    <div className='messenger '>
    <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations&& conversations.map(c=>(
                <div  onClick={()=>setcurrentchat(c)}>

                  <Conversation  Conversation={c}  />
                </div>           
            ))}
            
          </div>
          
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
           {

            currentchat ? (
           
              <>
                <div className="chatBoxTop">
                {  messages&&messages.map((m)=>(
                      <div  ref={scrollRef}>
                        
                  <Message message={m}  own={m.sender===myprofile._id}   />
                      </div>
                ))

                }
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e)=>setnewmessage(e.target.value)}
                    value={newmessage}
                  ></textarea>
                  <button className="chatSubmitButton"  onClick={handlesubmit} >
                    Send
                  </button>
                </div>   </>):(<span className="noConversationText">
                 Open a conversation to start a chat.
                           </span> )}
            
          
              
         
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline  onlineusers={onlineusers} currentId={myprofile._id}  setcurrentchat={setcurrentchat}/>
          </div>
        </div>
    </div>


 </>
  )
}
