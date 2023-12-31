import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Signupvalidation } from "../Validation/ValidationSignUpSchma";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { getDatabase, push, ref, set } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Left = () => {
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();
  const [eye, seteye] = useState(true);
  const [isLoading, setisLoading] = useState(false);

  const initalValue = {
    full_name: "",
    email: "",
    password: "",
    remember: false,
  };

  // Authentication method using formik and
  const formik = useFormik({
    initialValues: initalValue,
    validationSchema: Signupvalidation,

    onSubmit: async (values, actions) => {
      let { full_name, email, password } = values;
      setisLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          // console.log("uid ", user.uid);
          toast.success("🦄 sign up sucessfull !", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          sendEmailVerification(auth.currentUser).then(() => {
            console.log("mail send");
            updateProfile(auth.currentUser, {
              displayName: full_name,
            })
              .then(() => {
                set(push(ref(db, "users/")), {
                  username: full_name,
                  email: email,
                  uid: auth.currentUser.uid,
                });
              })
              .catch((error) => {
                console.log("error from update profile channel : ", error);
              });
          });
        })

        .catch((error) => {
          const errorCode = error.code;
        });

      //Stop animation functionality
      // this is redirect to registration to login page
      setTimeout(() => {
        setisLoading(false);
        actions.resetForm();
        navigate("/login");
      }, 2200);
    },
  });

  return (
    <>
      <div className="w-[30%]">
        <ToastContainer />
        <h1 className="font-intel text-4xl font-bold text-primary-color">
          Welcome To Chatting Application
        </h1>
        <h5 className="mt-10 font-intel text-[24px] font-bold text-secondary-color">
          Sign Up
        </h5>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="first_name"
              className="mb-3 mt-4 block text-[16px] font-semibold text-secondary-color "
            >
              First name
            </label>

            <input
              type="text"
              id="full_name"
              name="full_name"
              className="mt-3 block w-[90%]  rounded-lg border border-primary-color bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-[#712CF9] focus:ring-[#712CF9]"
              placeholder="Enter your FullName"
              onChange={formik.handleChange}
              value={formik.values.full_name}
            />
          </div>
          {formik.errors.full_name && formik.touched.full_name ? (
            <p className=" mt-3 text-sm text-red-700">
              {formik.errors.full_name}
            </p>
          ) : null}

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
              name="email"
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
              name="password"
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
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember Me
            </label>
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
              Sign Up
              {isLoading && (
                <div role="status" className="inline-block">
                  <svg
                    aria-hidden="true"
                    class="ml-2 inline h-5 w-5 animate-spin fill-pink-700 text-gray-200 "
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              )}
            </button>
          </div>
          <div className="mt-6 flex items-center font-intel">
            <p className="font-normal text-[#7A7A7A]">
              Already Have an accout ?
            </p>
            <h3 className="ml-3 font-semibold text-primary-color hover:underline">
              <Link to="/login"> Sign in</Link>
            </h3>
          </div>
        </form>
      </div>
    </>
  );
};

export default Left;
