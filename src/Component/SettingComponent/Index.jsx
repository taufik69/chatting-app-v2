import React from "react";

const SettngRight = () => {
  return (
    <div className="w-full p-8">
      <div className="mb-11 font-intel text-3xl font-semibold text-primary-color">
        <h1>Setting</h1>
      </div>

      <div className="flex">
        <div className="w-1/2">
          <div>
            <div className="mb-4">
              <p>Profile Setting</p>
            </div>
            <div class="flex items-center space-x-4 ">
              <img
                class="h-10 w-10 rounded-full"
                src="../../../public/images/Home/3.gif"
                alt=""
              />
              <div class="font-medium dark:text-white">
                <div>Jese Leos</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  Joined in August 2014
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="mb-3 flex items-center gap-x-3">
              <img
                src="../../../public/images/setting/1.gif"
                alt=""
                className="h-7 w-7 rounded-full border-x border-t "
              />
              <p>Edit Profile Info</p>
            </div>
            <div className="flex items-center gap-x-3">
              <img
                src="../../../public/images/setting/2.gif"
                alt=""
                className="h-7 w-7 rounded-full border-x border-t "
              />
              <p>Edit Profile Photo</p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <p>Account Setting</p>
          </div>
          <div>
            <p>Change Password</p>
            <p>Change Password</p>
            <p>Change Password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettngRight;
