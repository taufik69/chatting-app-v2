import React from "react";
import Group from "../../Component/HomeComponent/Group/Index";
import Homeleft from "../../Component/HomeComponent/Homeleft";
import MessageRight from "../../Component/MessageComponent/MessageRight";
const Index = () => {
  return (
    <div className="flex gap-x-5">
      <div className="">
        <Homeleft active="group" />
      </div>
      <div className="h-screet mt-8 w-[60%]">
        <Group title="Group" SearchNeed={true} />
      </div>
      <disv className="w-full">
        <MessageRight />
      </disv>
    </div>
  );
};

export default Index;
