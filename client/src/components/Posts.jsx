import axios from "axios";
import { useEffect, useState } from "react";

import { Post } from "./Post";

export const Posts = ({ isLoggedIn, setModal }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch("http://localhost:8000", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data));
  };

  return (
    <div className='sm:mx-5 '>
      {posts.map((post) => {
        return (
          <Post
            post={post}
            fetchData={fetchData}
            isLoggedIn={isLoggedIn}
            setModal={setModal}
          />
        );
      })}
    </div>
  );
};
