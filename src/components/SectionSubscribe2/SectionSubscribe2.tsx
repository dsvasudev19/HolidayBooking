import React, { FC, Fragment, useState } from "react";
import ButtonCircle from "shared/Button/ButtonCircle";
import rightImg from "images/OneTravel.svg";
import NcImage from "shared/NcImage/NcImage";
import Badge from "shared/Badge/Badge";
import Input from "shared/Input/Input";
import { Dialog, Transition } from "@headlessui/react";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Success from "components/Animations/Sucess";
import ButtonPrimary from "shared/Button/ButtonPrimary";

export interface SectionSubscribe2Props {
  className?: string;
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = "" }) => {
  const [isHostSubmitted, setIsHostSubmitted] = useState(false);

  function HandlerClickerHost() {
    setIsHostSubmitted(true);
  }

  function ClickerHostClose() {
    setIsHostSubmitted(false);
  }

  const renderHostSubscribe = () => {
    return (
      <Transition appear show={isHostSubmitted} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={ClickerHostClose}
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
                      Subscribition
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={ClickerHostClose} />
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

                      <ButtonPrimary type="submit" onClick={ClickerHostClose}>
                        Explore More
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
      className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row lg:items-center ${className}`}
      data-nc-id="SectionSubscribe2"
    >
      <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mr-10 lg:w-2/5">
        <h2 className="font-semibold text-4xl">Join our newsletter 🎉</h2>
        <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
          Adventure awaits those who step outside their comfort zone and explore
          the unknown.
        </span>
        <ul className="space-y-4 mt-10">
          <li className="flex items-center space-x-4">
            <Badge name="01" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Get more discount
            </span>
          </li>
          <li className="flex items-center space-x-4">
            <Badge color="red" name="02" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Get premium Stays
            </span>
          </li>
        </ul>
        <form className="mt-10 relative max-w-sm">
          <Input
            required
            aria-required
            placeholder="Enter your email"
            type="email"
            rounded="rounded-full"
            className="text-black"
            style={{ background: "white" }}
          />
          <ButtonCircle
            type="button"
            className="absolute transform top-1/2 -translate-y-1/2 right-[5px]"
            onClick={HandlerClickerHost}
          >
            <i className="las la-arrow-right text-xl"></i>
          </ButtonCircle>
          {renderHostSubscribe()}
        </form>
      </div>
      <div className="flex-grow">
        <NcImage src={rightImg} />
      </div>
    </div>
  );
};

export default SectionSubscribe2;
