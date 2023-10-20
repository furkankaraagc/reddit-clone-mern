import { useEffect, useState } from 'react';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AutocompleteSub = ({ refTwo, focus, topic, setSubcategory }) => {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [filtred, setFiltred] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setValue('');
  }, [topic]);

  useEffect(() => {
    const filtredVar = data.filter(
      (option) => option.category?.toLowerCase() === topic.toLowerCase(),
    );
    setFiltred(
      filtredVar[0]?.subcategory.filter((element) =>
        element.toLowerCase().includes(value?.toLowerCase()),
      ),
    );
  }, [data, value, topic]);

  const handleSelect = async (element) => {
    setSubcategory(element);
    setValue(element);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setSubcategory(e.target.value);
  };

  const fetchCategories = async () => {
    const res = await axios.get(
      `https://blog-app-mern-85pk.onrender.com/subcategories`,
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
          placeholder='Choose a subcategory'
          onChange={handleChange}
          className=' pl-10 flex  rounded-md bg-[#343944] text-[#f6f7f9]  flex-grow h-9'
          ref={refTwo}
        />
      </div>
      {focus && (
        <ul className='bg-[#343944] text-[#f6f7f9] absolute overflow-auto w-full p-2 z-10 border-gray-500 border '>
          {
            <h1 className='flex justify-end text-blue-500    '>
              <span
                onClick={() => navigate('/createSubcategory')}
                className='hover:bg-gray-200 cursor-pointer px-1 rounded-md '
              >
                + CreateNew
              </span>
            </h1>
          }
          {filtred?.map((option) => (
            <li
              className='border-b hover:text-blue-500 border-gray-200 p-2 cursor-pointer '
              key={option._id}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
