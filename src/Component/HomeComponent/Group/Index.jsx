import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Search from "../Search/Index";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
const Group = ({ title, SearchNeed }) => {
  const db = getDatabase();
  const auth = getAuth();

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
    <>
      <div className="">
        <h2 className="mb-3 font-intel text-2xl font-semibold">{title}</h2>
        {SearchNeed ? <Search /> : null}
        <div className="mt-6 h-[225px] overflow-y-scroll">
          <ul className="max-w-md divide-y divide-gray-200 py-3">
            <li className="py-3 pb-3 sm:pb-5">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 ">
                  <img
                    className="mr-2 h-10 w-10 rounded-full border-x border-t border-black"
                    src="../../../../public/images/Home/2.gif"
                    alt="public/images/Home/oggy.gif"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-intel text-sm font-medium text-primary-color">
                    Neil Sims
                  </p>
                  <p className="truncate text-sm text-gray-500 ">
                    email@flowbite.com
                  </p>
                </div>
                <div className="inline-flex items-center text-xl font-semibold text-primary-color">
                  <BsThreeDotsVertical className="mr-4" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Group;
