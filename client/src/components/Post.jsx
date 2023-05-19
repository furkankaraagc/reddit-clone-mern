import { useEffect, useState } from "react";
import {
  BsCaretDown,
  BsCaretUp,
  BsCaretDownFill,
  BsCaretUpFill,
  BsChatLeft,
  BsBookmark,
  BsBookmarkFill,
} from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";

export const Post = ({ post, isLoggedIn, setModal, fetchData }) => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [notify, setNotify] = useState("");
  const [showNotify, setShowNotify] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    isSaved();
  }, [fetchData]);

  useEffect(() => {
    let timeoutId;
    if (notify) {
      setShowNotify(true);
      timeoutId = setTimeout(() => {
        setShowNotify(false);
      }, 1500);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [notify]);

  const isSaved = async () => {
    if (token) {
      await fetch("http://localhost:8000/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => setSavedPosts(data.savedPosts));
    }
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
    if (!isLoggedIn) {
      return setModal(true);
    }
    await fetch("http://localhost:8000/vote", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        postId: post._id,
        voteType: voteType,
      }),
    }).then((res) => res.json());

    fetchData();
  };
  const saveHandler = async (post) => {
    if (!isLoggedIn) {
      return setModal(true);
    }
    await fetch("http://localhost:8000/savePost", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        postId: post._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => setNotify(data.message));

    fetchData();
  };

  return (
    <div>
      {showNotify && (
        <div className='absolute inset-0 flex justify-center items-end mb-3  '>
          <div className='border-2 border-green-400 py-2 px-5'>{notify}</div>
        </div>
      )}

      {post && savedPosts && (
        <div
          onClick={() => {
            if (
              location.pathname !==
              `${post.subcategory.replace(/\s+/g, "")}/${post._id}`
            ) {
              navigate(`/${post.subcategory.replace(/\s+/g, "")}/${post._id}`);
            }
          }}
          key={post._id}
          className='hover:border-gray-400  flex cursor-pointer mb-2  border-gray-200 border-2 bg-white md:w-[650px] md:mx-auto '
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='bg-gray-50 flex flex-col justify-start text-center p-2 '
          >
            <button
              className='hover:bg-gray-200'
              onClick={() => {
                voteHandler(post, "upvote");
              }}
            >
              {post.votedBy[
                post.votedBy.findIndex((element) => element.user === userId)
              ]?.voteType === "upvote" && isLoggedIn ? (
                <i className='text-2xl  '>
                  <BsCaretUpFill />
                </i>
              ) : (
                <i className='text-2xl  '>
                  <BsCaretUp />
                </i>
              )}
            </button>

            <span className='font-semibold'> {post.vote} </span>
            <button
              className='hover:bg-gray-200'
              onClick={() => {
                voteHandler(post, "downvote");
              }}
            >
              {post.votedBy[
                post.votedBy.findIndex((element) => element.user === userId)
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
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/${post.subcategory}`);
                }}
                className='font-semibold text-sm box-border border-b border-transparent hover:border-black'
              >
                {post.subcategory}
              </p>
              <p className='text-sm font-light ml-1'>
                Posted by {post.username}
              </p>
              <p className='text-sm font-light ml-1'>{postDate(post)} </p>
            </div>
            <p className='text-xl mt-1 mb-2'>{post.title}</p>
            <p className='font my-1'>{post.body}</p>
            <div className='flex  gap-3 opacity-80'>
              <div
                className='flex hover:bg-gray-100 p-2'
                onClick={(e) => {
                  e.stopPropagation();
                  if (
                    location.pathname !==
                    `${post.subcategory.replace(/\s+/g, "")}/${post._id}`
                  ) {
                    navigate(
                      `/${post.subcategory.replace(/\s+/g, "")}/${post._id}`
                    );
                  }
                }}
              >
                <i className='flex text-center justify-center items-center pr-1'>
                  <BsChatLeft />
                </i>
                <p>Comments</p>
              </div>
              <div
                className='flex hover:bg-gray-100 p-2 '
                onClick={(e) => {
                  e.stopPropagation();
                  saveHandler(post);
                }}
              >
                {savedPosts && savedPosts.includes(post._id) ? (
                  <>
                    <i className='flex text-center justify-center items-center pr-1'>
                      <BsBookmarkFill />
                    </i>
                    <p>Unsave</p>
                  </>
                ) : (
                  <>
                    <i className='flex text-center justify-center items-center pr-1'>
                      <BsBookmark />
                    </i>
                    <p>Save</p>
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
