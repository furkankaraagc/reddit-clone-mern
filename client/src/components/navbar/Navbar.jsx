import { Link, useNavigate } from 'react-router-dom';
import { User } from './User';
import { useState } from 'react';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import RedditIcon from '@mui/icons-material/Reddit';

export const Navbar = ({
  isLoggedIn,
  setIsLoggedIn,
  modal,
  setModal,
  refOne,
  focusOne,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    if (!searchInput) {
      return;
    }
    e.preventDefault();
    navigate(`search/${searchInput}`);
    setSearchInput('');
  };
  return (
    <nav className='h-11 bg-white flex justify-between px-3  items-center border-2 border-gray-200 fixed w-full z-10'>
      <Link className='text-lg' to='/'>
        <div className='flex gap-1 justify-center items-center'>
          <i className='flex justify-center items-center'>
            <RedditIcon />
          </i>
          <h1 className='hidden sm:block'>Reddit</h1>
        </div>
      </Link>
      <form onSubmit={submitHandler}>
        <div className='flex '>
          <input
            type='text'
            value={searchInput}
            placeholder='Search'
            onChange={(e) => setSearchInput(e.target.value)}
            className=' shadow-md hover:border-blue-400 border-gray-100 border-2 rounded-s-xl h-6 p-4 bg-gray-100 w-[200px] sm:w-[300px] xs:w-[200px] '
          />
          <button className=' shadow-md bg-gray-100 h-6 p-4 flex items-center border-gray-100 border-2 '>
            <i>
              <SearchSharpIcon />
            </i>
          </button>
        </div>
      </form>

      <User
        focusOne={focusOne}
        refOne={refOne}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        modal={modal}
        setModal={setModal}
      />
    </nav>
  );
};
