import axios from "axios";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export const SideBar = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    const res = await axios.get("http://localhost:8000/categories");
    setTopics(res.data);
    console.log(res.data);
  };

  const Topic = ({ data, level }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggle = () => {
      setIsExpanded(!isExpanded);
    };
    return (
      <div>
        {data.subcategory && data.subcategory.length > 0 ? (
          <div className='flex items-end mb-2 '>
            <p className='text-lg min-w-[100px] cursor-pointer  '>
              {data.category}
            </p>
            <i className='text-2xl cursor-pointer  ' onClick={toggle}>
              {isExpanded ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </i>
          </div>
        ) : (
          <span>{data.category}</span>
        )}

        {isExpanded &&
          data.subcategory?.map((child) => (
            <div className='mb-2' style={{ marginLeft: `${level * 20}px` }}>
              {child}
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className='ml-5'>
      <h1 className='mb-5'>Topics</h1>

      {topics.map((data) => (
        <Topic data={data} level={1} />
      ))}
    </div>
  );
};
