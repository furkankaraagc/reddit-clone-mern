import React, { useEffect, useRef, useState } from "react";
import { SideBar } from "./Sidebar";
import { Autocomplete } from "./Autocomplete";
import { AutocompleteSub } from "./AutocompleteSub";
import axios from "axios";

const CreatePost = () => {
  const refOne = useRef(null);
  const refTwo = useRef(null);

  const [disabled, setDisabled] = useState(true);
  const [focusOne, setFocusOne] = useState(false);
  const [focusTwo, setFocusTwo] = useState(false);
  const [topic, setTopic] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notify, setNotify] = useState("");
  const [showNotify, setShowNotify] = useState(false);

  useEffect(() => {
    if (title && content && topic && subcategory) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [title, content, topic, subcategory]);

  useEffect(() => {
    let timeoutId;
    if (notify) {
      setShowNotify(true);
      timeoutId = setTimeout(() => {
        setShowNotify(false);
      }, 2500);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [notify]);

  const handleCloseSearch = (e) => {
    //If user click outside the input
    if (!refOne.current.contains(e.target)) {
      setFocusOne(false);
    } else {
      setFocusOne(true);
      setFocusTwo(false);
    }

    if (!refTwo.current.contains(e.target)) {
      setFocusTwo(false);
    } else {
      setFocusTwo(true);
      setFocusOne(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setNotify("");
      const res = await axios.post(
        "http://localhost:8000/createPost",
        {
          body: content,
          title: title,
          category: topic,
          subcategory: subcategory,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setNotify(res.data.message);
    } catch (error) {
      setNotify(error.response.data.message);
    }
  };
  return (
    <div onClick={handleCloseSearch} className='flex h-screen  '>
      {showNotify && (
        <div className='fixed inset-x-0 bottom-0 flex justify-center items-end mb-6 z-50 '>
          <div className='border-2 border-blue-500 py-2 px-5 bg-blue-50 text-lg  '>
            {notify}
          </div>
        </div>
      )}
      <SideBar />
      <div className='flex flex-col flex-grow mx-3 mt-10 lg:ml-56  '>
        <h1 className='text-xl mt-5 mb-3 mx-10'>Create post</h1>
        <div className='mx-10'>
          <div className='flex flex-col gap-5'>
            <Autocomplete
              focus={focusOne}
              refOne={refOne}
              topic={topic}
              setTopic={setTopic}
            />
            <AutocompleteSub
              focus={focusTwo}
              refTwo={refTwo}
              topic={topic}
              setSubcategory={setSubcategory}
            />
          </div>
          <form
            onSubmit={submitHandler}
            className='flex flex-col border-2 border-gray-200 bg-white mt-2 p-4 gap-3'
          >
            <input
              className='h-11 border-gray-200 border-2 p-2'
              type='text'
              placeholder='Title'
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              className='h-44 border-gray-200 border-2 p-2 '
              type='text'
              placeholder='Text'
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              disabled={disabled}
              className={
                !disabled
                  ? " bg-blue-600 text-white  rounded-lg mt-1 py-1 hover:opacity-90"
                  : "cursor-not-allowed bg-gray-400 rounded-lg mt-1 py-1"
              }
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreatePost;
