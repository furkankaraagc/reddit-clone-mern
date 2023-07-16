import { useEffect, useState } from 'react';

import { Post } from './Post';
import { Filter } from '../Filter';
import { useParams } from 'react-router-dom';

export const Posts = ({ isLoggedIn, setModal, sort, setSort }) => {
  const [posts, setPosts] = useState([]);
  const { sortType } = useParams();

  useEffect(() => {
    fetchData();
  }, [sort]);

  const fetchData = async () => {
    await fetch(`https://blog-app-mern-85pk.onrender.com/posts/${sortType}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data));
  };

  return (
    <div className='sm:mx-5 '>
      <Filter sort={sort} setSort={setSort} sortType={sortType} />
      {posts.map((post) => {
        return (
          <Post
            key={post._id}
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
