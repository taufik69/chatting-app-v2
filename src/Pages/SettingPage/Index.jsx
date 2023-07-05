import React from "react";
import Homeleft from "../../Component/HomeComponent/Homeleft";
import SettngRight from "../../Component/SettingComponent/Index";
const setting = () => {
  return (
    <>
      <div className="flex ">
        <div>
          <Homeleft active="setting" />
        </div>
        <div className="h-screen w-full">
          <SettngRight />
        </div>
      </div>
    </>
  );
};

export default setting;
