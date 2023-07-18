import "./profilerightbar.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import axios from "axios";
export default function Rightbar() {
  const [profilesdata, setprofilesdata] = useState("");
  const [freindsdata, setfreindsdata] = useState("");


  
  
  
  const profiledata = localStorage.getItem("thekey");
  
  const myprofile = JSON.parse(profiledata);
  
  console.log(typeof myprofile);
  
  const [followed, setFollowed] = useState(
    myprofile.followings.includes(profilesdata._id)?true:false
  );





  const { Username } = useParams();
  console.log({ Username });

  const fetchprofiles = async (e) => {
    const a = await fetch(`http://localhost:7000/auth/fetchsignup/${Username}`);
    const b = await a.json();
    console.log(b);
    setprofilesdata(b);
  };

  useEffect(() => {
    fetchprofiles();
  }, []);

  console.log(profilesdata);

  console.log(profilesdata._id);

  const fetchfreinds = (e) => {
    // e.preventDefault();

    fetch(`http://localhost:7000/user/friends/${profilesdata._id}`)
      .then((a) => a.json())
      .then((z) => setfreindsdata(z));
  };

  console.log(freindsdata);





 







  return (
    <>


      
      <div className="profilerightbar">


        {profilesdata.Username!==myprofile.Username&&(<button className="rightbarFollowButton" onClick={e=>{{
  try {
    if (followed) {
      axios.put(`http://localhost:7000/user/${profilesdata._id}/unfollow`, {
        userId: myprofile._id,
      });
      
    } else {
     axios.put(`http://localhost:7000/user/${profilesdata._id}/follow`, {
        userId: myprofile._id,
      });
    }
     setFollowed(!followed);
    
  } catch (err) {
  }
};}}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>)}
      
        <div className="profilerightbarWrapper">
          <h4 className="profilerightbarTitle">
            <h3> {"About" + "         " + profilesdata.Username}</h3>{" "}
          </h4>
          <div className="profilerightbarInfo">
            <div profilerightbarInfoItem>
              <span className="profilerightbarInfoKey">city:</span>
              <span className="profilerightbarInfoValue">
                {profilesdata.city}
              </span>
            </div>
            <div profilerightbarInfoItem>
              <span className="profilerightbarInfoKey">From: </span>
              <span className="profilerightbarInfoValue">
                {profilesdata.from}
              </span>
            </div>
            <div profilerightbarInfoItem>
              <span className="profilerightbarInfoKey">Relationship:</span>
              <span className="profilerightbarInfoValue">
                {profilesdata.relationship}
              </span>
            </div>
          </div>
          <h4 className="profilerightbarTitle">My Profile</h4>
          <div className="profilerightbarFollowings">
            <div className="profilerightbarFollowing">
              <img
                className="profilerightbarFollowingImg"
                src={ 'http://localhost:7000/images/'+profilesdata.profilePicture || "/assets/person/1.jpeg"}
                alt=""
              ></img>
              <span className="profilerightbarFollowingName">
                {profilesdata.Username}
              </span>
            </div>
          </div>
          <button className="profilerightbarbutton" onClick={fetchfreinds}>
            Freinds
          </button>

          <div className="profilerightbarFollowings">
            {freindsdata &&
              freindsdata.map((x) => (
                 <div   className="profilerightbarFollowing">
                <Link to={`/profileRightbar/${x.Username}`}>  <img
                    className="profilerightbarFollowingImg"
                    src={'http://localhost:7000/images/'+x.profilePicture || "/assets/person/1.jpeg"}
                    alt=""
                  ></img></Link>
                <span className="profilerightbarFollowingName">
                    {x.Username}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
