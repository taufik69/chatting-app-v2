import React, { useState, useEffect } from "react";
import Search from "../Search/Index";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";

const People = ({ title, SearchNeed }) => {
  const db = getDatabase();
  const auth = getAuth();
  let [userlistitem, setuserlistitem] = useState([]);
  let [frdrequestlist, setfrdrequestlist] = useState([]);
  let [reRenderFriendRequest, setreRenderFriendRequest] = useState(false);

  useEffect(() => {
    let userArray = [];
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      snapshot.forEach((item) => {
        userArray.push({
          username: item.val().username,
          email: item.val().email,
          uid: item.val().uid,
        });
      });
      setuserlistitem(userArray);
    });
  }, []);

  // HandleAddFriendRequrest functionality in below this fuction
  const HandleAddFriendRequrest = (userItem) => {
    set(push(ref(db, "Friendrequest/")), {
      reciverName: userItem.username,
      reciverUid: userItem.uid,
      reciverEmail: userItem.email,
      senderName: auth.currentUser.displayName,
      Senderid: auth.currentUser.uid,
    });

    setreRenderFriendRequest(!reRenderFriendRequest);
  };
  useEffect(() => {
    let FriendrequestArray = [];
    const FriendrequestRef = ref(db, "Friendrequest/");
    onValue(FriendrequestRef, (snapshot) => {
      snapshot.forEach((item) => {
        FriendrequestArray.push(item.val().reciverUid + item.val().Senderid);
      });
      setfrdrequestlist(FriendrequestArray);
    });
  }, [reRenderFriendRequest]);

  return (
    <>
      <div className="h-[40%] w-[32%] ">
        <h2 className="mb-3 font-intel text-2xl font-semibold">{title}</h2>
        {SearchNeed ? <Search /> : null}

        <div className=" mt-6 h-[84%] overflow-y-scroll">
          <ul className="max-w-md divide-y divide-gray-200 py-3">
            {userlistitem.map(
              (item) =>
                auth.currentUser.uid !== item.uid && (
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
                          {item.username}
                        </p>
                        <p className="truncate text-sm text-gray-500 ">
                          {item.email}
                        </p>
                      </div>
                      <div className=" flex items-center justify-around ">
                        {frdrequestlist.includes(
                          item.uid + auth.currentUser.uid ||
                            auth.currentUser.uid + item.uid
                        ) ? (
                          <button
                            type="button"
                            className="mr-4 mt-2 w-full rounded-lg bg-gradient-to-br from-purple-500 to-green-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl  "
                          >
                            Added
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => HandleAddFriendRequrest(item)}
                            className="mr-4 mt-2 w-full rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl"
                          >
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default People;
