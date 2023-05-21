import { CreatePost } from "./components/CreatePost";
import { HomePage } from "./components/HomePage";
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useRef } from "react";
import { Post } from "./components/Post";
import { Subcategory } from "./components/Subcategory";
import { RelatedPost } from "./components/RelatedPost";
import { SavedPosts } from "./components/SavedPosts";
import { SubmittedPosts } from "./components/SubmittedPosts";
import { CreateSubcategory } from "./components/CreateSubcategory";
import { SearchedPost } from "./components/SearchedPost";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modal, setModal] = useState(false);
  const [focusOne, setFocusOne] = useState(false);
  const [sort, setSort] = useState("");

  const refOne = useRef(null);

  const handleCloseSearch = (e) => {
    //If user click outside the input
    if (!refOne.current.contains(e.target)) {
      setFocusOne(false);
    } else {
      setFocusOne(true);
    }
  };

  return (
    <BrowserRouter>
      <div onClick={handleCloseSearch} className='bg-gray-200 h-screen '>
        <Navbar
          focusOne={focusOne}
          refOne={refOne}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          modal={modal}
          setModal={setModal}
        />
        <Routes>
          <Route
            path='/'
            element={
              <HomePage
                isLoggedIn={isLoggedIn}
                modal={modal}
                setModal={setModal}
                sort={sort}
                setSort={setSort}
              />
            }
          />
          <Route path='/createPost' element={<CreatePost />} />
          <Route path='/createSubcategory' element={<CreateSubcategory />} />
          <Route
            path='/savedPosts'
            element={<SavedPosts setModal={setModal} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path='/submittedPosts'
            element={
              <SubmittedPosts setModal={setModal} isLoggedIn={isLoggedIn} />
            }
          />
          <Route
            path='/:subcategory'
            element={
              <Subcategory setModal={setModal} isLoggedIn={isLoggedIn} />
            }
          />
          <Route
            path='/posts/:sortType'
            element={
              <HomePage
                isLoggedIn={isLoggedIn}
                modal={modal}
                setModal={setModal}
                sort={sort}
                setSort={setSort}
              />
            }
          />

          <Route
            path='/:subcategory/:postId'
            element={
              <RelatedPost setModal={setModal} isLoggedIn={isLoggedIn} />
            }
          />
          <Route
            path='/search/:query'
            element={
              <SearchedPost setModal={setModal} isLoggedIn={isLoggedIn} />
            }
          />
          <Route
            path='/sort'
            element={
              <SearchedPost setModal={setModal} isLoggedIn={isLoggedIn} />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
