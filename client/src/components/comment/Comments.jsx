import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Comment } from './Comment';
import { toast } from 'react-hot-toast';

export const Comments = ({ setModal, comments, fetchComments }) => {
  const { postId } = useParams();

  const [parentInput, setParentInput] = useState('');
  const [parentCommentId, setParentCommentId] = useState('');
  const [disabled, setDisabled] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchComments();
  }, []);
  useEffect(() => {
    if (parentInput) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [parentInput]);

  const parentComments = comments.filter((comment) => !comment.parentComment);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!token) {
      return setModal(true);
    }
    const res = await axios.post(
      'http://localhost:8000/createComment',
      {
        body: parentInput,
        post: postId,
        parentCommentId: parentCommentId ? parentCommentId : null,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    toast.success(res.data.message);
    setParentInput('');
    fetchComments();
  };

  return (
    <div className='md:w-[650px] md:mx-auto md:p-3 bg-white  '>
      <form
        onSubmit={submitHandler}
        className='flex justify-center flex-col mb-3'
      >
        <textarea
          onChange={(e) => setParentInput(e.target.value)}
          className='border-2 border-gray-200 p-2'
          value={parentInput}
          cols='70'
          rows='5'
          placeholder='What are your thoughts'
        ></textarea>
        <button
          disabled={disabled}
          className={
            !disabled
              ? ' bg-blue-600 text-white  rounded-lg mt-1 py-1 hover:opacity-90'
              : 'cursor-not-allowed bg-gray-400 rounded-lg mt-1 py-1'
          }
        >
          Submit
        </button>
      </form>
      <div>
        {parentComments.map((parentComment) => (
          <Comment
            key={parentCommentId}
            setModal={setModal}
            parentComment={parentComment}
            comments={comments}
            fetchComments={fetchComments}
            postId={postId}
          />
        ))}
      </div>
    </div>
  );
};
