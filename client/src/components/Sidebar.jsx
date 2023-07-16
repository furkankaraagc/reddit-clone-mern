import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import KeyboardArrowUpSharpIcon from '@mui/icons-material/KeyboardArrowUpSharp';
import AddSharpIcon from '@mui/icons-material/AddSharp';

export const SideBar = ({ submitHandler }) => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTopics();
  }, [submitHandler]);

  const fetchTopics = async () => {
    const res = await axios.get(
      'https://blog-app-mern-85pk.onrender.com/categories',
    );
    setTopics(res.data);
  };

  const Topic = ({ data, level }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggle = () => {
      setIsExpanded(!isExpanded);
    };
    return (
      <div key={data._id}>
        {data.subcategory && data.subcategory.length > 0 ? (
          <div onClick={toggle} className='flex items-end mb-2   '>
            <p className='text-lg min-w-[100px] cursor-pointer  '>
              {data.category}
            </p>
            <i className='text-2xl cursor-pointer  '>
              {isExpanded ? (
                <KeyboardArrowUpSharpIcon />
              ) : (
                <KeyboardArrowDownSharpIcon />
              )}
            </i>
          </div>
        ) : (
          <span>{data.category}</span>
        )}
        {isExpanded &&
          data.subcategory?.map((child, index) => (
            <div
              key={index}
              className='mb-2 cursor-pointer hover:bg-gray-200 border-r-4 border-white p-1'
              onClick={() => navigate(`/${child}`)}
              style={{ marginLeft: `${level * 20}px` }}
            >
              r/{child}
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className='lg:overflow-auto hidden lg:block lg:border-l-2 lg:border-gray-300 lg:w-56  bg-white pt-6 pl-4 pb-10  mt-10 fixed h-full'>
      {token && (
        <div className='flex items-center gap-1 mb-2 p-1 hover:bg-gray-100'>
          <i className=''>
            <AddSharpIcon />
          </i>
          <button onClick={() => navigate('/createSubcategory')}>
            Create Subcategory
          </button>
        </div>
      )}
      <h1 className='mb-2 mt-3 text-lg font-medium '>Topics</h1>
      {topics.map((data) => (
        <Topic key={data._id} data={data} level={1} />
      ))}
    </div>
  );
};
