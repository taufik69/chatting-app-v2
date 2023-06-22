import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import Search from "../Search/Index";

const BlockList = ({ title, SearchNeed }) => {
  const db = getDatabase();
  const auth = getAuth();

  let [blockedtItem, setblockedtItem] = useState([]);
  let [reRenderBlock, setreRenderBlock] = useState(true);

  // fetch data from block objecct

  useEffect(() => {
    const userRef = ref(db, "Block/");
    onValue(userRef, (snapshot) => {
      let blockListArray = [];
      snapshot.forEach((item) => {
        if (item.val().blockbyId == auth.currentUser.uid) {
          blockListArray.push({
            id: item.key,
            block: item.val().block,
            blockDate: item.val().blockDate,
            blockby: item.val().blockby,
            blockId: item.val().blockId,
            blockbyId: item.val().blockbyId,
          });
        } else if (auth.currentUser.uid == item.blockId) {
          blockListArray.push({
            id: item.key,
            block: item.val().block,
            blockDate: item.val().blockDate,
            blockby: item.val().blockby,
            blockId: item.val().blockId,
            blockbyId: item.val().blockbyId,
          });
        }
      });
      setblockedtItem(blockListArray);
    });
  }, [reRenderBlock]);

  // HandleUnBlock functionality
  const HandleUnBlock = (blockinfo) => {
    set(push(ref(db, "Friends/")), {
      senderName: blockinfo.block,
      Senderid: blockinfo.blockId,
      reciverUid: auth.currentUser.uid,
      reciverName: auth.currentUser.displayName,
      friendRequestedId: blockinfo.id,
      date: `${new Date().getFullYear()} - ${
        new Date().getMonth() + 1
      } - ${new Date().getDate()}`,
    }).then(() => {
      remove(ref(db, "Block/" + blockinfo.id));
    });
    setreRenderBlock(false);
  };

  return (
    <>
      <div className="">
        <h2 className="mb-3 font-intel text-2xl font-semibold">{title}</h2>
        {SearchNeed ? <Search /> : null}
        <div className=" mt-6 h-[225px] overflow-y-scroll">
          <ul className="max-w-md divide-y divide-gray-200 py-3">
            {blockedtItem.map((item) => (
              <li className="py-3 pb-3 sm:pb-5">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 ">
                    <img
                      className="mr-2 h-10 w-10 rounded-full border-x border-t border-black"
                      src="../../../../public/images/Home/5.gif"
                      alt="public/images/Home/6.gif"
                    />
                  </div>
                  <div className="relative min-w-0 flex-1">
                    <p className="font-intel text-sm font-medium text-primary-color">
                      {item.block}
                    </p>

                    <p className="absolute right-5 top-1 text-xs text-gray-500">
                      5.55 pm
                    </p>
                  </div>
                  <div className="inline-flex items-center text-xl font-semibold text-primary-color">
                    {auth.currentUser.uid == item.blockbyId ? (
                      <button
                        type="button"
                        onClick={() => HandleUnBlock(item)}
                        className=" mt-2 w-full rounded-lg bg-gradient-to-br from-purple-500 to-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-tl "
                      >
                        UnBlock
                      </button>
                    ) : (
                      <button
                        type="button"
                        className=" mt-2 w-full rounded-lg bg-gradient-to-br from-purple-500 to-green-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-tl "
                      >
                        Done
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {blockedtItem.length == 0 && (
            <div
              class="mb-4  flex rounded-lg border border-green-300 bg-green-50 p-4 text-sm text-green-800
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
                <span class="font-medium">No Blocked Here!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlockList;
