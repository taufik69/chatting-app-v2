import React, { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { HiOutlineCamera } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import {
  getStorage,
  ref as storeRef,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import Modal from "react-modal";

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

const MessageRight = ({ overflow }) => {
  const db = getDatabase();
  const auth = getAuth();
  const storage = getStorage();

  const [msg, setmsg] = useState("");
  const [image, setimage] = useState(null);
  const [progress, setprogress] = useState(null);
  const [msgStrogestate, setmsgStrogestate] = useState([]);

  let userInfo = useSelector((state) => state.chat.value);
  const userinfofromLocalStriage = JSON.parse(localStorage.getItem("userinfo"));
  let { name, status, id } = userInfo;

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

  // modal add and HandleUploadImage functionality
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // get a img on this fucntion
  const HandleUploadImage = (event) => {
    setimage(event.target.files[0]);
  };

  // Upload and download image on single database
  const HandleSendImage = () => {
    const storageRef = storeRef(storage, "Chatimages/" + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image);

    // this function work for upload and download image
    uploadTask.on(
      "state_changed",
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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at this downloadURL  :", downloadURL);

          // trough image on firebase realtime database
          if (image != "") {
            if (status == "singlemsg") {
              const postmsgRef = ref(db, "Singlemsg/");
              set(push(postmsgRef), {
                whoSendId: auth.currentUser.uid,
                whoSendName: auth.currentUser.displayName,
                whoRecivedId: id,
                whoRecivedName: name,
                ChatImg: downloadURL,
                date: `
                            ${new Date().getFullYear()}- 
                            ${new Date().getMonth() + 1}- 
                            ${new Date().getDate()}  
                            ${new Date().getHours()}:
                            ${new Date().getMinutes()}:
                            ${new Date().getSeconds()}`,
              }).then(() => {
                setimage(null);
                setprogress(null);
                setIsOpen(false);
              });
            }
          }
        });
      }
    );
  };

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
                    : userInfo.name}
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
            item.msg ? (
              <div className="flex justify-end">
                <div className=" m-5 mt-20 items-end rounded bg-gradient-to-r from-primary-color via-primary-color to-purple-700  px-[30px] py-[7px]">
                  <div className="text-[18px] font-normal text-white">
                    {item.msg}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-end">
                <div className=" m-5 mt-20 items-end rounded bg-gradient-to-r from-gray-300  to-gray-300 px-[5px] py-[4px]">
                  <div>
                    <img
                      className="h-[200px] w-[200px]"
                      src={item.ChatImg}
                      alt={item.ChatImg}
                    />
                  </div>
                </div>
              </div>
            )
          ) : item.msg ? (
            <div className="flex justify-start">
              <div className=" m-5 items-start  rounded bg-gradient-to-r from-blue-700  to-gray-700 px-[30px] py-[7px] text-teal-50">
                <div className="text-neutral-800 text-[18px] font-normal">
                  {item.msg}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-start">
              <div className="m-2 items-start  rounded bg-gradient-to-r from-gray-300  to-gray-300 px-[5px] py-[4px] text-teal-50">
                <div>
                  <img
                    src={item.ChatImg}
                    alt={item.ChatImg}
                    className="h-[200px] w-[200px]"
                  />
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
              onClick={openModal}
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
            <div className="flex  items-center justify-center">
              <label
                for="dropzone-file"
                className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    aria-hidden="true"
                    className="mb-3 h-10 w-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 ">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 ">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={HandleUploadImage}
                />
              </label>
            </div>
            <div class="mt-5 w-full rounded-full bg-gray-200">
              <div
                className="rounded-full bg-gradient-to-r from-purple-800 via-green-400 to-green-600 p-2  text-center text-xs font-medium leading-none text-blue-100 "
                style={{ width: `${progress}%` }}
              >
                {progress == null ? `` : `${progress}%`}
              </div>
            </div>

            <div className="mt-10 flex justify-evenly">
              <div>
                <button
                  type="submit"
                  onClick={HandleSendImage}
                  className="mb-2 mr-2 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br  "
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      {/* modal part */}
    </div>
  );
};

export default MessageRight;
