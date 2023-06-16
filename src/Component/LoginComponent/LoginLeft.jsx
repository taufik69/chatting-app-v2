import React, { useState } from "react";
import { useFormik } from "formik";
import { signinValidation } from "../Validation/ValidationSignInSchema/Index";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const LoginLeft = () => {
  const [eye, seteye] = useState(false);
  const initalValue = {
    email: "",
    password: "",
    remember: false,
  };
  const formik = useFormik({
    initialValues: initalValue,
    validationSchema: signinValidation,
    onSubmit: (values) => {
      console.log("formik valus is  from login page: ", values);
    },
  });

  return (
    <>
      <div className="w-[30%]">
        <h1 className="font-intel text-4xl font-bold text-primary-color">
          Welcome To Chatting Application
        </h1>
        <h5 className="mt-10 font-intel text-[24px] font-bold text-secondary-color">
          Log In
        </h5>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="mb-3 mt-4 block text-[16px] font-semibold text-secondary-color "
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              className="mt-3 block w-[90%]  rounded-lg border border-primary-color bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your Email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          {formik.errors.email && formik.touched.email ? (
            <p className=" mt-3 text-sm text-red-700">{formik.errors.email}</p>
          ) : null}

          <div className="relative">
            <label
              htmlFor="password"
              className="mb-3 mt-4 block text-[16px] font-semibold text-secondary-color "
            >
              Password
            </label>

            <input
              type={eye ? "password" : "text"}
              id="password"
              className=" mt-3 block  w-[90%] rounded-lg border border-primary-color bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-[#712CF9] focus:ring-[#712CF9]"
              placeholder="Enter your Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {eye ? (
              <AiOutlineEye
                className="absolute right-[55px] top-[49px] cursor-pointer"
                onClick={() => seteye(!eye)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="absolute right-[55px] top-[49px] cursor-pointer"
                onClick={() => seteye(!eye)}
              />
            )}
          </div>
          {formik.errors.password && formik.touched.password ? (
            <p className="mt-3 text-sm text-red-700">
              {formik.errors.password}
            </p>
          ) : null}

          <div className="mb-6 mt-5 flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300"
                onChange={formik.handleChange}
                value={formik.values.remember}
              />
            </div>
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Remember Me
            </label>
            <span className="ml-[40%] text-sm font-medium text-gray-900 hover:cursor-pointer hover:underline">
              Forgot password ?
            </span>
          </div>
          {formik.errors.remember && formik.touched.remember ? (
            <p className="-mt-2 mb-4  text-sm text-red-700">
              {formik.errors.remember}
            </p>
          ) : null}

          <div>
            <button
              type="submit"
              className="mb-2 mr-2 w-[90%] rounded-lg bg-gradient-to-r from-primary-color via-primary-color to-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-primary-color duration-300 ease-in-out hover:bg-gradient-to-br"
            >
              Sign In
            </button>
          </div>

          <div className="mt-6 flex items-center font-intel">
            <p className="font-normal text-[#7A7A7A]">
              {" "}
              Don't Have an accout ?
            </p>
            <h3 className="ml-3 cursor-pointer font-semibold text-primary-color hover:underline">
              <Link to="/">Sign up</Link>
            </h3>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginLeft;