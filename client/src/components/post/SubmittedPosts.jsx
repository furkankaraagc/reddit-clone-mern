import axios from 'axios';
import { useEffect, useState } from 'react';
import { SideBar } from '../Sidebar';
import { Post } from './Post';

const SavedPosts = ({ setModal, isLoggedIn }) => {
  const [posts, setPosts] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await axios.get(
      'https://blog-app-mern-85pk.onrender.com/submittedPosts',
      {
        headers: {
          Authorization: token,
        },
      },
    );
    setPosts(res.data);
  };
  return (
    <div className=' bg-[#191A21] min-h-screen '>
      <SideBar />
      <div className='pt-20 md:ml-32 bg-[#191A21]  '>
        <h1 className='md:w-[650px]  md:mx-auto text-2xl text-[#f6f7f9] mb-2 font-semibold'>
          Your Posts
        </h1>
        {posts &&
          posts?.map((post) => (
            <Post
              post={post}
              setModal={setModal}
              isLoggedIn={isLoggedIn}
              fetchData={fetchData}
              isSubmit='true'
            />
          ))}
      </div>
    </div>
  );
};
export default SavedPosts;
