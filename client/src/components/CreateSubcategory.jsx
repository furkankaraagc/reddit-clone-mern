import { useRef, useState, useEffect } from "react";
import { SideBar } from "./Sidebar";
import { Autocomplete } from "./Autocomplete";
import axios from "axios";

export const CreateSubcategory = () => {
  const refOne = useRef(null);
  const [topic, setTopic] = useState("");
  const [subcategory, setSubcategory] = useState(false);
  const [focusOne, setFocusOne] = useState(false);
  const [notify, setNotify] = useState("");
  const [showNotify, setShowNotify] = useState(false);

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
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setNotify("");
      const res = await axios.post(
        "http://localhost:8000/createSubcategory",
        {
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
    <div onClick={handleCloseSearch}>
      {showNotify && (
        <div className='absolute inset-0 flex justify-center items-end mb-3  '>
          <div className='border-2 border-green-400 py-2 px-5'>{notify}</div>
        </div>
      )}
      <SideBar />
      <div className='pt-20 lg:ml-80 md:w-[650px] md:mx-auto h-full '>
        <h1 className='mb-2'>Create a subcategory</h1>
        <Autocomplete
          focus={focusOne}
          refOne={refOne}
          topic={topic}
          setTopic={setTopic}
        />
        <form className='flex flex-col gap-1' onSubmit={submitHandler}>
          <p className='mt-2'>Name</p>
          <input
            onChange={(e) => setSubcategory(e.target.value)}
            type='text'
            placeholder='r/'
          />
          <button className=' flex items-start'>Create Subcategory</button>
        </form>
      </div>
    </div>
  );
};
