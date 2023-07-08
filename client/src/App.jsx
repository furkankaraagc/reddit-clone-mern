import { Navbar } from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useRef, lazy, Suspense } from "react";

const SavedPosts = lazy(() => import("./components/SavedPosts"));
const RelatedPost = lazy(() => import("./components/RelatedPost"));
const SearchedPost = lazy(() => import("./components/SearchedPost"));
const SubmittedPosts = lazy(() => import("./components/SubmittedPosts"));
const CreateSubcategory = lazy(() => import("./components/CreateSubcategory"));
const CreatePost = lazy(() => import("./components/CreatePost"));
const HomePage = lazy(() => import("./components/HomePage"));
const Subcategory = lazy(() => import("./components/Subcategory"));

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
        <Suspense fallback={<h1>Loading...</h1>}>
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
              element={
                <SavedPosts setModal={setModal} isLoggedIn={isLoggedIn} />
              }
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
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
