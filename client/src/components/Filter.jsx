import { useNavigate } from 'react-router-dom';

export const Filter = ({ setSort, sort, sortType }) => {
  const navigate = useNavigate();

  const sortRecent = () => {
    setSort('mostRecent');
    navigate('/posts/mostRecent');
  };
  const sortPopular = () => {
    setSort('popular');
    navigate('/posts/popular');
  };
  return (
    <div className='bg-white my-4 h-13 border-2 md:w-[650px] md:mx-auto'>
      <div className={`flex p-2 gap-3`}>
        <div
          className={`cursor-pointer py-1 px-2
           ${
             sortType === 'popular'
               ? ''
               : '  rounded-xl  text-blue-500 bg-gray-100'
           }`}
          onClick={sortRecent}
        >
          Most Recent
        </div>
        <div
          className={`cursor-pointer py-1 px-2 ${
            sortType !== 'popular'
              ? ''
              : 'rounded-xl text-blue-500  bg-gray-100'
          }`}
          onClick={sortPopular}
        >
          Popular
        </div>
      </div>
    </div>
  );
};
