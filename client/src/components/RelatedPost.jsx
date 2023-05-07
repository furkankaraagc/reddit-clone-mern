import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "./Post";
import { SideBar } from "./Sidebar";
import axios from "axios";

export const RelatedPost = ({ setModal, isLoggedIn }) => {
  const { postId } = useParams();
  console.log(postId);
  const [post, setPost] = useState("");
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await axios.get(`http://localhost:8000/post/${postId}`);
    setPost(res.data);
  };
  return (
    <div>
      <SideBar />
      <div className='pt-20 lg:ml-56 h-screen'>
        {post && (
          <Post
            post={post}
            setModal={setModal}
            isLoggedIn={isLoggedIn}
            fetchData={fetchData}
          />
        )}
      </div>
    </div>
  );
};
