import React, { FC, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import GuestsInput from "./HeroSearchForm2Mobile/GuestsInput";
import ButtonPrimary from "shared/Button/ButtonPrimary";

interface ModalSelectGuestsProps {
  renderChildren?: (p: { openModal: () => void }) => React.ReactNode;
  onChange: (totalGuests: number) => void;
}

const ModalSelectGuests: FC<ModalSelectGuestsProps> = ({ renderChildren ,onChange}) => {
  const [showModal, setShowModal] = useState(false);

  const [totalGuests, setTotalGuests] = useState(1);
  // FOR RESET ALL DATA WHEN CLICK CLEAR BUTTON
  //
  function closeModal() {
    setShowModal(false);
  }

  function openModal() {
    setShowModal(true);
  }

  const renderButtonOpenModal = () => {
    return renderChildren ? (
      renderChildren({ openModal })
    ) : (
      <button onClick={openModal}>Select Date</button>
    );
  };
  const handleTotalGuestsChange = (newTotalGuests: any) => {
    setTotalGuests(newTotalGuests);
    onChange(newTotalGuests);
  };

  return (
    <>
      {renderButtonOpenModal()}
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="HeroSearchFormMobile__Dialog relative z-50"
          onClose={closeModal}
        >
          <div className="fixed inset-0 bg-neutral-100 dark:bg-neutral-900">
            <div className="flex h-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out transition-transform"
                enterFrom="opacity-0 translate-y-52"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in transition-transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-52"
              >
                <Dialog.Panel className="relative h-full overflow-hidden flex-1 flex flex-col justify-between ">
                  <>
                    <div className="absolute left-4 top-4">
                      <button
                        className="focus:outline-none focus:ring-0"
                        onClick={closeModal}
                      >
                        <XMarkIcon className="w-5 h-5 text-black dark:text-white" />
                      </button>
                    </div>

                    <div className="flex-1 pt-12 p-1 flex flex-col overflow-hidden">
                      <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-neutral-800">
                        <div className="flex-1 flex flex-col transition-opacity animate-[myblur_0.4s_ease-in-out] overflow-auto">
                          <div
                            className={`flex-1 relative flex z-10 overflow-hidden`}
                          >
                            <GuestsInput
                              className="flex-1"
                              onChange={handleTotalGuestsChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 flex justify-between">
                      <button
                        type="button"
                        className="underline font-semibold flex-shrink-0"
                        onClick={() => {}}
                      >
                        Clear data
                      </button>
                      <ButtonPrimary
                        sizeClass="px-6 py-3 !rounded-xl"
                        onClick={() => {
                          closeModal();
                        }}
                      >
                        Save
                      </ButtonPrimary>
                    </div>
                  </>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalSelectGuests;
