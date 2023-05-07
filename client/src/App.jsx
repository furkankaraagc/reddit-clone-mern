import { CreatePost } from "./components/CreatePost";
import { HomePage } from "./components/HomePage";
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Post } from "./components/Post";
import { Subcategory } from "./components/Subcategory";
import { RelatedPost } from "./components/RelatedPost";
import { SavedPosts } from "./components/SavedPosts";
import { SubmittedPosts } from "./components/SubmittedPosts";
import { CreateSubcategory } from "./components/CreateSubcategory";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modal, setModal] = useState(false);

  return (
    <BrowserRouter>
      <div className='bg-gray-200 h-screen '>
        <Navbar
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
            path='/:subcategory/:postId'
            element={
              <RelatedPost setModal={setModal} isLoggedIn={isLoggedIn} />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
