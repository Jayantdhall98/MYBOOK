import React, { useEffect, useState } from 'react'
import './allusers.css'
import { useNavigate } from 'react-router-dom'
import Topbar from '../topbar/Topbar'
export default function Allusers() {

const [users,setusers]=useState('')

const navigate=useNavigate()



const profiledata=localStorage.getItem("thekey")
  const myprofile=JSON.parse(profiledata)





  //fetch users 
       const fetchusers=async()=>{

     const a=await fetch("http://localhost:7000/Auth/fetchsignup")
      const data=await a.json()
      console.log(data)
setusers(data)
       }
 
console.log(users)



useEffect(()=>{


fetchusers();

},[])






  return (

    <>
    <Topbar x={users}/>
    
      {users&&users.map((data)=>(
          

  
<div className="container">
  
 <ul className="userslist">
  <li className="users">
 <div   onClick={e=>{navigate(`/profile/${data.Username}`)}} className="userprofile">
  <img className="userimage" src={'http://localhost:7000/images/'+data.profilePicture||"/assets/person/3.jpeg"} alt=""></img>
  <span className="username">{data.Username}</span>
      
       <span className='btn' > Go to profile</span>
                           
        
         
         
    
    
    
    

  
 </div>
 </li>
  </ul>
</div>
  
   


      ))}


       
    </>
  )
}
