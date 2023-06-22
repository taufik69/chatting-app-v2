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
        <div className="border-2 border-red-600 p-7">
          <Friends title={"Friends"} SearchNeed={true} />
        </div>
        <div>
          <MessageRight />
        </div>
      </div>
    </>
  );
};

export default Message;
