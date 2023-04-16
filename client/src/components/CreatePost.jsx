import React from "react";
import { SideBar } from "./Sidebar";
import { Categories } from "./Categories";

export const CreatePost = () => {
  return (
    <div className='flex'>
      <SideBar />
      <div>
        <h1>Create post</h1>
        <div>
          <Categories />
          <form>
            <input type='text' placeholder='Title' />
            <input type='text' placeholder='Text' />
            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};
