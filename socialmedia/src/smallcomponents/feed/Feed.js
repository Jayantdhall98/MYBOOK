import "./feed.css";

import { useEffect } from "react";
import { useState } from "react";
import Share from "../share/Share";
import Post from "../post/Post";
export default function Feed() {
  const profiledata = localStorage.getItem("thekey");

  const myprofile = JSON.parse(profiledata);

  const id = myprofile._id;
  const [mypost, setmypost] = useState("");



  const fetchposts = async () => {
    const timeline = await fetch(
      `http://localhost:7000/posts/timeline/${id}`).then((a) => a.json());

    setmypost(timeline);
  };

  useEffect(() => {
    fetchposts();
  }, []);

  console.log(id);
  console.log(mypost);

  return (
    <div className="feed">
      <div className="feedWrapper">
   < Share />

        {mypost&&mypost.map((p)=>(
          <Post  key={p.id} post={p}/>

        ))}
      </div>
    </div>
  );
}
