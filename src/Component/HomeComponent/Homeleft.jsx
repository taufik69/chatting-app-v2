import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BiMessageRounded, BiGroup } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { GrAppsRounded } from "react-icons/gr";
import { CiSettings } from "react-icons/ci";
const Homeleft = ({ active }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [DisplayName, setDisplayName] = useState(null);
  const [photurl, setphoturl] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        let { displayName, photoURL } = user;
        setDisplayName(displayName);
        setphoturl(photoURL);
      }
    });
  }, []);

  // Sign out functonality with firebase sign out function

  const handleSignOut = () => {
    signOut(auth)
      .then((user) => {
        toast.success("🦄 Log out sucessfull!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        console.log("sign out sucessfull ", user);
      })
      .catch((error) => {
        console.log("sign out error ", error);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="max-w[35%] p-5 px-7 shadow-lg shadow-indigo-500/40">
        <div>
          <h1 className="mb-10 font-intel text-4xl font-bold text-primary-color">
            Chatting.
          </h1>
        </div>
        <div className="flex">
          {photurl ? (
            <div className="relative">
              <img
                className="h-10 w-10 rounded-full"
                src={photurl}
                alt="Home page avatar"
              />
              <span className="absolute bottom-0 left-7  h-3.5 w-3.5 rounded-full border-2 border-white bg-green-400"></span>
            </div>
          ) : (
            <div className="relative">
              <img
                className="h-10 w-10 rounded-full"
                src="../../../public/images/Emailpage/avatar.gif"
                alt="Home page avatar"
              />
              <span className="absolute bottom-0 left-7  h-3.5 w-3.5 rounded-full border-2 border-white bg-green-400 "></span>
            </div>
          )}

          <div className="mt-2 px-3 font-intel">
            <p className=" fixed text-xl font-semibold  text-primary-color">
              {DisplayName}
            </p>
            <p className="text-md fixed ml-1 mt-6 font-normal text-[#7A7A7A]">
              Active
            </p>
          </div>
        </div>

        {/* This part covered navbar */}

        <div className="mt-14 min-h-[64.5vh]">
          <ul className="ml-4 flex flex-col gap-10">
            <li
              className={
                active === "home"
                  ? "relative  w-[120%]   border-l  bg-primary-color  py-3 pr-2 text-white after:absolute after:-left-10 after:top-0 after:h-full after:w-10 after:rounded-l-md after:bg-primary-color"
                  : ""
              }
            >
              <Link to="#" className="flex items-center gap-x-2">
                <AiOutlineHome className="text-xl" />
                <span className="text-md font-intel font-normal">Home</span>
              </Link>
            </li>
            <li
              className={
                active === "message"
                  ? "relative  w-[120%]   border-l  bg-primary-color  py-3 pr-2 text-white after:absolute after:-left-10 after:top-0 after:h-full after:w-10 after:rounded-l-md after:bg-primary-color"
                  : ""
              }
            >
              <Link to="#" className="flex items-center gap-x-2">
                <BiMessageRounded className="text-xl" />
                <span className="text-md font-intel font-normal">Message</span>
              </Link>
            </li>
            <li
              className={
                active === "group"
                  ? "relative  w-[120%]   border-l  bg-primary-color  py-3 pr-2 text-white after:absolute after:-left-10 after:top-0 after:h-full after:w-10 after:rounded-l-md after:bg-primary-color"
                  : ""
              }
            >
              <Link to="#" className="flex items-center gap-x-2">
                <BiGroup className="text-xl" />
                <span className="text-md font-intel font-normal">Group</span>
              </Link>
            </li>

            <li
              className={
                active === "friends"
                  ? "relative  w-[120%]   border-l  bg-primary-color  py-3 pr-2 text-white after:absolute after:-left-10 after:top-0 after:h-full after:w-10 after:rounded-l-md after:bg-primary-color"
                  : ""
              }
            >
              <Link to="#" className="flex items-center gap-x-2">
                <FaUserFriends className="text-xl" />
                <span className="text-md font-intel font-normal">Friends</span>
              </Link>
            </li>

            <li
              className={
                active === "people"
                  ? "relative  w-[120%]   border-l  bg-primary-color  py-3 pr-2 text-white after:absolute after:-left-10 after:top-0 after:h-full after:w-10 after:rounded-l-md after:bg-primary-color"
                  : ""
              }
            >
              <Link to="#" className="flex items-center gap-x-2">
                <GrAppsRounded className="text-xl" />
                <span className="text-md font-intel font-normal">People</span>
              </Link>
            </li>

            <li
              className={
                active === "setting"
                  ? "relative  w-[120%]   border-l  bg-primary-color  py-3 pr-2 text-white after:absolute after:-left-10 after:top-0 after:h-full after:w-10 after:rounded-l-md after:bg-primary-color"
                  : ""
              }
            >
              <Link to="#" className="flex items-center gap-x-2">
                <CiSettings className="text-2xl" />
                <span className="text-md font-intel font-normal">Setting</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* button part jsx */}
        <button
          type="button"
          className=" mr-2 w-full rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={handleSignOut}
        >
          Log Out
        </button>
      </div>
    </>
  );
};

export default Homeleft;
