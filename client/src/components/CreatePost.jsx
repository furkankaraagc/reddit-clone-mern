import React, { useEffect, useRef, useState } from "react";
import { SideBar } from "./Sidebar";
import { Categories } from "./Categories";
import { Autocomplete } from "./Autocomplete";
import { AutocompleteSub } from "./AutocompleteSub";
import axios from "axios";

export const CreatePost = () => {
  const refOne = useRef(null);
  const refTwo = useRef(null);

  const [disabled, setDisabled] = useState(true);

  const [focusOne, setFocusOne] = useState(false);
  const [focusTwo, setFocusTwo] = useState(false);

  const [topic, setTopic] = useState("");
  const [subcategory, setSubcategory] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (title && content && topic && subcategory) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [title, content, topic, subcategory]);

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
    console.log(res.data);
  };
  return (
    <div onClick={handleCloseSearch} className='flex h-screen  '>
      <SideBar />
      <div className='flex flex-col flex-grow mx-3'>
        <h1 className='text-xl mt-5 mb-3'>Create post</h1>
        <div>
          <Categories />
          <div>
            <Autocomplete
              focus={focusOne}
              refOne={refOne}
              topic={topic}
              setTopic={setTopic}
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
              className={!disabled ? "cursor-pointer" : "cursor-not-allowed"}
            >
              Submit
            </button>
          </form>
          <AutocompleteSub
            focus={focusTwo}
            refTwo={refTwo}
            topic={topic}
            setSubcategory={setSubcategory}
          />
        </div>
      </div>
    </div>
  );
};
