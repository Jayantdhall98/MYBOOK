import React from "react";
import { useState, useEffect } from "react";

import "./profile.css";
// import { Outlet } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Topbar from "../../smallcomponents/topbar/Topbar";
import Sidebar from "../../smallcomponents/sidebar/Sidebar";
import Feed from "../../smallcomponents/feed/Feed";
import Profilerightbar from "../../smallcomponents/profilerightbar/Profilerightbar";
import axios from "axios";
// import { useParams } from 'react-router-dom'
export const Profile = () => {
  const [users, setusers] = useState("");

  const [file, setfile] = useState(null);
  const fetchusers = async () => {
    const a = await fetch("http://localhost:7000/Auth/fetchsignup");
    const data = await a.json();
    console.log(data);
    setusers(data);
  };

  console.log(users);

  useEffect(() => {
    fetchusers();
  }, []);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();

    navigate("/login");
  };

  const profiledata = localStorage.getItem("thekey");

  const myprofile = JSON.parse(profiledata);

  console.log(typeof myprofile);

  // const{Username}=useParams()
  //  console.log({Username})

  const submitHandler = async (e) => {
   e.preventDefault();
  const newpost = {
    userId: myprofile._id,
   };
  if (file) {
    const data = new FormData();
     const filename = Date.now() + file.name;
     data.append("name", filename);
     data.append("file", file);
     newpost.profilePicture = filename;
    console.log(newpost);
    try {
        await axios.post("http://localhost:7000/project/upload", data);
      } catch (err) {
       console.log(err);
     }
   }

   try{

    await axios.put(`http://localhost:7000/user/updateuser/${myprofile._id}`,newpost)
      alert("you have updated your profile .....")
      window.location.reload();
    

    





  }catch(err){

  }







  };

  return (
    <>
      <Topbar x={users} />

      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={myprofile.coverPicture || "/assets/person/10.jpeg"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={ 'http://localhost:7000/images/'+myprofile.profilePicture || "/assets/person/7.jpeg"}
                alt=""
              />
              <form  onClick={submitHandler}  >
                <label htmlFor="file" className="logOut">
                  Change profile
                  <input
                     style={{display:"none"}}
                    type="file"
                    id="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => setfile(e.target.files[0])}
                  ></input>
                </label>
                           <button className="DoneButton" type="submit">Done</button>
              </form>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{myprofile.Username}</h4>
              <span className="profileInfoDesc">
                <h3>Hello my friends!</h3>
              </span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Profilerightbar />
          </div>
        </div>
      </div>
      <button className="logOut" onClick={logout}>
        LOG OUT
      </button>
    </>
  );
};
