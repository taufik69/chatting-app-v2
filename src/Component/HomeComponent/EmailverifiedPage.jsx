import React from "react";
import { Link } from "react-router-dom";

const EmailverifiedPage = ({ userName, email }) => {
  return (
    <>
      <div className=" flex h-screen items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  ">
        <figure className="mx-auto max-w-screen-md text-center">
          <svg
            aria-hidden="true"
            className="mx-auto mb-3 h-12 w-12 text-white"
            viewBox="0 0 24 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
              fill="currentColor"
            />
          </svg>
          <blockquote>
            <p className="italictext-white  text-2xl font-medium text-white">
              " {userName} Your Given Email {email} is Not Verified Please Go To
              Mail Box And Click The Given Live Links "
              <Link
                to="https://mail.google.com/mail/u/0/#inbox"
                target="_blank"
                className="mt-2 block text-4xl text-green-700 underline"
              >
                click here
              </Link>
            </p>
          </blockquote>
          <figcaption className="mt-6 flex items-center justify-center space-x-3">
            <img
              className="h-16 w-16 rounded-full"
              src="../../../public/images/Emailpage/avatar.gif"
              alt="profile picture"
            />
            <div className="flex items-center divide-x-2 divide-pink-500 dark:divide-gray-700">
              <cite className="pr-3 font-medium text-white">{userName}</cite>
              <cite className="pl-3 text-sm text-white ">CEO at Google</cite>
            </div>
          </figcaption>
        </figure>
      </div>
    </>
  );
};

export default EmailverifiedPage;
