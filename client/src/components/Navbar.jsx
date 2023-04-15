import { Link } from "react-router-dom";
import { User } from "../components/User";

export const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <nav className='h-10 bg-white flex justify-between px-3 items-center  '>
      <Link to='/'>Reddit</Link>
      <input
        type='text'
        placeholder='Search'
        className='border-black shadow-md rounded-xl h-6 p-4 bg-gray-100 '
      />
      <User isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </nav>
  );
};
