import React, { useState, useEffect } from "react";
import Search from "../Search/Index";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
const FriendRequest = ({ title, SearchNeed }) => {
  const db = getDatabase();
  const auth = getAuth();

  let [friendRequestItem, setfriendRequestItem] = useState([]);
  let [reRenderFriendRequest, setreRenderFriendRequest] = useState(false);
  let [isActiveFriendRequest, setisActiveFriendRequest] = useState(false);
  let [cancelFriendRequest, setcancelFriendRequest] = useState(false);

  useEffect(() => {
    const userRef = ref(db, "Friendrequest/");
    onValue(userRef, (snapshot) => {
      let friendRequestArray = [];
      snapshot.forEach((item) => {
        if (item.val().reciverUid == auth.currentUser.uid) {
          friendRequestArray.push({
            friendRequestedId: item.key,
            Senderid: item.val().Senderid,
            reciverEmail: item.val().reciverEmail,
            reciverName: item.val().reciverName,
            reciverUid: item.val().reciverUid,
            senderName: item.val().senderName,
          });
        }
      });
      setfriendRequestItem(friendRequestArray);
    });
  }, [reRenderFriendRequest]);

  // reRenderFriendRequest function machanism start

  const HandleAddFriendRequrest = (acceptitem) => {
    set(push(ref(db, "Friends/")), {
      friendRequestedId: acceptitem.friendRequestedId,
      senderName: acceptitem.senderName,
      Senderid: acceptitem.Senderid,
      reciverUid: acceptitem.reciverUid,
      reciverName: acceptitem.reciverName,
      date: `${new Date().getDate()} / ${
        new Date().getMonth() + 1
      } / ${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, "Friendrequest/" + acceptitem.friendRequestedId));
    });
    setisActiveFriendRequest(true);
  };

  // Now Work for HandleCancelRequest button
  const HandleCancelRequest = (rejectitem) => {
    remove(ref(db, "Friendrequest/" + rejectitem.friendRequestedId));
    setcancelFriendRequest(true);
    setreRenderFriendRequest(!reRenderFriendRequest);
  };

  return (
    <>
      <div className=" ">
        <h2 className="mb-3 font-intel text-2xl font-semibold">{title}</h2>
        {SearchNeed ? <Search /> : null}
        <div className=" mt-6 h-[225px] overflow-y-scroll">
          <ul className="max-w-md divide-y divide-gray-200 py-3">
            {friendRequestItem.map((item) => (
              <li className="py-3 pb-3 sm:pb-5">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 ">
                    <img
                      className="mr-2 h-10 w-10 rounded-full border-x border-t border-black"
                      src="../../../../public/images/Home/4.gif"
                      alt="public/images/Home/oggy.gif"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-intel text-sm font-medium text-primary-color">
                      {item.senderName}
                    </p>
                  </div>
                  <div className=" flex items-center justify-around gap-3">
                    {isActiveFriendRequest ? (
                      <button
                        type="button"
                        className=" mt-2 w-full rounded-lg bg-gradient-to-br from-green-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl "
                      >
                        Accepted
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => HandleAddFriendRequrest(item)}
                        className=" mt-2 w-full rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl "
                      >
                        Accept
                      </button>
                    )}

                    {cancelFriendRequest ? (
                      <button
                        type="button"
                        className=" mt-2 w-full rounded-lg bg-gradient-to-br from-purple-500 to-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-tl "
                      >
                        Canceled
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => HandleCancelRequest(item)}
                        className=" mt-2 w-full rounded-lg bg-gradient-to-br from-purple-600 to-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl "
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {friendRequestItem.length == 0 && (
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
                <span class="font-medium">No Requrest Here!</span> Wait for
                freind Request
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FriendRequest;
