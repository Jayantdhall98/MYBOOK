import React from 'react'
import { Link } from 'react-router-dom'
import './closefreinds.css'
export default function Closefreinds(props) {


  const y=props.x
  console.log(y)
  return (
    <>
    {y&&y.map((freinds)=>(
 <div  >
 <li   className="sidebarFrend">
 <Link  to={`/profileRightbar/${freinds.Username}`}> <img className="sidebarFreindImg"  src={'http://localhost:7000/images/'+freinds.profilePicture||"/assets/person/2.jpeg"} alt=""/></Link>
       <span className="sidebarFreindName">{freinds.Username} </span>

      </li>
</div>
    ))}
   
    </>
  )
}
