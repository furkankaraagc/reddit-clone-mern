import { useEffect, useState } from 'react';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import axios from 'axios';

export const Autocomplete = ({ focus, topic, setTopic, refOne }) => {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [filtred, setFiltred] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setFiltred(
      data.filter((option) =>
        option.category.toLowerCase().includes(value?.toLowerCase()),
      ),
    );
  }, [data, value, topic]);

  const handleSelect = async (element) => {
    setTopic(element);
    setValue(element);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setTopic(e.target.value);
  };

  const fetchCategories = async () => {
    const res = await axios.get(
      `https://blog-app-mern-85pk.onrender.com/categories`,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    );
    setData(res.data);
  };

  return (
    <div className='relative'>
      <div className='relative flex items-center'>
        <i className='absolute p-2 text-[#FF5414]'>
          <SearchSharpIcon />
        </i>

        <input
          value={value}
          type='text'
          placeholder='Choose a topic'
          onChange={handleChange}
          className=' pl-10 flex rounded-md bg-[#343944] text-[#f6f7f9] flex-grow h-9'
          ref={refOne}
        />
      </div>

      {focus && (
        <ul className='bg-[#343944] text-[#f6f7f9] absolute overflow-auto w-full p-2 z-10 border-gray-500 border '>
          {filtred?.map((option) => (
            <li
              className='border-b hover:text-blue-500 border-gray-200 p-2 cursor-pointer '
              key={option._id}
              onClick={() => handleSelect(option.category)}
            >
              {option.category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
