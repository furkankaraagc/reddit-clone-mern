import { useEffect, useState } from "react";
import { SideBar } from "./Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Post } from "./Post";

export const Subcategory = ({ setModal, isLoggedIn }) => {
  const [posts, setPosts] = useState([]);
  const { subcategory } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(`http://localhost:8000/sub/${subcategory}`);
    setPosts(res.data);
  };
  return (
    <div>
      <SideBar />
      <div className='pt-20 lg:ml-56 h-screen'>
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
