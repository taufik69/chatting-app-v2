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
      <div className=" m-5 flex w-full flex-wrap justify-between">
        <Chat title="Chat" SearchNeed={true} />
        <Group title="Group" SearchNeed={true} />
        <Friends title="Friends" SearchNeed={true} />
        <People title="People" SearchNeed={true} />
        <FriendRequest title="FriendRequest" SearchNeed={true} />
        <BlockList title="BlockList" SearchNeed={false} />
      </div>
    </>
  );
};

export default MiddleRightLeft;
