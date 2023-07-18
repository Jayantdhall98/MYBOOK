import React from "react";
import { useState,useEffect } from "react";
import "./home.css";
// import { Outlet } from 'react-router-dom'
import Topbar from "../../smallcomponents/topbar/Topbar";
import Sidebar from "../../smallcomponents/sidebar/Sidebar";
import Feed from "../../smallcomponents/feed/Feed";
import Rightbar from "../../smallcomponents/rightbar/Rightbar";
export default function Home() {

  const [users,setusers]=useState('')
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














  return (
    <>
      <Topbar x={users}/>
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
