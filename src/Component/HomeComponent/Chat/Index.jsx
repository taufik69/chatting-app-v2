import React, { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Search from "../Search/Index";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
const Chat = ({ title, SearchNeed }) => {
  const db = getDatabase();
  const auth = getAuth();
  let [userlistitem, setuserlistitem] = useState([]);

  useEffect(() => {
    const userRef = ref(db, "Friends/");
    onValue(userRef, (snapshot) => {
      let userArray = [];
      snapshot.forEach((item) => {
        userArray.push(item.val());
      });
      setuserlistitem(userArray);
    });
  }, []);

  return (
    <>
      <div className="">
        <h2 className="mb-3 font-intel text-2xl font-semibold">{title}</h2>
        {SearchNeed ? <Search /> : null}
        <div className=" mt-6 h-[225px] overflow-y-scroll ">
          <ul className="max-w-md divide-y divide-gray-200 py-3">
            {userlistitem.map((item) => (
              <li className="py-3 pb-3 sm:pb-5">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 ">
                    <img
                      className="mr-2 h-10 w-10 rounded-full border-x border-t border-black"
                      src="../../../../public/images/Home/oggy.gif"
                      alt="public/images/Home/oggy.gif"
                    />
                  </div>
                  <div className="relative min-w-0 flex-1">
                    <p className="font-intel text-sm font-medium text-primary-color">
                      {item.senderName}
                    </p>
                    <p className="truncate text-sm text-gray-500 ">
                      email@flowbite.com
                    </p>
                    <p className="absolute right-5 top-5 text-xs text-gray-500">
                      {item.date}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-xl font-semibold text-primary-color">
                    <BsThreeDotsVertical className="mr-4" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Chat;
