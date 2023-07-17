import { Posts } from './post/Posts';
import { SideBar } from './Sidebar';
import { Link } from 'react-router-dom';
import AddSharpIcon from '@mui/icons-material/AddSharp';

const HomePage = ({ isLoggedIn, modal, setModal, sort, setSort }) => {
  return (
    <div className='flex h-auto bg-gray-200  flex-col flex-grow lg:flex-row  '>
      <SideBar />
      <div className='flex flex-col flex-grow mt-12 md:ml-32 bg-gray-200 '>
        {isLoggedIn && (
          <Link to='/createPost'>
            <div className='flex h-11 bg-white  border-2 border-gray-200 md:w-[650px] md:m-auto'>
              <i className='flex justify-center items-center p-3'>
                <AddSharpIcon />
              </i>
              <input
                type='text'
                placeholder='Create Post'
                className='hover:border-blue-300 bg-gray-50 border-2 border-gray-200 w-full mr-4 my-1 px-3 py-1'
              />
            </div>
          </Link>
        )}

        <Posts
          isLoggedIn={isLoggedIn}
          modal={modal}
          setModal={setModal}
          sort={sort}
          setSort={setSort}
        />
      </div>
    </div>
  );
};
export default HomePage;
