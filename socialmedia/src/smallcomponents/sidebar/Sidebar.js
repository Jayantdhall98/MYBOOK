import "./sidebar.css"
import { RssFeed ,Chat} from '@mui/icons-material';
import Closefreinds from "../closefreinds/Closefreinds";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [freindsdata, setfreindsdata] = useState("");

const navigate=useNavigate()


 const gotofeed=()=>{
navigate('/feed')

 }
 const gotomessenger=()=>{
navigate('/messenger')

 }

 const profiledata = localStorage.getItem("thekey");

 const myprofile = JSON.parse(profiledata);

 const fetchfreinds = (e) => {
  // e.preventDefault();

  fetch(`http://localhost:7000/user/friends/${myprofile._id}`)
    .then((a) => a.json())
    .then((z) => setfreindsdata(z));
};

useEffect(()=>{
  fetchfreinds();
},[myprofile._id])


console.log(freindsdata);


  return (
    <div  className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
    <li onClick={gotofeed} className="sidebarListItem">
     <RssFeed  className="sidebarIcon"/>
     <span className="sidebarListItemText">Feed</span>
    </li>
    <li className="sidebarListItem">
            <Chat className="sidebarIcon" onClick={gotomessenger}/>
            <span className="sidebarListItemText" onClick={gotomessenger} style={{cursor:'pointer'}}>Chats</span>
          </li>

          <li>
            <img className="mybook" src="/assets/socialmedia.jpg" alt=""></img>
          </li>
          {/* <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li> */}
     
        </ul>
         <button className="sidebarButton">Show more</button>
         
         <hr className="sidebarHr"></hr>
         <h1 className="freindheading">My Freinds</h1>
          <ul className="sidebarFreindList">
            <Closefreinds x={freindsdata}/> 
           </ul>
      </div>
    </div>
  )
}
