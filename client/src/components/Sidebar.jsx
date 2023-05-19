import axios from "axios";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";

export const SideBar = () => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    const res = await axios.get("http://localhost:8000/categories");
    setTopics(res.data);
  };

  const Topic = ({ data, level }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggle = () => {
      setIsExpanded(!isExpanded);
    };
    return (
      <div className='' key={data._id}>
        {data.subcategory && data.subcategory.length > 0 ? (
          <div onClick={toggle} className='flex items-end mb-2   '>
            <p className='text-lg min-w-[100px] cursor-pointer  '>
              {data.category}
            </p>
            <i className='text-2xl cursor-pointer  '>
              {isExpanded ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </i>
          </div>
        ) : (
          <span>{data.category}</span>
        )}
        {isExpanded &&
          data.subcategory?.map((child) => (
            <div
              key={child._id}
              className='mb-2 cursor-pointer hover:bg-gray-200'
              style={{ marginLeft: `${level * 20}px` }}
            >
              {child}
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className='hidden lg:block lg:border-l-2 lg:border-gray-300 lg:w-56  bg-white pt-6 pl-4  mt-10 fixed h-full'>
      {token && (
        <div className='flex items-center gap-1 mb-2 p-1 hover:bg-gray-100'>
          <i className=''>
            <BsPlusLg />
          </i>
          <button onClick={() => navigate("/createSubcategory")}>
            Create Subcategory
          </button>
        </div>
      )}
      <h1 className='mb-2 mt-3 text-lg '>Topics</h1>
      {topics.map((data) => (
        <Topic key={data._id} data={data} level={1} />
      ))}
    </div>
  );
};
