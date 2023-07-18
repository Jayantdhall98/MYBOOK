import "./rightbar.css"
import Online from "../online/Online"
export default function Rightbar() {
  return (
    <div className="rightbar">
     <div className="rightbarWrapper">
     <div className="birthdayContainer">
      <img className="birthdayImg" src="/assets/gift.png" alt=""></img>
      <span className="birthdayText">
        <b>gora</b> and <b>3 other</b> have birthday today
      </span>
     </div>
     <img  className="rightbarAd" src="/assets/ad.png" alt=""></img>
      <h4 className="rightbarTitle">Online Freinds</h4>
       <ul className="rightbarFreindList">
       <Online/>
       </ul>
     </div>
    </div>
  )
}
