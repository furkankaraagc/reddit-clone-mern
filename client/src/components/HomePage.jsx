import { CreatePost } from "./CreatePost";
import { Filter } from "./Filter";
import { Posts } from "./Posts";
import { SideBar } from "./Sidebar";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";

export const HomePage = ({ isLoggedIn }) => {
  return (
    <div className='flex h-auto  flex-col flex-grow lg:flex-row '>
      <div className='hidden lg:block lg:border-l-2 lg:border-gray-300 lg:w-56  bg-white pt-6 pl-2 fixed h-full mt-10   '>
        <SideBar />
      </div>
      <div className='flex flex-col flex-grow mt-10 '>
        {isLoggedIn && (
          <Link to='/createPost' className=''>
            <div className='flex h-11 bg-white  border-2 border-gray-200 md:w-[650px] md:m-auto'>
              <i className='flex justify-center items-center p-3'>
                <BsPlusLg />
              </i>
              <input
                type='text'
                placeholder='Create Post'
                className='hover:border-blue-300 bg-gray-50 border-2 border-gray-200 w-full mr-4 my-1 px-3 py-1'
              />
            </div>
          </Link>
        )}

        <Filter />
        <Posts isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
};
