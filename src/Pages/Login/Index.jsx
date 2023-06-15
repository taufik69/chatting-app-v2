import React from "react";
import LoginLeft from "../../Component/LoginComponent/LoginLeft";
import LoginRight from "../../Component/LoginComponent/LoginRight";
const Login = () => {
  return (
    <div>
      <div className=" flex min-h-screen items-center justify-center gap-x-16">
        <LoginLeft />
        <LoginRight />
      </div>
    </div>
  );
};

export default Login;
