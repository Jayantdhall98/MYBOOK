import React from "react";
import "./signup.css";
// import { Outlet } from 'react-router-dom'
import { useState } from "react";
import { Link } from "react-router-dom";
export const Signup = () => {
  const [Username, setUsername] = useState("");
  const [E_mail, setE_mail] = useState("");
  const [Password, setPassword] = useState("");
  const [Re_Password, setRe_Password] = useState("");
  const [city, setcity] = useState("");
  const [from, setfrom] = useState("");
  const [relationship, setrelationship] = useState("");

  const signupdata = async () => {
    if (Password === Re_Password) {
      const x = { Username, E_mail, Password, city, from, relationship };
      await fetch("http://localhost:7000/Auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(x),
      })
        .then(alert("signedup succesfully!"))
        .then(
          setUsername(""),
          setE_mail(""),
          setPassword(""),
          setRe_Password(""),
          setcity(""),
          setfrom(""),
          setrelationship("")
        );
    } else {
      alert("password doesn't matched....");
    }
  };

  return (
    <div className="wrapper">
      <div className="logo">
        <img src="/assets/loginpic.png" alt=""></img>
      </div>
      <div className="text-center mt-4 name">MY BOOK</div>
      <form className="p-3 mt-3">
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user">Username</span>
          <input
            type="text"
            placeholder="Enter your username"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>{" "}
          <br></br>
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key">E_mail</span>
          <input
            type="email"
            placeholder="Enter your email"
            value={E_mail}
            onChange={(e) => setE_mail(e.target.value)}
          ></input>{" "}
          <br></br>
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key">Password</span>
          <input
            type="password"
            placeholder="Enter your password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>{" "}
          <br></br>
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key">Confirm password</span>
          <input
            type="password"
            placeholder="Re-Enter your password"
            value={Re_Password}
            onChange={(e) => setRe_Password(e.target.value)}
          ></input>{" "}
          <br></br>
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key">City</span>
          <input
            type="text"
            placeholder="Enter your city name"
            value={city}
            onChange={(e) => setcity(e.target.value)}
          ></input>{" "}
          <br></br>
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key">From</span>
          <input
            type="text"
            placeholder="Enter your state and country"
            value={from}
            onChange={(e) => setfrom(e.target.value)}
          ></input>{" "}
          <br></br>
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key">Relationship</span>
          <input
            type="text"
            placeholder="Enter your relationship status"
            value={relationship}
            onChange={(e) => setrelationship(e.target.value)}
          ></input>{" "}
          <br></br>
        </div>
        <button onClick={signupdata} className="btn mt-3">
          signup
        </button>
      </form>
      <div className="text-center fs-6">
        <Link to="/login">
          {" "}
          <input type="button" className="btn mt-3" value="Login"></input>
        </Link>
      </div>
    </div>
  );
};
