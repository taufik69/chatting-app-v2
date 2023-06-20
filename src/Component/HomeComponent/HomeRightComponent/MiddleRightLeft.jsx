import React from "react";

import Chat from "../Chat/Index";
import Group from "../Group/Index";
const MiddleRightLeft = () => {
  return (
    <>
      <div className=" mt-3 flex w-full gap-x-10 p-6">
        <Chat />
        <Group />
        <Group />
      </div>
    </>
  );
};

export default MiddleRightLeft;
