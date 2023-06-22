import React, { useState, useEffect } from "react";
import Search from "../Search/Index";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { ActiveChatReducer } from "../../../Slices/ChatSlice";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
const Friends = ({ title, SearchNeed, overflow }) => {
  const db = getDatabase();
  const auth = getAuth();
  const dispatch = useDispatch();

  let [friendList, setfriendList] = useState([]);
  const [blockState, setblockState] = useState(false);

  useEffect(() => {
    const userRef = ref(db, "Friends/");
    onValue(userRef, (snapshot) => {
      let friendListArray = [];
      snapshot.forEach((item) => {
        friendListArray.push({
          id: item.key,
          friendRequestedId: item.val().friendRequestedId,
          reciverName: item.val().reciverName,
          reciverUid: item.val().reciverUid,
          senderName: item.val().senderName,
          Senderid: item.val().Senderid,
          date: item.val().date,
        });
      });
      setfriendList(friendListArray);
    });
  }, [blockState]);
  // console.log("friendList", friendList);

  // HandleBlock functionatlity
  const HandleBlock = (blockitem) => {
    if (auth.currentUser.uid == blockitem.reciverUid) {
      set(push(ref(db, "Block/")), {
        block: blockitem.senderName,
        blockId: blockitem.Senderid,
        blockby: blockitem.reciverName,
        blockbyId: blockitem.reciverUid,
        blockDate: `${new Date().getFullYear()} - ${
          new Date().getMonth() + 1
        } - ${new Date().getDate()}`,
      }).then(() => {
        remove(ref(db, "Friends/" + blockitem.id));
      });
      setblockState(!blockState);
    }
  };
  // reduer HandleActiveChatReducer function machanism
  const HandleActiveChatReducer = (item) => {
    let userinfo = {};
    if (auth.currentUser.uid == item.reciverUid) {
      // console.log('reciver don\'t need');
      userinfo.status = "singlemsg";
      userinfo.id = item.Senderid;
      userinfo.name = item.senderName;
    } else {
      // console.log("reciver need");
      userinfo.status = "singlemsg";
      userinfo.id = item.reciverUid;
      userinfo.name = item.reciverName;
    }
    dispatch(ActiveChatReducer(userinfo));
  };
  return (
    <>
      <div className="">
        <h2 className="mb-3 font-intel text-2xl font-semibold">{title}</h2>
        {SearchNeed ? <Search /> : null}
        <div
          className={
            overflow ? "mt-6 h-[225px] overflow-y-scroll" : "mt-6 h-[225px]"
          }
        >
          <ul className="max-w-md divide-y divide-gray-200 py-3">
            {friendList.map((item) => (
              <li className="py-3 pb-3 sm:pb-5">
                <div
                  className="flex cursor-pointer items-center space-x-4"
                  onClick={() => HandleActiveChatReducer(item)}
                >
                  <div className="flex-shrink-0">
                    <img
                      className="mr-2 h-10 w-10 rounded-full border-x border-t border-black"
                      src="../../../../public/images/Home/6.gif"
                      alt="public/images/Home/oggy.gif"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-intel text-sm font-medium text-primary-color">
                      {auth.currentUser.uid == item.reciverUid ? (
                        <h2>{item.senderName} </h2>
                      ) : (
                        <h2>{item.reciverName} </h2>
                      )}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-xl font-semibold text-primary-color">
                    {blockState ? (
                      <button
                        type="button"
                        onClick={() => HandleBlock(item)}
                        className=" mt-2 w-full rounded-lg bg-gradient-to-br from-purple-500 to-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-tl "
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => HandleBlock(item)}
                        className=" mt-2 w-full rounded-lg bg-gradient-to-br from-purple-500 to-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-tl "
                      >
                        Block
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {friendList.length == 0 && (
            <div
              class="mb-4 flex rounded-lg border border-green-300 bg-green-50 p-4 text-sm text-green-800
              "
              role="alert"
            >
              <svg
                aria-hidden="true"
                class="mr-3 inline h-5 w-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                ></path>
              </svg>

              <div>
                <span class="font-medium">No Friend Here!</span> Wait for freind
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Friends;
