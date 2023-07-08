import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "./Post";
import { SideBar } from "./Sidebar";
import axios from "axios";
import { Comments } from "./Comments";

const RelatedPost = ({ setModal, isLoggedIn }) => {
  const { postId } = useParams();

  const [post, setPost] = useState("");
  const [comments, setComments] = useState([]);

  const token = localStorage.getItem("token");

  const fetchComments = async () => {
    const res = await axios.get(`http://localhost:8000/comments/${postId}`, {
      headers: {
        Authorization: token,
      },
    });
    setComments(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [comments]);

  const fetchData = async () => {
    const res = await axios.get(`http://localhost:8000/post/${postId}`);
    setPost(res.data);
  };
  return (
    <div>
      <SideBar />
      <div className='pt-20 lg:ml-56 h-screen '>
        {post && (
          <div className='bg-gray-200'>
            <Post
              post={post}
              setModal={setModal}
              isLoggedIn={isLoggedIn}
              fetchData={fetchData}
            />
            <Comments
              setModal={setModal}
              comments={comments}
              setComments={setComments}
              fetchComments={fetchComments}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default RelatedPost;
