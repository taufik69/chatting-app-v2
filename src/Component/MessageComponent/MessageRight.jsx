import React, { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { HiOutlineCamera } from "react-icons/hi";
import { useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
const MessageRight = ({ overflow }) => {
  const db = getDatabase();
  const auth = getAuth();

  const [msg, setmsg] = useState("");
  const [msgStrogestate, setmsgStrogestate] = useState([]);

  let userInfo = useSelector((state) => state.chat);
  const userinfofromLocalStriage = JSON.parse(localStorage.getItem("userinfo"));
  const { name, status, id } = userInfo.value;

  // catch data from input field

  let HandleinputMsg = (event) => {
    setmsg(event.target.value);
  };

  // single message functionality
  let HandleSendMsg = () => {
    if (msg != "") {
      if (status == "singlemsg") {
        const postmsgRef = ref(db, "Singlemsg/");
        set(push(postmsgRef), {
          whoSendId: auth.currentUser.uid,
          whoSendName: auth.currentUser.displayName,
          whoRecivedId: id,
          whoRecivedName: name,
          msg: msg,

          date: `
                        ${new Date().getFullYear()}-
                        ${new Date().getMonth() + 1}-
                        ${new Date().getDate()}
                        ${new Date().getHours()}:
                        ${new Date().getMinutes()}:
                        ${new Date().getSeconds()}

                    `,
        }).then(() => {
          setmsg("");
        });
      }
    }
  };

  // Fetching data from single message database zone
  useEffect(() => {
    const starCountRef = ref(db, "Singlemsg/");
    onValue(starCountRef, (snapshot) => {
      let msgStroge = [];
      snapshot.forEach((item) => {
        if (
          (item.val().whoSendId == auth.currentUser.uid &&
            item.val().whoRecivedId == id) ||
          (item.val().whoSendId == id &&
            item.val().whoRecivedId == auth.currentUser.uid)
        ) {
          msgStroge.push(item.val());
        }
      });

      setmsgStrogestate(msgStroge);
    });
  }, [id]);

  return (
    <div>
      <div
        className={
          overflow
            ? " mt-11  overflow-y-scroll px-6 shadow-lg"
            : " mt-11 px-6 shadow-lg"
        }
      >
        <ul className="max-w-md divide-y divide-gray-200 py-3">
          <li className="py-3 pb-3 sm:pb-5">
            <div
              className="flex cursor-pointer items-center space-x-4"
              onClick={() => HandleActiveChatReducer(item)}
            >
              <div className="flex-shrink-0">
                <img
                  className="mr-2 h-10 w-10 rounded-full border-x border-t border-black"
                  src="../../../../public/images/Home/3.gif"
                  alt="public/images/Home/oggy.gif"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-intel text-sm font-medium text-primary-color">
                  {userinfofromLocalStriage.name
                    ? userinfofromLocalStriage.name
                    : name}
                </p>
              </div>
              <div className="text-2xl font-semibold text-primary-color ">
                <BsThreeDotsVertical className="ml-[630px]" />
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className=" m-4  h-[500px]  flex-col overflow-y-scroll">
        {msgStrogestate.map((item) =>
          item.whoSendId == auth.currentUser.uid ? (
            <div className="flex justify-end">
              <div className=" m-5 mt-20 items-end rounded bg-gradient-to-r from-primary-color via-primary-color to-purple-700  px-[30px] py-[7px]">
                <div className="text-[18px] font-normal text-white">
                  {item.msg}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-start">
              <div className=" m-5 items-start  rounded bg-gradient-to-r from-blue-700  to-gray-700 px-[30px] py-[7px] text-teal-50">
                <div className="text-neutral-800 text-[18px] font-normal">
                  {item.msg}
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <div className="p-3">
        <div className="flex">
          <div className="relative w-full">
            <input
              type="text "
              id="search-dropdown"
              onChange={HandleinputMsg}
              value={msg}
              className="z-20  w-full rounded-r-lg border border-l-2 border-blue-300 border-l-blue-100 bg-gray-50 p-2.5 text-sm text-gray-900"
              placeholder="text here"
            />
            <button
              type="submit"
              className="absolute right-20 top-0 rounded border border-green-700 bg-green-700 p-2.5 text-xl font-medium text-white hover:bg-blue-800  "
            >
              <HiOutlineCamera />
            </button>
            <button
              type="submit"
              onClick={() => HandleSendMsg()}
              className="absolute right-0 top-0 rounded-r-lg border border-blue-700 bg-blue-700 p-2.5 text-xl font-medium text-white hover:bg-blue-800  "
            >
              <AiOutlineSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageRight;
