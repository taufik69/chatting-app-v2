import React from "react";
import Left from "../../Component/RegistraionComponent/Left";
import Right from "../../Component/RegistraionComponent/Right";
const Registration = () => {
  return (
    <>
      <div className="">
        <div className="flex min-h-screen items-center justify-center gap-x-16">
          <Left />
          <Right />
        </div>
      </div>
    </>
  );
};

export default Registration;
