import React, { useState, useEffect } from "react";
import Search from "../../HomeComponent/Search/Index";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
const availableGroup = ({ title, SearchNeed }) => {
  const auth = getAuth();
  const db = getDatabase();
  const [ActiveMember, setActiveMember] = useState([]);
  useEffect(() => {
    //    Fetching data form want to join database
    const starCountRef = ref(db, "GroupMember/");
    onValue(starCountRef, (snapshot) => {
      let memberArr = [];
      snapshot.forEach((item) => {
        if (item.val().GroupjoinMemberid == auth.currentUser.uid) {
          memberArr.push({
            GroupJoinRequestid: item.key,
            GroupKey: item.val().GroupKey,
            AdminId: item.val().AdminId,
            AdminName: item.val().AdminName,
            GroupName: item.val().GroupName,
            GroupTagName: item.val().GroupTagName,
            GroupPhotourl: item.val().GroupPhotourl,
            GroupjoinMember: item.val().GroupjoinMember,
            //   GroupjoinMemberPhoto: item.val().GroupjoinMemberPhoto,
            GroupjoinMemberid: item.val().GroupjoinMemberid,
          });
        }
      });
      setActiveMember(memberArr);
    });
  }, []);
  return (
    <>
      <div>
        <h2 className="mb-3 font-intel text-2xl font-semibold">{title}</h2>
        {SearchNeed ? <Search /> : null}
        <div className=" mt-6 h-[620px] overflow-y-scroll ">
          <ul className="max-w-md divide-y divide-gray-200 py-3">
            {ActiveMember.map((item, i) => (
              <li className="cursor-pointer py-3 pb-3 sm:pb-5" key={i}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 ">
                    <img
                      className=" mr-2 h-10 w-10 rounded-full border-x border-t border-black"
                      src={item.GroupPhotourl}
                      alt={item.GroupPhotourl}
                    />
                  </div>
                  <div className="relative min-w-0 flex-1">
                    <p className="font-intel text-sm font-medium text-primary-color">
                      {item.GroupName}
                    </p>
                    <p className="truncate text-sm text-gray-500 ">
                      {item.GroupTagName}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-xl font-semibold text-primary-color">
                    <BsThreeDotsVertical className="mr-4 cursor-pointer" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {ActiveMember.length == 0 && (
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
                <span class="font-medium">No Groupmemmber Here!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default availableGroup;
