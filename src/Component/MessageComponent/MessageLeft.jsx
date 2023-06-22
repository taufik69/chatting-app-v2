import React from "react";

const MessageLeft = ({ title, SearchNeed }) => {
  return (
    <>
      <div className="h-[100%] w-[32%] ">
        <h2 className="mb-3 font-intel text-2xl font-semibold">{title}</h2>
        {SearchNeed ? <Search /> : null}
        <div className=" mt-6 h-[84%] overflow-y-scroll">
          <ul className="max-w-md divide-y divide-gray-200 py-3">
            {friendList.map((item) => (
              <li className="py-3 pb-3 sm:pb-5">
                <div
                  className="flex cursor-pointer items-center space-x-4"
                  onClick={() => HandleActiveChatReducer(item)}
                >
                  <div className="flex-shrink-0 ">
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

export default MessageLeft;
