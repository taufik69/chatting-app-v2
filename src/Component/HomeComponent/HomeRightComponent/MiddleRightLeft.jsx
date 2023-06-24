import React from "react";
import Chat from "../Chat/Index";
import Group from "../Group/Index";
import Friends from "../Friends/Index";
import People from "../People/Index";
import FriendRequest from "../FriendRequest/Index";
import BlockList from "../BlockList/Index";
const MiddleRightLeft = () => {
  return (
    <>
      <div className=" flex h-screen w-full  flex-wrap gap-5 p-5">
        <div className="h-[40%] w-[32%] ">
          <Chat title="Chat" SearchNeed={true} />
        </div>
        <div className="h-[40%] w-[32%]">
          <Group title="Group" SearchNeed={true} />
        </div>
        <div className="h-[40%] w-[32%]">
          <Friends title="Friends" SearchNeed={true} groupButton={false} />
        </div>
        <div className="h-[40%] w-[32%]">
          <People title="People" SearchNeed={true} />
        </div>
        <div className="h-[40%] w-[32%]">
          <FriendRequest title="FriendRequest" SearchNeed={true} />
        </div>
        <div className="h-[40%] w-[32%]">
          <BlockList title="BlockList" SearchNeed={true} />
        </div>
      </div>
    </>
  );
};

export default MiddleRightLeft;
