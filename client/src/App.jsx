import { CreatePost } from "./components/CreatePost";
import { HomePage } from "./components/HomePage";
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className='bg-gray-200 h-full '>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path='/' element={<HomePage isLoggedIn={isLoggedIn} />} />
          <Route path='/createPost' element={<CreatePost />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
