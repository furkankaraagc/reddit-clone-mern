import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const User = ({ isLoggedIn, setIsLoggedIn }) => {
  const [dropDown, setDropDown] = useState(false);
  const [modal, setModal] = useState(false);
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
      navigate("/");
    }
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/login", {
        username: username,
        password: password,
      });

      if (res.data.success === true) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("userId", res.data.userId);

        navigate(0); // force refresh
      }
    } catch (error) {
      return console.log(error.message);
    }
  };
  const registerHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return console.log("Password does not match");
    }

    try {
      await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div className='relative inline-block'>
          <p className='cursor-pointer' onClick={() => setDropDown(!dropDown)}>
            {isLoggedIn ? localStorage.getItem("username") : "User Profie"}
          </p>
          {dropDown && (
            <div className='z-10 bg-white  border shadow-lg p-4 w-48 right-5  absolute'>
              <div className='flex'>
                <div>Dark Mode</div>
                <input type='checkbox' name='' id='' />
              </div>
              {isLoggedIn ? (
                <div
                  className='cursor-pointer'
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("username");
                    localStorage.removeItem("userId");
                    navigate(0);
                  }}
                >
                  Log Out
                </div>
              ) : (
                <div
                  onClick={() => {
                    setModal(true);
                    setDropDown(false);
                    setLogin(true);
                  }}
                  className='cursor-pointer'
                >
                  Log In / Sign Up
                </div>
              )}
            </div>
          )}
          {modal && (
            <div className='z-10 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
              <div className='bg-white rounded-lg px-5 pt-1 pb-5 flex flex-col'>
                <button
                  onClick={() => setModal(false)}
                  className='cursor-pointer flex justify-end   text-xl font-bold text-gray-500 hover:text-gray-900'
                >
                  X
                </button>
                {login && (
                  <form onSubmit={loginHandler} className='flex flex-col gap-4'>
                    <h1>Log In</h1>
                    <input
                      className='border-black shadow-md rounded-xl h-6 p-4 bg-gray-100'
                      type='text'
                      placeholder='Username'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                      className='border-black shadow-md rounded-xl h-6 p-4 bg-gray-100'
                      placeholder='Password'
                      type='text'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button>Log In</button>
                    <p>New to Reddit?</p>
                    <p onClick={() => setLogin(false)}>Sign Up</p>
                  </form>
                )}
                {!login && (
                  <form
                    onSubmit={registerHandler}
                    className='flex flex-col gap-4'
                  >
                    <h1>Sign Up</h1>
                    <input
                      className='border-black shadow-md rounded-xl h-6 p-4 bg-gray-100'
                      type='text'
                      placeholder='Username'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                      className='border-black shadow-md rounded-xl h-6 p-4 bg-gray-100'
                      placeholder='Password'
                      type='text'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                      className='border-black shadow-md rounded-xl h-6 p-4 bg-gray-100'
                      placeholder='Confirm Password'
                      type='text'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button>Log In</button>
                    <p>Already have an account?</p>
                    <p onClick={() => setLogin(true)}>Log In</p>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
