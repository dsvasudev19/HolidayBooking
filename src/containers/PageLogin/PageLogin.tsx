import React, { FC, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useAuth } from "../../AuthContext";

export interface PageLoginProps {
  className?: string;
}
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
});

const initialValues = {
  email: "userone@gmail.com",
  password: "password",
};


const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
 
  const [status,setStatus]=useState("");
  const {login } = useAuth();

  const navigate=useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values:any, {  setSubmitting }:any) => {
      try {
        await login(values); 
        navigate("/");
      } catch (error:any) {
        setStatus(error.response.data.message);
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <h1
          style={{ color: "red" }}
          className="my-20 flex items-center text-xl leading-[115%] md:text-xl md:leading-[115%] font-semibold text-neutral-500 dark:text-neutral-100 justify-center"
        >
          {status}
        </h1>

        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <form
            className="grid grid-cols-1 gap-6"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                {...formik.getFieldProps("email")}
                placeholder="Enter Your Email"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link to="/Forgot" className="text-sm">
                  Forgot password?
                </Link>
              </span>
              <Input
                type="password"
                className="mt-1"
                {...formik.getFieldProps("password")}
                placeholder="Enter Your PassWord"
              />
            </label>
            <ButtonPrimary type="submit">Sign In</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link to="/signup">Create an account</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
