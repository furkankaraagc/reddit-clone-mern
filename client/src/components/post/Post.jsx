import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';

export const Post = ({ post, isLoggedIn, setModal, fetchData, isSubmit }) => {
  const [savedPosts, setSavedPosts] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    isSaved();
  }, [fetchData]);

  const isSaved = async () => {
    if (token) {
      await fetch('http://localhost:8000/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
    await fetch('http://localhost:8000/vote', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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
    await fetch('http://localhost:8000/savePost', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        postId: post._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => toast.success(data.message));

    fetchData();
  };
  const deleteHandler = async (post) => {
    await fetch('http://localhost:8000/deletePost', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        postId: post._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => toast.success(data.message));

    fetchData();
    await fetch('http://localhost:8000/deleteComment', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify({
        commentId: post.comments,
        postId: post._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => toast.success(data.message));
  };
  return (
    <div className='x'>
      {post && savedPosts && (
        <div
          onClick={() => {
            if (
              location.pathname !==
              `${post.subcategory.replace(/\s+/g, '')}/${post._id}`
            ) {
              navigate(`/${post.subcategory.replace(/\s+/g, '')}/${post._id}`);
            }
          }}
          key={post._id}
          className=' hover:border-gray-400  flex justify-start  cursor-pointer mb-2  border-gray-200 border-2 bg-white md:w-[650px] md:mx-auto'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='bg-gray-50 flex flex-col justify-start text-center p-2 '
          >
            <button
              className='hover:bg-gray-200'
              onClick={() => {
                voteHandler(post, 'upvote');
              }}
            >
              {post.votedBy[
                post.votedBy.findIndex((element) => element.user === userId)
              ]?.voteType === 'upvote' && isLoggedIn ? (
                <i className='text-2xl text-green-700    '>
                  <ThumbUpIcon />
                </i>
              ) : (
                <i className='text-2xl text-gray-700 '>
                  <ThumbUpOutlinedIcon />
                </i>
              )}
            </button>

            <span className='font-semibold'> {post.vote} </span>
            <button
              className='hover:bg-gray-200'
              onClick={() => {
                voteHandler(post, 'downvote');
              }}
            >
              {post.votedBy[
                post.votedBy.findIndex((element) => element.user === userId)
              ]?.voteType === 'downvote' && isLoggedIn ? (
                <i className='text-2xl text-red-700'>
                  <ThumbDownIcon />
                </i>
              ) : (
                <i className='text-2xl text-gray-700 '>
                  <ThumbDownOutlinedIcon />
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
                r/{post.subcategory}
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
                    `${post.subcategory.replace(/\s+/g, '')}/${post._id}`
                  ) {
                    navigate(
                      `/${post.subcategory.replace(/\s+/g, '')}/${post._id}`,
                    );
                  }
                }}
              >
                <i className='flex text-center justify-center items-center pr-1 opacity-95'>
                  <ChatBubbleOutlineOutlinedIcon />
                </i>
                <p>{post.comments.length} Comments</p>
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
                    <i className='flex text-center justify-center items-center pr-1 opacity-95'>
                      <BookmarkIcon />
                    </i>
                    <p>Unsave</p>
                  </>
                ) : (
                  <>
                    <i className='flex text-center justify-center items-center pr-1 opacity-95'>
                      <BookmarkBorderOutlinedIcon />
                    </i>
                    <p>Save</p>
                  </>
                )}
              </div>
            </div>
          </section>
          {isSubmit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteHandler(post);
              }}
              className='ml-auto w-10 bg-red-600 flex justify-center items-center '
            >
              <i className='opacity-75'>
                <HighlightOffSharpIcon />
              </i>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
