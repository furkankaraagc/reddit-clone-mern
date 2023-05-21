import axios from "axios";
import { useEffect, useState } from "react";

import { Post } from "./Post";
import { Filter } from "./Filter";
import { useParams } from "react-router-dom";

export const Posts = ({ isLoggedIn, setModal, sort, setSort }) => {
  const [posts, setPosts] = useState([]);
  const { sortType } = useParams();
  console.log(sortType);

  useEffect(() => {
    fetchData();
  }, [sort]);

  const fetchData = async () => {
    await fetch(`http://localhost:8000/posts/${sortType}`, {
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
      <Filter sort={sort} setSort={setSort} />
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
