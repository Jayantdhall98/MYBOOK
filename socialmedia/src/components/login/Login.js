import React from "react";

import './login.css'
import { Link, useNavigate } from "react-router-dom";
// import { Outlet } from "react-router-dom";
import { useState } from "react";
export const Login = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");




  function wrongpassword(){
    alert("invalid cardinals entered....")

  }


  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const x = { Username, Password };
    let user = await fetch("http://localhost:7000/Auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(x),
    });

    user = await user.json();
    if (user) {
      localStorage.setItem("thekey", JSON.stringify(user));
      console.log("login working  ");
      navigate(`/profile/${Username}`);
      alert("login success");
    } else {

      wrongpassword();
      alert("invalid cardinals ");
      console.log("wrong cardinals entered ...");
    }
  };

  return (
    <>
     
<div className="wrapper">
        <div className="logo">
            <img src="/assets/loginpic.png" alt=""></img>
        </div>
        <div className="text-center mt-4 name">
            MY BOOK
        </div>
        <form className="p-3 mt-3">
            <div className="form-field d-flex align-items-center">
                <span className="far fa-user"></span>
                <input type="text" name="userName" id="userName" onChange={(e) => setUsername(e.target.value)} placeholder="Username"></input>
            </div>
            <div className="form-field d-flex align-items-center">
                <span className="fas fa-key"></span>
                <input type="password" name="password" id="pwd" onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
            </div>
            <button onClick={login} className="btn mt-3">Login</button>
        </form>
        <div className="text-center fs-6">

        <Link to="/">  <input type="button" className="btn mt-3" value="signup" ></input></Link>


           </div>
    </div>


      
    </>
  );
};
