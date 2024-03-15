import React, { FC, useState } from "react";
// import facebookSvg from "images/Facebook.svg";
// import twitterSvg from "images/Twitter.svg";
// import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
export interface PageSignUpProps {
  className?: string;
}

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const navigate=useNavigate();
  const [status, setStatus] = useState("");
  const {signup } = useAuth();
  const handleUserDetailsChange = (e: any) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    console.log(userDetails);
    try {
      await signup(userDetails);
      navigate("/login")
    } catch (error: any) {
      setStatus(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up || Solitiary Holidays</title>
      </Helmet>

      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
        <h5 
        style={{color:'red'}}
        className="my-20 flex items-center text-l leading-[115%] md:text-l md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          {status}
        </h5>
        <div className="max-w-md mx-auto space-y-6 ">
          {/* FORM */}
          <form
            className="grid grid-cols-1 gap-6"
            method="post"
            onSubmit={(e: any) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                First Name
              </span>
              <Input
                type="text"
                name="first_name"
                onChange={handleUserDetailsChange}
                placeholder="Enter Your First Name"
                className="mt-1"
                required
              />
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Last Name
              </span>
              <Input
                type="text"
                name="last_name"
                onChange={handleUserDetailsChange}
                placeholder="Enter Your Last Name"
                className="mt-1"
                required
              />
            </label>

            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                name="email"
                onChange={handleUserDetailsChange}
                placeholder="example@example.com"
                className="mt-1"
                required
              />
            </label>

            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Mobile Number
              </span>
              <Input
                type="number"
                name="phone"
                onChange={handleUserDetailsChange}
                placeholder="Enter Your Mobile Number"
                className="mt-1"
                required
              />
            </label>

            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input
                type="password"
                className="mt-1"
                placeholder="Enter Password"
                name="password"
                onChange={handleUserDetailsChange}
                required
              />
            </label>
            <ButtonPrimary
              type="submit"
              //  onClick={()=>{handleSubmit()}}
            >
              Continue
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link to="/login">Sign in</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
