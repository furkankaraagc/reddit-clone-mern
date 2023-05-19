import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const User = ({ isLoggedIn, setIsLoggedIn, modal, setModal }) => {
  const [dropDown, setDropDown] = useState(false);
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notify, setNotify] = useState("");

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
      return setNotify("Incorrect username or password");
    }
  };
  const registerHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setNotify("Password do not match");
    }

    try {
      const res = await axios.post("http://localhost:8000/register", {
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
              {isLoggedIn ? (
                <>
                  <div
                    className='cursor-pointer'
                    onClick={() => navigate("/savedPosts")}
                  >
                    Saved Posts
                  </div>
                  <div
                    className='cursor-pointer'
                    onClick={() => navigate("/submittedPosts")}
                  >
                    Your Posts
                  </div>
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
                </>
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
                    <h1 className='text-lg mb-2'>Log In</h1>
                    <input
                      className={` border-black shadow-md rounded-xl h-6 p-4 bg-gray-100 hover:border-gray-400 border ${
                        notify && "border-red-500 hover:border-red-500"
                      } border-transparent placeholder:text-sm`}
                      type='text'
                      placeholder='Username'
                      value={username}
                      required
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setNotify("");
                      }}
                    />
                    {notify && (
                      <div className='pl-4 text-sm text-red-500'>{notify}</div>
                    )}
                    <input
                      className={` border-black shadow-md rounded-xl h-6 p-4 bg-gray-100 hover:border-gray-400 border ${
                        notify && "border-red-500 hover:border-red-500"
                      } border-transparent placeholder:text-sm`}
                      placeholder='Password'
                      type='password'
                      value={password}
                      required
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setNotify("");
                      }}
                    />
                    <button className='bg-blue-600 text-white  rounded-lg hover:opacity-90 py-1  '>
                      Log In
                    </button>
                    <p className='text-sm'>
                      New to Reddit?
                      <span
                        className='text-sm text-blue-600 border-b-2 border-blue-600 cursor-pointer ml-1'
                        onClick={() => {
                          setLogin(false);
                          setUsername("");
                          setPassword("");
                          setNotify("");
                        }}
                      >
                        Sign Up
                      </span>
                    </p>
                  </form>
                )}
                {!login && (
                  <form
                    onSubmit={registerHandler}
                    className='flex flex-col gap-4'
                  >
                    <h1 className='text-lg'>Sign Up</h1>
                    <input
                      className='border-black shadow-md rounded-xl h-6 p-4 bg-gray-100 hover:border-gray-400 border border-transparent placeholder:text-sm'
                      type='text'
                      placeholder='Username'
                      value={username}
                      required
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                      className={` border-black shadow-md rounded-xl h-6 p-4 bg-gray-100 hover:border-gray-400 border ${
                        notify && "border-red-500 hover:border-red-500"
                      } border-transparent placeholder:text-sm`}
                      placeholder='Password'
                      type='password'
                      value={password}
                      required
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setNotify("");
                      }}
                    />
                    <input
                      className={` border-black shadow-md rounded-xl h-6 p-4 bg-gray-100 hover:border-gray-400 border ${
                        notify && "border-red-500 hover:border-red-500"
                      } border-transparent placeholder:text-sm`}
                      placeholder='Confirm Password'
                      type='password'
                      value={confirmPassword}
                      required
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setNotify("");
                      }}
                    />
                    {notify && (
                      <div className='text-sm text-red-500'>{notify}</div>
                    )}
                    <button className='bg-blue-600 text-white  rounded-lg hover:opacity-90 py-1'>
                      Sign up
                    </button>
                    <p className='text-sm'>
                      Already have an account?{" "}
                      <span
                        className='text-sm text-blue-600 border-b-2 border-blue-600 cursor-pointer ml-1'
                        onClick={() => setLogin(true)}
                      >
                        Log In
                      </span>
                    </p>
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
