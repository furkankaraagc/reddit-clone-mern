import { Link, useNavigate } from "react-router-dom";
import { User } from "../components/User";
import { useState } from "react";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

export const Navbar = ({
  isLoggedIn,
  setIsLoggedIn,
  modal,
  setModal,
  refOne,
  focusOne,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    if (!searchInput) {
      return;
    }
    e.preventDefault();
    navigate(`search/${searchInput}`);
    setSearchInput("");
  };
  return (
    <nav className='h-11 bg-white flex justify-between px-3  items-center border-2 border-gray-200 fixed w-full z-10'>
      <Link className='text-lg' to='/'>
        Reddit
      </Link>
      <form onSubmit={submitHandler}>
        <div className='flex '>
          <input
            type='text'
            value={searchInput}
            placeholder='Search'
            onChange={(e) => setSearchInput(e.target.value)}
            className=' shadow-md  rounded-s-xl h-6 p-4 bg-gray-100 '
          />
          <button className=' shadow-md bg-gray-100 h-6 p-4 flex items-center'>
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
