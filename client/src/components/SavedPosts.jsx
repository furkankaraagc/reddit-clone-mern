import axios from "axios";
import { useEffect, useState } from "react";
import { SideBar } from "./Sidebar";
import { Post } from "./Post";

export const SavedPosts = ({ setModal, isLoggedIn }) => {
  const [posts, setPosts] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:8000/savedPosts", {
      headers: {
        Authorization: token,
      },
    });
    setPosts(res.data);
  };
  return (
    <div className=' h-screen'>
      <SideBar />
      <div className='pt-20'>
        {posts.map((post) => (
          <Post
            post={post}
            setModal={setModal}
            isLoggedIn={isLoggedIn}
            fetchData={fetchData}
          />
        ))}
      </div>
    </div>
  );
};
