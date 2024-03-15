import Label from "components/Label/Label";
import React, { FC, Fragment, useEffect, useState } from "react";
import Avatar from "shared/Avatar/Avatar";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
// import Textarea from "shared/Textarea/Textarea";
import { Helmet } from "react-helmet";
import UserLayout from "./UserLayout";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import ButtonClose from "shared/ButtonClose/ButtonClose";
// import * as Yup from "yup";
import ChangePasswordModal from './ChangePasswordModal'
import { useAuth } from "../../AuthContext";
import {
  Button,
  // Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  // Input,
  Checkbox,
} from "@material-tailwind/react";
import { axiosInstance } from "../../index";
import { Form, Field,  Formik } from "formik";
import Swal from "sweetalert2";

export interface SettingsPageProps {
  className?: string;
}

const SettingsPage: FC<SettingsPageProps> = ({ className = "" }) => {
  const { user,loading } = useAuth();
  const [numberChange, setNumberChange] = useState(false);
  const [MailChange, setMailChange] = useState(false);
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    location: "",
  });
  const getUserById = async () => {
    try {
      const res = await axiosInstance.get(`/users/${user?.id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        // console.log(res.data.data)
        setInitialValues(res.data.data);
      } else if (res.status === 401) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!loading && user) {
      getUserById();
    }
  }, [loading, user]);

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    console.log(values)
    try {
      const res = await axiosInstance.put(
        `/users/${user?.id}`,
        values,
        { withCredentials: true }
      );
      if (res.status === 200) {
        getUserById();
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          showConfirmButton: true,
          timer: 1000,
        });
      }
    } catch (error:any) {
      Swal.fire({
        icon: "error",
        title: error.message,
        showConfirmButton: true,
        timer: 1000,
      });
      console.log(error);
    }
  };

  function CloseNumberModal() {
    setNumberChange(false);
  }

  function CloseMailModal() {
    setMailChange(false);
  }
  const handleChange = (e: any, setFieldValue: any) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
    setInitialValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(name, value);
  };

  const renderNumberChange = () => {
    return (
      <Transition appear show={numberChange} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={CloseNumberModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block py-8 h-auto w-full max-w-xs sm:max-w-md lg:max-w-xl">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      Update Mobile Number
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={CloseNumberModal} />
                    </span>
                  </div>
                  <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                    {/* <form
                      className="grid grid-cols-1 gap-6 mt-10 mb-10"
                      onSubmit={(e) => e.preventDefault()}
                    ></form> */}
                    <form
                      className="grid grid-cols-1 gap-6"
                      
                      noValidate
                    >
                      <label className="block">
                        <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                          Mobile Number
                        </span>
                        <input
                          type="number"
                          name="phone"
                          className="mt-3 px-3 py-2 border border-neutral-300 rounded-md w-full focus:outline-none focus:border-secondary-500"
                          placeholder="Enter Your Number"
                        />
                      </label>

                      <ButtonPrimary
                        type="submit"
                        onClick={CloseNumberModal}
                        className="w-full"
                      >
                        Update
                      </ButtonPrimary>
                    </form>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  const renderMailChange = () => {
    return (
      <Transition appear show={MailChange} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={CloseMailModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block py-8 h-auto w-full max-w-xs sm:max-w-md lg:max-w-xl">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      Update Mail
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={CloseMailModal} />
                    </span>
                  </div>
                  <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                    <form
                      className="grid grid-cols-1 gap-6 mt-10 mb-10"
                      onSubmit={(e: any) => e.preventDefault()}
                    >
                      <label className="block">
                        <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                          Email Address
                        </span>
                        <Input
                          type="text"
                          className="mt-3 px-3 py-2 border border-neutral-300 rounded-md w-full focus:outline-none focus:border-secondary-500"
                          name="email"
                          placeholder="Enter Your Email Address"
                        />
                      </label>

                      <ButtonPrimary
                        type="submit"
                        onClick={CloseMailModal}
                        className="w-full"
                      >
                        Update
                      </ButtonPrimary>
                    </form>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  return (
    <div className={`nc-SettingsPage ${className}`} data-nc-id="SettingsPage">
      <Helmet>
        <title>Solitiary Holidays || Settings</title>
      </Helmet>
      <UserLayout>
        <div className="space-y-6 sm:space-y-8">
          {/* HEADING */}
          <h2 className="text-3xl font-semibold">Account Settings</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0 flex items-start">
              <div className="relative rounded-full overflow-hidden flex">
                <Avatar sizeClass="w-32 h-32" />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="mt-1 text-xs">Change Image</span>
                </div>
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
            <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-5xl space-y-6 md:space-y-0 md:grid md:grid-cols-1 md:gap-x-12">
              <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue }) => (
                  //   <Formik
                  //   initialValues={initialValues}
                  //   enableReinitialize={true}
                  //   onSubmit={onSubmit}
                  // >
                  //   {({ setFieldValue }) => (
                  <Form className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-5xl space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-12">
                    <div className="mb-5">
                      <Label>First Name</Label>
                      <Field
                        // className="mt-1.5"
                        type="text"
                        className="mt-3 px-3 py-2 border border-neutral-300 rounded-md w-full focus:outline-none focus:border-secondary-500"
                        placeholder="First Name"
                        name="first_name"
                        onChange={(e: any) => handleChange(e, setFieldValue)}
                      />
                    </div>
                    {/* ---- */}
                    <div className="mb-5">
                      <Label>Last Name</Label>
                      <Field
                        type="text"
                        className="mt-3 px-3 py-2 border border-neutral-300 rounded-md w-full focus:outline-none focus:border-secondary-500"
                        placeholder="Last Name"
                        name="last_name"
                        onChange={(e: any) => handleChange(e, setFieldValue)}
                      />
                    </div>
                    {/* ---- */}
                    <div className="mb-5">
                      <Label>Gender</Label>
                      <Select
                        className="mt-3 px-3 py-2 border border-neutral-300 rounded-md w-full focus:outline-none focus:border-secondary-500"
                        name="gender"
                        // value={initialValues.gender}
                        onChange={(e: any) => handleChange(e, setFieldValue)}
                      >
                        <option>Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Select>
                    </div>

                    {/* ---- */}
                    <div className="mb-5 max-w-lg">
                      <Label>Date of birth</Label>
                      <Field
                        className="mt-3 px-3 py-2 border border-neutral-300 rounded-md w-full focus:outline-none focus:border-secondary-500"
                        type="date"
                        placeholder="Date Of Birth"
                        name="dob"
                        onChange={(e: any) => handleChange(e, setFieldValue)}
                      />
                    </div>

                    {/* ---- */}
                    <div className="pt-5">
                      <Label className="mt-1.5">Phone number</Label>
                      <Field
                        type="text"
                        className="mt-3 px-3 py-2 border border-neutral-300 rounded-md w-full focus:outline-none focus:border-secondary-500"
                        placeholder="Enter Your Number"
                        name="phone"
                        onChange={(e: any) => handleChange(e, setFieldValue)}
                      />
                      <div className="text-sm text-gray-500 flex mt-3 justify-between">
                        <Link to={"/"} className="text-green-600">
                          Verified
                        </Link>
                        <span
                          onClick={() => setNumberChange(true)}
                          style={{ cursor: "pointer" }}
                        >
                          Change
                        </span>
                        {renderNumberChange()}
                        {/* Phone Number Updated Modal */}
                      </div>
                    </div>
                    {/* ---- */}
                    <div className="pt-5">
                      <Label className="mt-10">Email</Label>
                      <Field
                        type="text"
                        className="mt-3 px-3 py-2 border border-neutral-300 rounded-md w-full focus:outline-none focus:border-secondary-500"
                        placeholder="Enter Your Email"
                        name="email"
                        onChange={(e: any) => handleChange(e, setFieldValue)}
                      />
                      <div className="text-sm text-gray-500 text-end mt-3 flex justify-between">
                        <Link to={"/"} className="text-red-600">
                          Not-Verified ?
                        </Link>
                        <span
                          onClick={() => setMailChange(true)}
                          style={{ cursor: "pointer" }}
                        >
                          Change
                        </span>
                        {renderMailChange()}
                        {/* Email Address Updated Modal */}
                      </div>
                    </div>
                    {/* ---- */}
                    <div className="pt-5">
                      <Label>Address</Label>
                      <Field
                        type="text"
                        className="mt-3 px-3 py-2 border border-neutral-300 rounded-md w-full focus:outline-none focus:border-secondary-500"
                        placeholder="Enter Your Address"
                        name="location"
                        onChange={(e: any) => handleChange(e, setFieldValue)}
                      />
                    </div>
                    <div className="pt-5">
                      <a
                        href="#"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                        data-bs-toggle="modal"
                        data-bs-target="#changePassword"
                      >
                      </a>
                    </div>

                    {/* ---- */}
                    <div className="pt-10">
                      <ButtonSecondary>Update info</ButtonSecondary>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        <ChangePasswordModal user={initialValues} />
        </div>
      </UserLayout>
    </div>
  );
};

export default SettingsPage;
