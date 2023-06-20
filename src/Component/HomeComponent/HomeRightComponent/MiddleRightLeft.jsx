import React from "react";

import Chat from "../Chat/Index";
import Group from "../Group/Index";
const MiddleRightLeft = () => {
  return (
    <>
      <div className="m-7 flex w-full flex-wrap justify-between">
        {/* <Chat /> */}
        <Group title="Chat" SearchNeed={true} />
        <Group title="Group" SearchNeed={true} />
        <Group title="Friends" SearchNeed={true} />
        <Group title="People" SearchNeed={true} />
        <Group title="Friend Request" SearchNeed={true} />
        <Group title="Block List" />
      </div>
    </>
  );
};

export default MiddleRightLeft;
