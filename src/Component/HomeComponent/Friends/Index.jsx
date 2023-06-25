import React, { useState, useEffect } from "react";
import Search from "../Search/Index";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { ActiveChatReducer } from "../../../Slices/ChatSlice";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-modal";
import {
  getStorage,
  ref as storeRef,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "700px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const Friends = ({ title, SearchNeed, overflow, groupButton }) => {
  const db = getDatabase();
  const auth = getAuth();
  const storage = getStorage();
  const dispatch = useDispatch();

  let [friendList, setfriendList] = useState([]);
  const [blockState, setblockState] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [groupImg, setgroupImg] = useState(null);
  const [groupName, setgroupName] = useState("");
  const [groupTagName, setgroupTagName] = useState("");
  const [ErrorNameError, setErrorNameError] = useState("");
  const [ErrorTagError, setErrorTagError] = useState("");
  const [progress, setprogress] = useState(null);
  const [loading, setloading] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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
      userinfo.status = "groupmsg";
      userinfo.id = item.reciverUid;
      userinfo.name = item.reciverName;
    }
    dispatch(ActiveChatReducer(userinfo));
    localStorage.setItem("userinfo", JSON.stringify(userinfo));
  };

  // Handle HandleGroupImg functionality

  const HandleGroupImg = (event) => {
    setgroupImg(event.target.files[0]);
  };

  // HandleCreateGroup and send data from database
  const HandleCreateGroup = () => {
    setloading(true);
    if (!groupName) {
      setErrorNameError("GroupName missing");
    } else if (!groupTagName) {
      setErrorTagError("group tag Missing");
    } else {
      setErrorNameError("");
      setErrorTagError("");
      // upload group info in  the database

      const storageRef = storeRef(
        storage,
        "GroupImages/" + auth.currentUser.uid
      );
      const uploadTask = uploadBytesResumable(storageRef, groupImg);

      uploadTask.on(
        "",
        (snapshot) => {
          const progresper = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setprogress(progresper);
          console.log("Upload is " + progresper + "% done");
        },

        (error) => {
          console.log("iamge upload failed ", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log("File available at this downloadURL  :", downloadURL);

              // trough image on firebase realtime database
              set(push(ref(db, "Grouplist/")), {
                GroupName: groupName,
                GroupTagName: groupTagName,
                AdminId: auth.currentUser.uid,
                AdminName: auth.currentUser.displayName,
                GroupPhotourl: downloadURL,
              });
            })
            .then(() => {
              console.log("from last vanish part");
              setgroupImg(null);
              setIsOpen(false);
              setprogress(null);
              setloading(false);
            });
        }
      );
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-between">
          <div>
            <h2 className="mb-3 font-intel text-2xl font-semibold">{title}</h2>
          </div>
          <div>
            {groupButton && (
              <button
                type="button"
                onClick={openModal}
                class="mb-2 mr-2 rounded-lg bg-gradient-to-r from-green-400 via-green-500  to-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br"
              >
                Group
              </button>
            )}
          </div>
        </div>

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
        {/* modal part  */}
        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <div className="text-2xl text-primary-color">
              <button onClick={closeModal}>
                <div className="mb-2 mr-2 rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br ">
                  <RxCross2 />
                </div>
              </button>
            </div>

            <div className="w-full">
              <div>
                <div class="mb-6 w-full">
                  <label
                    for="success"
                    class="mb-2 block text-sm font-medium text-green-700 dark:text-green-500"
                  >
                    Group name
                  </label>
                  <input
                    type="text"
                    id="success"
                    class="block w-full rounded-lg border border-green-500 bg-green-50 p-2.5 text-sm text-green-900 placeholder-green-700 "
                    placeholder="Success input"
                    value={groupImg}
                    onChange={(e) => setgroupName(e.target.value)}
                    required
                  />
                  <div className="text-red-700">
                    <p>{ErrorNameError ? ErrorNameError : ""}</p>
                  </div>
                </div>
                <div class="mb-6 w-full">
                  <label
                    for="success"
                    class="mb-2 block text-sm font-medium text-green-700 dark:text-green-500"
                  >
                    Group Tag Line
                  </label>
                  <input
                    type="text"
                    id="success"
                    class="block w-full rounded-lg border border-green-500 bg-green-50 p-2.5 text-sm text-green-900 placeholder-green-700 "
                    placeholder="Success input"
                    onChange={(e) => setgroupTagName(e.target.value)}
                    required
                  />
                  <div className="text-red-700">
                    <p> {ErrorTagError ? ErrorTagError : null} </p>
                  </div>
                </div>

                <div>
                  <label
                    class="mb-2 block text-sm font-medium text-gray-900 "
                    for="file_input"
                  >
                    Upload file
                  </label>
                  <input
                    class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 "
                    id="file_input"
                    onChange={HandleGroupImg}
                    type="file"
                  />
                </div>
                {progress == null ? (
                  ""
                ) : (
                  <div class="mt-5 w-full rounded-full bg-gray-200">
                    <div
                      className="rounded-full bg-gradient-to-r from-purple-800 via-green-400 to-green-600 p-2  text-center text-xs font-medium leading-none text-blue-100 "
                      style={{ width: `${progress}%` }}
                    >
                      {progress == null ? `` : `${progress}%`}
                    </div>
                  </div>
                )}

                <div className=" relative mt-5">
                  <div>
                    <button
                      type="submit"
                      onClick={HandleCreateGroup}
                      className="mb-2 mr-2 w-full rounded-lg bg-gradient-to-r from-green-400 via-green-500  to-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br"
                    >
                      Create Group
                    </button>
                  </div>
                  {loading ? (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="absolute right-56 top-2 mr-2 h-6 w-6 animate-spin fill-green-500 text-gray-200 "
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </Modal>
        </div>
        {/* modal part */}
      </div>
    </>
  );
};

export default Friends;
