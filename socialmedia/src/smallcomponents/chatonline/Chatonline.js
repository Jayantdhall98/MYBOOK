import { useEffect, useState } from "react";
import "./chatonline.css";
import axios from "axios";
export default function Chatonline({onlineusers,currentId,setcurrentchat}) {
 
const [freinds,setfreinds ]=useState([]);
const [onlinefreinds,setonlinefreinds ]=useState([]);

useEffect(()=>{
const getfreinds=async()=>{
  const res = await axios .get (`http://localhost:7000/user/friends/${currentId}`)
    setfreinds(res.data);
}

getfreinds();
},[currentId])

useEffect(()=>{
  setonlinefreinds(freinds.filter(f=>onlineusers.includes(f._id)))
},[freinds,onlineusers]);

return (
    <div className="chatOnline">
          {onlinefreinds&&onlinefreinds.map((o)=>(

            <div className="chatOnlineFriend">
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={'http://localhost:7000/images/'+o.profilePicture||"/assets/person/1.jpeg"}
              alt=""
              />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o.Username}</span>
        </div>
    
              ))}
    </div>
  );
}
