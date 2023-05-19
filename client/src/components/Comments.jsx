import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Comment } from "./Comment";

export const Comments = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [parentInput, setParentInput] = useState("");
  const [parentCommentId, setParentCommentId] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchComments();
  }, []);

  const parentComments = comments.filter((comment) => !comment.parentComment);

  const fetchComments = async () => {
    const res = await axios.get(`http://localhost:8000/comments/${postId}`, {
      headers: {
        Authorization: token,
      },
    });
    setComments(res.data);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:8000/createComment",
      {
        body: parentInput,
        post: postId,
        parentCommentId: parentCommentId ? parentCommentId : null,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setParentInput("");
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
          name=''
          id=''
          cols='70'
          rows='5'
          placeholder='What are your thoughts'
        ></textarea>
        <button className='bg-blue-600  text-white hover:opacity-90'>
          Submit
        </button>
      </form>
      <div>
        {parentComments.map((parentComment) => (
          <Comment
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
