import { useEffect, useState } from "react";

export const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    await fetch("http://localhost:8000", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data));
  };

  const postDate = (post) => {
    const postDate = new Date(post.createdAt);
    const currentDate = new Date();
    const hourDiff = Math.floor((currentDate - postDate) / (1000 * 60 * 60));

    let timeAgo;
    if (hourDiff < 1) {
      const minuteDiff = Math.floor((currentDate - postDate) / (1000 * 60));
      return (timeAgo = `${minuteDiff} minutes ago`);
    } else if (hourDiff < 24) {
      return (timeAgo = `${hourDiff} hours ago`);
    } else {
      const dayDiff = Math.floor(hourDiff / 24);
      return (timeAgo = `${dayDiff} days ago`);
    }
  };
  const voteHandler = async (post, voteType) => {
    await fetch("http://localhost:8000/vote", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        postId: post._id,
        voteType: voteType,
      }),
    }).then((res) => res.json());
    getAllPosts();
  };

  return (
    <div className=''>
      <h1>posts</h1>
      <div>
        {posts.map((post) => {
          return (
            <div className='border-black border-2 bg-white '>
              <div>
                <button
                  onClick={() => {
                    voteHandler(post, "upvote");
                  }}
                  className='border-2'
                >
                  upvote
                </button>
                <span> {post.vote} </span>
                <button
                  onClick={() => {
                    voteHandler(post, "downvote");
                  }}
                  className='border-2'
                >
                  downvote
                </button>
              </div>
              <div className='flex'>
                <p>{post.subcategory}</p>
                <p>Posted by {post.username}</p>
                <p>{postDate(post)} </p>
              </div>
              <p>{post.title}</p>
              <p>{post.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
