import { CreatePost } from "./CreatePost";
import { Filter } from "./Filter";
import { Posts } from "./Posts";
import { SideBar } from "./Sidebar";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className='flex '>
      <div className='lg:border-black lg:border-2'>
        <SideBar />
      </div>
      <div>
        <Link to='/createPost'>Create Post</Link>
        <Filter />
        <Posts />
      </div>
    </div>
  );
};
