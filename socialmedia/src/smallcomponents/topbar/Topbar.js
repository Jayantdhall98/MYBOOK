import "./topbar.css";
import { Search, Person, Chat, Notifications } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Topbar(props) {

    const y=props.x
    console.log(y)
    const[query,setquery]=useState('')
    const[showresult,setshowresult]=useState(false)


    const Result=()=>{
      setshowresult(true)
    }
    const hideResult=()=>{
      setshowresult(false)
    }

   
  const profiledata=localStorage.getItem("thekey")


  const myprofile=JSON.parse(profiledata)

console.log(typeof(myprofile))


  const navigate=useNavigate()
   const gotohome=()=>{
      navigate('/home')

   }
   const gotoprofile=()=>{
      navigate(`/profile/${myprofile.Username}`)

   }
   const gototimeline=()=>{
      navigate('/feed')

   }
   const gotoallusers=()=>{
      navigate('/allusers')

   }
   
   const gotochat=()=>{
      navigate('/messenger')

   }
   



  return (
<>
    <div    
 className="topbarContainer">
      <div className="topbarLeft"  onClick={hideResult}>
        <span className="logo">MY BOOK</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
            onChange={e=>setquery(e.target.value)}
            onClick={Result}
          />

         
        </div>
    
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span onClick={gotohome} className="topbarLink">Homepage</span>
          <span onClick={gototimeline} className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div onClick={gotoallusers} className="topbarIconItem">
            <  Person />
            <span className=""></span>
          </div>
          <div className="topbarIconItem"  onClick={gotochat}>
            <Chat  onClick={gotochat} />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <img onClick={gotoprofile} src={'http://localhost:7000/images/'+myprofile.profilePicture||"/assets/person/1.jpeg"} alt="" className="topbarImg"/>
         <span className="topbarLink">{myprofile.Username}</span>

      </div>
    </div>
        {/* {y&&y.map((data)=>(
            <div className="searchdata">
            <img className="searchdataimg" src={data.img||"/assets/person/3.jpeg"} alt=""></img>
            <h2>{data.Username}</h2>
            </div>
          ))} */}

          {
          showresult&&y&&y.filter(data=>{
              if(query===""){
                return data;

              }else if(data.Username.toLowerCase().includes(query.toLowerCase())){
                return data;
              }
            }).map((data)=>(
              <div  className="searchdata">
            <Link to={`/profile/${data.Username}`} style={{textDecoration:"none"}} >  <img className="searchdataimg" src={data.img||"/assets/person/3.jpeg"} alt=""></img></Link>
            <Link to={`/profile/${data.Username}`}  style={{textDecoration:"none"}}> <h2  >{data.Username}</h2></Link>
              </div>
            ))
          }
    </>
  );
}
