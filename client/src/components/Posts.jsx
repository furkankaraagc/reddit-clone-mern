import { useEffect, useState } from "react";
import {
  BsCaretDown,
  BsCaretUp,
  BsCaretDownFill,
  BsCaretUpFill,
  BsChatLeft,
  BsBookmark,
} from "react-icons/bs";

export const Posts = ({ isLoggedIn }) => {
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
    <div className='sm:mx-5'>
      {posts.map((post) => {
        return (
          <div
            key={post._id}
            className='hover:border-gray-400  flex cursor-pointer mb-2  border-gray-200 border-2 bg-white md:w-[650px] md:mx-auto '
          >
            <div className='bg-gray-50 flex flex-col justify-start text-center p-2 '>
              <button
                onClick={() => {
                  voteHandler(post, "upvote");
                }}
              >
                {post.votedBy[
                  post.votedBy.findIndex(
                    (element) => element.user === localStorage.getItem("userId")
                  )
                ]?.voteType === "upvote" && isLoggedIn ? (
                  <i className='text-2xl '>
                    <BsCaretUpFill />
                  </i>
                ) : (
                  <i className='text-2xl '>
                    <BsCaretUp />
                  </i>
                )}
              </button>

              <span className='font-semibold'> {post.vote} </span>
              <button
                onClick={() => {
                  voteHandler(post, "downvote");
                }}
              >
                {post.votedBy[
                  post.votedBy.findIndex(
                    (element) => element.user === localStorage.getItem("userId")
                  )
                ]?.voteType === "downvote" && isLoggedIn ? (
                  <i className='text-2xl '>
                    <BsCaretDownFill />
                  </i>
                ) : (
                  <i className='text-2xl '>
                    <BsCaretDown />
                  </i>
                )}
              </button>
            </div>
            <section className='p-2'>
              <div className='flex'>
                <p className='font-semibold text-sm pr-2'>{post.subcategory}</p>
                <p className='text-sm font-light'>Posted by {post.username}</p>
                <p className='text-sm font-light'>{postDate(post)} </p>
              </div>
              <p className='text-xl mt-1 mb-2'>{post.title}</p>
              <p className='font my-1'>{post.body}</p>
              <div className='flex my-2 gap-3 opacity-80'>
                <div className='flex'>
                  <i className='flex text-center justify-center items-center pr-1'>
                    <BsChatLeft />
                  </i>
                  <p>Comments</p>
                </div>
                <div className='flex'>
                  <i className='flex text-center justify-center items-center pr-1'>
                    <BsBookmark />
                  </i>
                  <p>Save</p>
                </div>
              </div>
            </section>
          </div>
        );
      })}
    </div>
  );
};
