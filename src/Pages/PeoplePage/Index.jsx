import React from "react";

import Homeleft from "../../Component/HomeComponent/Homeleft";
import People from "../../Component/HomeComponent/People/Index";
const PeoplePage = () => {
  return (
    <>
      <div className="flex ">
        <div>
          <Homeleft active="people" />
        </div>
        <div className="h-screen w-full  px-10 py-6">
          <People
            title={"People"}
            SearchNeed={true}
            overflow={false}
            groupButton={false}
          />
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
