import { CreatePost } from "./CreatePost";
import { Filter } from "./Filter";
import { Posts } from "./Posts";
import { SideBar } from "./Sidebar";

export const HomePage = () => {
  return (
    <div className='flex '>
      <div className='lg:border-black lg:border-2'>
        <SideBar />
      </div>
      <div>
        <Filter />
        <Posts />
        <CreatePost />
      </div>
    </div>
  );
};
