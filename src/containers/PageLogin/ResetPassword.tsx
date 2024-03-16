import React, { FC, useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link, useNavigate, useParams } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useAuth } from "../../AuthContext";
import { axiosInstance } from "index";
import Swal from "sweetalert2";

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
  confirmPassword: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Confirm Password is required"),
});

const ResetPassword: FC<PageLoginProps> = ({ className = "" }) => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [token, setToken] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    const tokenParam = urlParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, []);


  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    enableReinitialize: true,
    onSubmit: async (values: any, { setSubmitting }: any) => {
      try {
        const response=await axiosInstance.post("/auth/reset-password", {
            email: values.email,
            password: values.password,
            });
            if(response.status===200){
                Swal.fire({
                    title:"Password Changed Successfully",
                    text:"You can continute your Login with your new password",
                    icon:"success",
                    timer:1500,
                });
                navigate("/login")
            }
      } catch (error:any) {
        console.log(error)
        setStatus(error.response.data.message);
      }

    },
  });
  const validateToken = async () => {
    console.log("validation token");
    try {
      setLoading(true);
      console.log("getting in try block");
      const response = await axiosInstance.post("/auth/validate-token",{
        token: token,
      
      });
      console.log(response);
      setUser(response.data.data);
      setInitialValues({ ...initialValues, email: response.data.data.email });
    } catch (error: any) {
      console.log(error);

      setStatus(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (token !== undefined && token !== "" && token !== null) {
      validateToken();
    }
  }, [token]);

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Reset Password
        </h2>
        <h1
          style={{ color: "red" }}
          className="my-20 flex items-center text-xl leading-[115%] md:text-xl md:leading-[115%] font-semibold text-neutral-500 dark:text-neutral-100 justify-center"
        >
          {status}
        </h1>

        {!loading && user !== " " ? (
          <div className="max-w-md mx-auto space-y-6">
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
                </span>
                <Input
                  type="password"
                  className="mt-1"
                  {...formik.getFieldProps("password")}
                  placeholder="Enter Your PassWord"
                  
                />
              </label>
              <label className="block">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  Confirm Password
                </span>
                <Input
                  type="password"
                  className="mt-1"
                  {...formik.getFieldProps("confirmPassword")}
                  placeholder="Enter Your PassWord"
                  onChange={(e) => {
                    setStatus("");
                    formik.setFieldValue("confirmPassword", e.target.value);
                    if (e.target.value !== formik.values.password) {
                      setStatus("Password does not match");
                    }
                  }}
                />
              </label>
              <ButtonPrimary type="submit">
                Verify and Save Password
              </ButtonPrimary>
            </form>
          </div>
        ) : (
          <div className="max-w-md mx-auto space-y-6">
            Your Reset Password Link has been Expired
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
