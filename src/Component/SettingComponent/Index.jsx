import React, { useState, useEffect, createRef } from "react";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-modal";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";
import { ref as databaseref, set, push, getDatabase } from "firebase/database";

import {
  getStorage,
  uploadString,
  ref,
  getDownloadURL,
} from "firebase/storage";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "1000px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const SettngRight = () => {
  const db = getDatabase();
  const auth = getAuth();
  const storage = getStorage();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  let [cropper, setCropper] = useState();
  let [displayName, setdisplayName] = useState("");
  let [photoUrl, setphotoUrl] = useState("");
  const [loading, setloading] = useState(false);
  const [render, setrender] = useState(false);
  const [Name, setName] = useState("");
  const [NameError, setNameError] = useState("");
  const [email, setemail] = useState("");
  const [uid, setuid] = useState("");

  // console.log(
  //   "displayName, photoURL, email, uid ::"
  //   // displayName
  //   // email
  //   // uid
  //   // photoUrl
  // );
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        let { displayName, photoURL, email, uid } = user;
        setdisplayName(displayName);
        setphotoUrl(photoURL);
        setuid(uid);
        setemail(email);
      }
    });
  }, [render]);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // take the choosen image this fuction HandleInputChagne
  const HandleInputChagne = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    if (!Name) {
      setNameError("Name missing");
    }
    if (typeof cropper !== "undefined") {
      setloading(true);
      const storageRef = ref(storage, auth.currentUser.uid);

      setCropData(cropper.getCroppedCanvas().toDataURL());

      const message4 = cropper.getCroppedCanvas().toDataURL();

      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((url) => {
          // console.log("storage uploading img download url", url);
          updateProfile(auth.currentUser, {
            photoURL: url,
            displayName: Name,
          })
            .then(() => {
              set(push(databaseref(db, "users/")), {
                username: displayName,
                email: email,
                photoURL: photoUrl,
                uid: uid,
              });
            })
            .then(() => {
              setloading(false);
              closeModal();
              setrender(!render);
              setImage("");
              setNameError("");
              setName("");
              setCropData("");
            })
            .catch((error) => {
              console.log("profile updated Error", error);
            });
        });
      });
    }
  };

  // input filend HandleChangeName fucnation

  const HandleChangeName = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="w-full p-8">
      <div className="mb-11 font-intel text-3xl font-semibold text-primary-color">
        <h1>Setting</h1>
      </div>

      <div className="flex">
        <div className="w-1/2">
          <div>
            <div className="mb-8">
              <p>Profile Setting</p>
            </div>
            <div class="flex items-center space-x-4 ">
              {photoUrl ? (
                <img
                  class="h-10 w-10 rounded-full"
                  src={photoUrl}
                  alt={photoUrl}
                />
              ) : (
                <img
                  class="h-10 w-10 rounded-full"
                  src="../../../public/images/Home/1.gif"
                  alt=""
                />
              )}

              <div class="font-medium">
                {displayName ? (
                  <div>{displayName}</div>
                ) : (
                  <div>{displayName}</div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div
              className="mb-3 flex cursor-pointer items-center  gap-x-3"
              onClick={() => openModal()}
            >
              <img
                src="../../../public/images/setting/3.gif"
                alt=""
                className="h-7 w-7 rounded-full border-x border-t "
              />
              <p>Edit Profile photo</p>
            </div>
            <div className="flex items-center gap-x-3">
              <img
                src="../../../public/images/setting/2.gif"
                alt=""
                className="h-7 w-7 rounded-full border-x border-t "
              />
              <p>Edit Profile Name</p>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div className="mb-11 font-intel font-normal text-primary-color">
              <h1>Account Setting</h1>
            </div>
            <div className="mb-3 flex items-center gap-x-3">
              <img
                src="../../../public/images/setting/3.gif"
                alt=""
                className="h-7 w-7 rounded-full border-x border-t "
              />
              <p>Change Password</p>
            </div>
          </div>
          <div>
            <div className="mb-3 flex items-center gap-x-3">
              <img
                src="../../../public/images/setting/4.gif"
                alt=""
                className="h-7 w-7 rounded-full border-x border-t "
              />
              <p>Theme</p>
            </div>
          </div>
          <div>
            <div className="mb-3 flex items-center gap-x-3">
              <img
                src="../../../public/images/setting/5.gif"
                alt=""
                className="h-7 w-7 rounded-full border-x border-t "
              />
              <p>Delete Account</p>
            </div>
          </div>
        </div>
      </div>
      {/* modal part  */}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="text-2xl text-primary-color">
          <button onClick={closeModal}>
            <div className="mb-2 mr-2 rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br ">
              <RxCross2 />
            </div>
          </button>
        </div>

        <div className="flex  w-full items-center justify-center">
          <label
            for="dropzone-file"
            className=" flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex  flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 ">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 ">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(events) => HandleInputChagne(events)}
            />
          </label>
        </div>

        <div className="  flex">
          <div>
            <Cropper
              style={{
                height: 100,
                width: "20%",
                marginTop: "20px",
                marginRight: "200px",
              }}
              zoomTo={0.5}
              initialAspectRatio={2}
              preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              guides={true}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            />
          </div>
          <div className="box" style={{ width: "100%", border: "red" }}>
            <div className="ml-52 mt-5 h-[100px]  w-[200px] overflow-hidden border-2 ">
              <div
                className="img-preview"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
        <div class="my-6">
          <label
            htmlFor="success"
            class="mb-2 block text-sm font-medium text-green-700 dark:text-green-500"
          >
            Your name
          </label>
          <input
            type="text"
            id="success"
            class="block w-full rounded-lg border border-green-500 bg-green-50 p-2.5 text-sm text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500"
            placeholder="Change Name"
            value={Name}
            onChange={(e) => HandleChangeName(e)}
          />
          <div className="font-intel text-sm font-normal text-red-500">
            {NameError ? NameError : null}
          </div>
        </div>

        {/* this part is after crop */}
        <div>
          <button
            type="button"
            onClick={getCropData}
            className="mt-2 w-full rounded-lg bg-gradient-to-br from-purple-500 to-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-tl "
          >
            Upload
            {loading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="absolute bottom-7 right-[43%]  mr-2 block h-5 w-5 animate-spin fill-green-500 text-gray-200 "
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
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SettngRight;
