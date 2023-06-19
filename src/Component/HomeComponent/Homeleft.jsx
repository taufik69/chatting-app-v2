import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BiMessageRounded, BiGroup } from "react-icons/bi";
const Homeleft = () => {
  const auth = getAuth();
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

  return (
    <>
      <div className="w[30%] p-5 px-7 shadow-lg shadow-indigo-500/40">
        <div>
          <h1 className="mb-4 font-intel text-4xl font-bold text-primary-color">
            Chatt.
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
              <span className="absolute bottom-0 left-7  h-3.5 w-3.5 rounded-full border-2 border-white bg-green-400 dark:border-gray-800"></span>
            </div>
          ) : (
            <div className="relative">
              <img
                className="h-10 w-10 rounded-full"
                src="../../../public/images/Emailpage/avatar.gif"
                alt="Home page avatar"
              />
              <span className="absolute bottom-0 left-7  h-3.5 w-3.5 rounded-full border-2 border-white bg-green-400 dark:border-gray-800"></span>
            </div>
          )}

          <div className="px-7 font-intel">
            <p className=" text-xl font-semibold  text-primary-color">
              {DisplayName}
            </p>
            <p className="text-md  font-normal text-[#7A7A7A]">Active</p>
          </div>
        </div>

        {/* This part covered navbar */}

        <div className="">
          <ul className="flex flex-col items-center justify-around">
            <li>
              <Link to="#" className="flex items-center">
                <AiOutlineHome />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="flex items-center">
                <BiMessageRounded />
                <span>Message</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="flex items-center">
                <AiOutlineHome />
                <span>Group</span>
              </Link>
            </li>

            <li>
              <Link to="#" className="flex items-center">
                <AiOutlineHome />
                <span>Group</span>
              </Link>
            </li>

            <li>
              <Link to="#" className="flex items-center">
                <AiOutlineHome />
                <span>Group</span>
              </Link>
            </li>

            <li>
              <Link to="#" className="flex items-center">
                <AiOutlineHome />
                <span>Group</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Homeleft;
