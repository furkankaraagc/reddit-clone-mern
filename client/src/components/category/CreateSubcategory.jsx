import { useEffect, useRef, useState } from 'react';
import { SideBar } from '../Sidebar';
import { Autocomplete } from '../Autocomplete';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CreateSubcategory = () => {
  const refOne = useRef(null);
  const [topic, setTopic] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [focusOne, setFocusOne] = useState(false);

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
      const res = await axios.post(
        'https://blog-app-mern-85pk.onrender.com/createSubcategory',
        {
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
      setSubcategory('');
      setTopic('');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div onClick={handleCloseSearch}>
      <SideBar submitHandler={submitHandler} />
      <div className='pt-20 lg:ml-80 md:w-[650px] md:mx-auto h-full mx-2 '>
        <h1 className='mb-2 text-lg font-medium'>Create a subcategory</h1>
        <Autocomplete
          focus={focusOne}
          refOne={refOne}
          topic={topic}
          setTopic={setTopic}
        />
        <form className='flex flex-col gap-1' onSubmit={submitHandler}>
          <p className='mt-2'>Name</p>
          <input
            className='py-1 px-2 hover:border-gray-400 border '
            onChange={(e) => setSubcategory(e.target.value)}
            type='text'
            placeholder='r/'
            value={subcategory}
            required
          />
          <div className=' flex items-end '>
            <button className='bg-blue-600 text-white  rounded-lg hover:opacity-90 px-2 py-1'>
              Create Subcategory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateSubcategory;
