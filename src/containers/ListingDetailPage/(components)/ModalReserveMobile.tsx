import React, { FC, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import CheckOutPage from "containers/CheckOutPage/CheckOutPage";

interface ModalReserveMobileProps {
  renderChildren?: (p: { openModal: () => void }) => React.ReactNode;
  startingPrice: number;
  totalPrice: number;
  onDateChange?: (dates: [Date | null, Date | null]) => void;
  // calculateTotalPrice?: any;
}

const ModalReserveMobile: FC<ModalReserveMobileProps> = ({
  renderChildren,
  startingPrice,
  totalPrice,
  onDateChange,
  // calculateTotalPrice,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDates, setSelectedDates] = useState<
    [Date | null, Date | null]
  >([null, null]);

  //
  function closeModal() {
    setShowModal(false);
  }
   const handleDateChange = (dates: [Date | null, Date | null]) => {
     setSelectedDates(dates);
     onDateChange && onDateChange(dates);
     console.log(dates);
   };

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
                <Dialog.Panel className="relative h-full flex-1 flex flex-col justify-between overflow-auto">
                  <>
                    <div className="absolute left-4 top-4">
                      <button
                        className="focus:outline-none focus:ring-0"
                        onClick={closeModal}
                      >
                        <XMarkIcon className="w-5 h-5 text-black dark:text-white" />
                      </button>
                    </div>

                    <div className="flex-1 pt-12 py-1 flex flex-col ">
                      <div className="flex-1 bg-white dark:bg-neutral-900">
                        <CheckOutPage
                          startingPrice={startingPrice}
                          totalPrice={totalPrice}
                          onDateChange={handleDateChange}
                          // calculateTotalPrice={calculateTotalPrice}
                        />
                      </div>
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

export default ModalReserveMobile;
