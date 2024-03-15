import React, { FC, useState } from "react";
// import facebookSvg from "images/Facebook.svg";
// import twitterSvg from "images/Twitter.svg";
// import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
// import { Link } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";
import { axiosInstance } from "index";
import Swal from "sweetalert2";

export interface ForgotProps {
  className?: string;
}

const initialValues={
  email:"",
  phone:"",

}

const resetSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  phone: Yup.string()
    .min(10, "Enter 10 digits of the Phone Number")
    .max(10, "Enter 10 digits of the Phone Number")
    .required("Phone is required"),
});

const Forgot: FC<ForgotProps> = ({ className = "" }) => {
  const [status,setStatus]=useState("");
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema: resetSchema,
    onSubmit: async (values: any, { setSubmitting }: any) => {
      try {
        setSubmitting(true);
        setLoading(true);
        const res=await axiosInstance.post("/auth/forgot",values);
        if(res.status===200){
          Swal.fire({
            title:"Success",
            text:"Your Reset Password Link has been shared to your attached email",
            icon:"success",
          })
        }
      } catch (error: any) {
        setStatus(error.response.data.message);
      } 
      finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <div className={`nc-Forgot ${className}`} data-nc-id="Forgot">
      <Helmet>
        <title>Solitiary Holidays || Forget</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Forgot Password
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
                placeholder="Enter Your Email"
                {...formik.getFieldProps("email")}
                className="mt-1"
              />
              {/* <ErrorMessage className="text-rose-500" name="email"/> */}
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Mobile Number
              </span>
              <Input
                type="text"
                className="mt-1"
                {...formik.getFieldProps("phone")}
                placeholder="Enter Your Number"
              />
              {/* <ErrorMessage className="text-rose-500" name="phone" /> */}
            </label>

            <ButtonPrimary type="submit" className="btn btn-primary">
              {!loading && "Submit"}
              {loading && (
                <span
                  className="indicator-progress"
                  style={{ display: "block" }}
                >
                  Please wait...{" "}
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              )}
            </ButtonPrimary>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
