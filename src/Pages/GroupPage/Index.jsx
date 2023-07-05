import React from "react";
import Homeleft from "../../Component/HomeComponent/Homeleft";
import MessageRight from "../../Component/MessageComponent/MessageRight";
import GroupAceptMember from "../../Component/GroupComponent/GroupacceptMember/Index";
import AvailableGroup from "../../Component/GroupComponent/AvailableGroup/Index";
const Index = () => {
  return (
    <div className="flex  gap-x-5">
      <div className="">
        <Homeleft active="group" />
      </div>

      <div className="mt-8  w-[40%]">
        <GroupAceptMember title="Requsted Groups" SearchNeed={true} />
      </div>

      <div className="mt-8  w-[40%]">
        <AvailableGroup title="Active Groups" SearchNeed={true} />
      </div>
      <disv className="w-[60%]">
        <MessageRight />
      </disv>
    </div>
  );
};

export default Index;
