import React, { useEffect, useState } from "react";
import Search from "../Search/Index";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import { GroupChat } from "../../../Slices/ChatSlice";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import { RxCross2 } from "react-icons/rx";
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
const Group = ({ title, SearchNeed, joinbtn }) => {
  const db = getDatabase();

  const auth = getAuth();
  const dispatch = useDispatch();
  let [grouplist, setgrouplist] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = (item) => {
    setIsOpen(true);
    set(push(ref(db, "GroupJoinRequest/")), {
      AdminId: item.AdminId,
      AdminName: item.AdminName,
      GroupKey: item.GroupKey,
      GroupName: item.GroupName,
      GroupTagName: item.GroupTagName,
      GroupPhotourl: item.GroupPhotourl,
      GroupjoinMember: auth.currentUser.displayName,
      GroupjoinMemberid: auth.currentUser.uid,
      GroupjoinMemberPhoto: auth.currentUser.photoURL,
    });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Fetching data from single message database zone
  useEffect(() => {
    const starCountRef = ref(db, "Grouplist/");
    onValue(starCountRef, (snapshot) => {
      let GrouplistArr = [];
      snapshot.forEach((item) => {
        GrouplistArr.push({
          AdminId: item.val().AdminId,
          AdminName: item.val().AdminName,
          GroupName: item.val().GroupName,
          GroupPhotourl: item.val().GroupPhotourl,
          GroupTagName: item.val().GroupTagName,
          GroupKey: item.key,
        });
      });

      setgrouplist(GrouplistArr);
    });
  }, []);

  // Sending data with redex store
  const HandleGrouplist = (item) => {
    console.log("Group msg info ", item);
    let userinfo = {};
    userinfo.status = "Groupmsg";
    userinfo.GroupName = item.GroupName;
    userinfo.GroupKey = item.GroupKey;
    userinfo.AdminId = item.AdminId;
    userinfo.AdminName = item.AdminName;

    dispatch(GroupChat(userinfo));
  };

  // HandleAcceptRequest button functionality

  return (
    <>
      <div>
        <h2 className="mb-3 font-intel text-2xl font-semibold">{title}</h2>
        {SearchNeed ? <Search /> : null}
        <div className={"mt-6 h-[225px]  cursor-pointer overflow-y-scroll"}>
          <ul className="max-w-md divide-y divide-gray-200 py-3">
            {grouplist.map((item, i) => (
              // item.AdminId != auth.currentUser.uid &&
              <li
                className="py-3 pb-3 sm:pb-5"
                key={i}
                onClick={() => HandleGrouplist(item)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 ">
                    <img
                      className=" mr-2 h-10 w-10 rounded-full border-x border-t border-black"
                      src={item.GroupPhotourl}
                      alt={item.GroupPhotourl}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-intel text-sm font-medium text-primary-color">
                      {item.GroupName}
                    </p>
                    <p className="truncate text-sm text-gray-500 ">
                      {item.GroupTagName}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {/* work for join btn  */}
                    {joinbtn && (
                      <button
                        type="button"
                        onClick={() => openModal(item)}
                        className=" mr-5 mt-2 w-full rounded-lg bg-gradient-to-br from-green-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl "
                      >
                        join
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {grouplist.length == 0 && (
            <div
              className="mb-4  flex rounded-lg border border-green-300 bg-green-50 p-4 text-sm text-green-800
              "
              role="alert"
            >
              <svg
                aria-hidden="true"
                className="mr-3 inline h-5 w-5 flex-shrink-0"
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
                <span className="font-medium">No Here!</span>
              </div>
            </div>
          )}
        </div>
        {/* modal part  */}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
          style={customStyles}
        >
          <div className="text-2xl text-primary-color">
            <button onClick={closeModal}>
              <div className="mb-2  rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br ">
                <RxCross2 />
              </div>
            </button>
          </div>

          <div className="w-full">
            <div className=" relative mt-5">
              <div>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => HandleAcceptGroupRequest(item)}
                    className=" mt-2 w-full rounded-lg bg-gradient-to-br from-green-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl "
                  >
                    Your are joined
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        {/* modal part */}
      </div>
    </>
  );
};

export default Group;
