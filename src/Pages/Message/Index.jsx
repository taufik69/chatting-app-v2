import React from "react";
import MessageRight from "../../Component/MessageComponent/MessageRight";
import Homeleft from "../../Component/HomeComponent/Homeleft";
import Friends from "../../Component/HomeComponent/Friends/Index";
const Message = () => {
  return (
    <>
      <div className="flex ">
        <div>
          <Homeleft active="message" />
        </div>
        <div className="w-1/3  px-10 py-6">
          <Friends
            title={"Friends"}
            SearchNeed={true}
            overflow={false}
            groupButton={true}
          />
        </div>
        <div className=" w-1/2  border-2">
          <MessageRight overflow={true} />
        </div>
      </div>
    </>
  );
};

export default Message;
