import axios from "axios";
import { useEffect, useState } from "react";
import { SideBar } from "./Sidebar";
import { Post } from "./Post";
import { useParams } from "react-router-dom";

const SearchedPost = ({ setModal, isLoggedIn }) => {
  const { query } = useParams();
  const [posts, setPosts] = useState([]);
  const [notify, setNotify] = useState("");

  useEffect(() => {
    setPosts("");
    setNotify("");
    fetchData();
  }, [query]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/search/${query}`);
      setPosts(res.data.posts);
    } catch (error) {
      setNotify(error.response.data.message);
    }
  };

  return (
    <div className=' h-screen'>
      <SideBar />
      <div className='pt-20 '>
        <h1 className='text-xl mb-4 md:w-[650px] md:mx-auto'>
          {`Search Results of`} {<span className='font-semibold'>{query}</span>}
        </h1>
        {notify && (
          <div className='text-xl mb-4 md:w-[650px] md:mx-auto'> {notify} </div>
        )}
        {posts &&
          posts.map((post) => (
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
export default SearchedPost;
