import React, { FC, Fragment, useState } from "react";
import NcImage from "shared/NcImage/NcImage";
import rightImgDemo from "images/OneHost.svg";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Logo from "shared/Logo/Logo";
import { Dialog, Transition } from "@headlessui/react";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import Success from "components/Animations/Sucess";
import Swal from "sweetalert2";
import { axiosInstance } from "../../index";

export interface SectionBecomeAnAuthorProps {
  className?: string;
  rightImg?: string;
}

const SectionBecomeAnAuthor: FC<SectionBecomeAnAuthorProps> = ({
  className = "",
  rightImg = rightImgDemo,
}) => {
  const [Host, SetHost] = useState(false);

  const [HostOTP, SetHostOTP] = useState(false);

  const [HostAnimation, SetHostAnimation] = useState(false);

  const [HostDetails, SetHostDetails] = useState({
    name: "",
    property_type: "",
    phone: "",
    location: "",
    roomsCount: "",
    email: "",
  });

  const HostDetailsChange = (e: any) => {
    const { name, value } = e.target;
    SetHostDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderBecomeHost = () => {
    function CloseHostModal() {
      SetHost(false);
    }

    // function OTPModal() {
    //   SetHost(false);
    //   SetHostOTP(true);
    // }

    const handleSubmit = async (e: any) => {
      e.preventDefault();
      console.log(HostDetails);
      try {
        const response = await axiosInstance.post(
          "/become-an-host",
          HostDetails,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          Swal.fire({
            title: "Enquiry Sent Successfully!",
            icon: "success",
            confirmButtonText: "Ok",
          });
          CloseHostModal();
        } else if (response.status === 400) {
          Swal.fire({
            title: "You have already Sent Enquiry",
            icon: "success",
            confirmButtonText: "Ok",
          });
          CloseHostModal();
        }
      } catch (error: any) {
        Swal.fire({
          title: "Oops!",
          text: error.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
        CloseHostModal();
      }
    };

    return (
      <Transition appear show={Host} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={CloseHostModal}
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
              <div className="inline-block py-8 h-auto w-full max-w-3xl min-w-xl">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      Become A Host !!
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={CloseHostModal} />
                    </span>
                  </div>
                  <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                    <form
                      className="grid md:grid-cols-2 gap-6 mt-10 mb-10"
                      onSubmit={(e: any) => handleSubmit(e)}
                    >
                      <div className="grid grid-cols-1 gap-6">
                        <label className="block">
                          <span className="text-neutral-800 dark:text-neutral-200">
                            Name
                          </span>
                          <Input
                            type="text"
                            name="name"
                            onChange={HostDetailsChange}
                            placeholder="Enter Your Name"
                            className="mt-2"
                            required
                          />
                        </label>

                        <label className="block">
                          <span className="text-neutal-800 dark:text-neutral-200">
                            Select Property :
                          </span>
                          <Select
                            className="mt-2"
                            name="property_type"
                            onChange={HostDetailsChange}
                            required
                          >
                            <option value="0">Property Type</option>
                            <option value="Hotel">Hotel</option>
                            <option value="Resort">Resort</option>
                          </Select>
                        </label>

                        <label className="block">
                          <span className="text-neutral-800 dark:text-neutral-200">
                            Mobile Number
                          </span>
                          <Input
                            type="number"
                            name="phone"
                            onChange={HostDetailsChange}
                            placeholder="Enter Your Mobile Number"
                            className="mt-2"
                            required
                          />
                        </label>
                      </div>
                      <div className="grid grid-cols-1 gap-6">
                        <label className="block">
                          <span className="text-neutral-800 dark:text-neutral-200">
                            Location
                          </span>
                          <Input
                            type="text"
                            name="location"
                            onChange={HostDetailsChange}
                            placeholder="Enter Your Location"
                            className="mt-2"
                            required
                          />
                        </label>
                        <label className="block">
                          <span className="text-neutral-800 dark:text-neutral-200">
                            Rooms
                          </span>
                          <Input
                            type="number"
                            name="roomsCount"
                            onChange={HostDetailsChange}
                            placeholder="Enter Your Rooms"
                            className="mt-2"
                            required
                          />
                        </label>
                        <label className="block">
                          <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                            Email Address
                          </span>
                          <Input
                            type="email"
                            name="email"
                            onChange={HostDetailsChange}
                            className="mt-2"
                            placeholder="Enter Your Email Address"
                            required
                          />
                        </label>
                      </div>
                      <div className="flex justify-center pt-3 mb-5">
                        <ButtonPrimary
                          type="submit"
                          // onClick={OTPModal}
                        >
                          Submit
                        </ButtonPrimary>
                      </div>
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

  const renderHostOTP = () => {
    function CloseHostOTP() {
      SetHostOTP(false);
    }

    function OtpAnimation() {
      SetHostOTP(false);
      SetHostAnimation(true);
    }

    return (
      <Transition appear show={HostOTP} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={CloseHostOTP}
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

            {/* This element is to trick the browser into centering the modal contents. */}
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
              <div className="inline-block py-8 h-auto w-full max-w-xl">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      OTP Verification
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={CloseHostOTP} />
                    </span>
                  </div>
                  <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                    <form
                      className="grid grid-cols-1 gap-6 mt-10 mb-10"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <label className="block">
                        <h3 className="text-center">
                          An OTP is sent to +91 79XXXXXX07 SuccessFully !!!
                        </h3>
                        <Input
                          type="text"
                          className="mt-5"
                          placeholder="Enter Your 6 Digit Number"
                          maxLength={6}
                        />
                      </label>

                      <ButtonPrimary type="submit" onClick={OtpAnimation}>
                        Submit
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

  const renderHostAnimationModal = () => {
    function CloseHostAnimation() {
      SetHostAnimation(false);
    }

    return (
      <Transition appear show={HostAnimation} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={CloseHostAnimation}
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

            {/* This element is to trick the browser into centering the modal contents. */}
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
              <div className="inline-block py-8 h-auto w-full max-w-xl">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      Registration
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={CloseHostAnimation} />
                    </span>
                  </div>
                  <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                    <form
                      className="grid grid-cols-1 gap-6 mt-10 mb-10 text-center"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div className="flex justify-center items-center">
                        <Success />
                      </div>
                      <h2 className="text-2xl font-semibold">
                        Yay Registered SuccessFully 🥳
                      </h2>

                      {/* <Error /> */}

                      <ButtonPrimary type="submit" onClick={CloseHostAnimation}>
                        Go Back
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
    <div
      className={`nc-SectionBecomeAnAuthor relative flex flex-col lg:flex-row items-center  ${className}`}
      data-nc-id="SectionBecomeAnAuthor"
    >
      <div className="flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-2/5">
        <Logo className="w-20" />
        <h2 className="font-semibold text-3xl sm:text-4xl mt-6 sm:mt-11">
          Why did you choose us?
        </h2>
        <span className="block mt-6 text-neutral-500 dark:text-neutral-400">
          Accompanying us, you have a trip full of experiences. With Solitiary
          Holidays, booking accommodation, resort villas, hotels, private
          houses, apartments... becomes fast, convenient and easy.
        </span>
        <ButtonPrimary className="mt-6 sm:mt-11" onClick={() => SetHost(true)}>
          Become an Host
        </ButtonPrimary>
        {renderBecomeHost()}
        {renderHostOTP()}
        {renderHostAnimationModal()}
      </div>
      <div className="flex-grow">
        <NcImage src={rightImg} />
      </div>
    </div>
  );
};

export default SectionBecomeAnAuthor;
