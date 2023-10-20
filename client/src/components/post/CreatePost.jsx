import React, { useEffect, useRef, useState } from 'react';
import { SideBar } from '../Sidebar';
import { Autocomplete } from '../Autocomplete';
import { AutocompleteSub } from '../AutocompleteSub';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CreatePost = () => {
  const refOne = useRef(null);
  const refTwo = useRef(null);

  const [disabled, setDisabled] = useState(true);
  const [focusOne, setFocusOne] = useState(false);
  const [focusTwo, setFocusTwo] = useState(false);
  const [topic, setTopic] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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
    try {
      const res = await axios.post(
        'https://blog-app-mern-85pk.onrender.com/createPost',
        {
          body: content,
          title: title,
          category: topic,
          subcategory: subcategory,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div onClick={handleCloseSearch} className='flex h-screen bg-[#191A21]   '>
      <SideBar />
      <div className='flex flex-col flex-grow  mt-16  '>
        <div className='min-w-[300px] md:w-[500px] mt-5 md:mx-auto mx-2'>
          <h1 className='text-2xl font-bold mb-3 text-[#f6f7f9]'>
            Create Post
          </h1>
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
            className='flex flex-col  rounded-md bg-[#23272F] mt-2 p-4 gap-3'
          >
            <input
              className='h-11 bg-[#343944] rounded-md text-[#f6f7f9] p-2'
              type='text'
              placeholder='Title'
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              className='h-44 bg-[#343944] rounded-md text-[#f6f7f9] p-2 '
              type='text'
              placeholder='Text'
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              disabled={disabled}
              className={`rounded-2xl  mt-1 py-1
             h-10 ${
               !disabled
                 ? ' bg-blue-600 h-14 text-[#f6f7f9] hover:opacity-90'
                 : 'cursor-not-allowed h-14 bg-gray-400'
             }`}
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
