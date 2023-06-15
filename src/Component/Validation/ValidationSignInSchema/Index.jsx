import * as Yup from "yup";
let mailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
let passwordFormat =
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

export let signinValidation = Yup.object({
  email: Yup.string()
    .email()
    .matches(mailFormat, "Invalid email address")
    .required("Please enter your email"),
  password: Yup.string()
    .min(8, "Must be 8 chracter or higher")
    .max(20, "Must be 20 characters or less")
    .required("please enter your password")
    .matches(
      passwordFormat,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
  remember: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});
