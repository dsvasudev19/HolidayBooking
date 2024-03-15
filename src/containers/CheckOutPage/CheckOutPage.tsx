// import { Dialog, Transition } from "@headlessui/react";
// import { PencilSquareIcon } from "@heroicons/react/24/outline";
// import React, { FC, Fragment, useEffect, useState } from "react";
// // import visaPng from "images/vis.png";
// // import mastercardPng from "images/mastercard.svg";
// import { GuestsObject } from "components/HeroSearchForm/type";
// import StartRating from "components/StartRating/StartRating";
// // import NcModal from "shared/NcModal/NcModal";
// import ModalSelectDate from "components/ModalSelectDate";
// import converSelectedDateToString from "utils/converSelectedDateToString";
// import ModalSelectGuests from "components/ModalSelectGuests";
// // import Label from "components/Label/Label";
// import Input from "shared/Input/Input";
// // import Textarea from "shared/Textarea/Textarea";
// import ButtonPrimary from "shared/Button/ButtonPrimary";
// // import ButtonSecondary from "shared/Button/ButtonSecondary";
// import ButtonClose from "shared/ButtonClose/ButtonClose";
// import Success from "components/Animations/Sucess";
// import { displayPartsToString } from "typescript";
// import Swal from "sweetalert2";
// import { axiosInstance } from "index";
// import { useParams } from "react-router-dom";
// // import StayDatesRangeInput from "components/HeroSearchForm2Mobile/DatesRangeInput";
// // import GuestsInput from "components/HeroSearchForm/GuestsInput";

// export interface CheckOutPagePageMainProps {
//   className?: string;
//   startingPrice?: number;
//   totalPrice?: number;
//   onDateChange?: (dates: [Date | null, Date | null]) => void;
//   // calculateTotalPrice?: any;
// }
// interface Prices {
//   sunday: number;
//   monday: number;
//   tuesday: number;
//   wednesday: number;
//   thursday: number;
//   friday: number;
//   saturday: number;
//   [key: string]: number;
// }

// interface TotalPrices {
//   [roomType: string]: number;
// }
// const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
//   className = "",
//   startingPrice,
//   totalPrice,
//   onDateChange,
//   // calculateTotalPrice,
// }) => {
//   const [startDate, setStartDate] = useState<Date | null>(
//     new Date("2023/02/06")
//   );
//   const [endDate, setEndDate] = useState<Date | null>(new Date("2023/02/23"));

//   const [guests] = useState<GuestsObject>({
//     guestAdults: 2,
//     guestChildren: 1,
//     guestInfants: 1,
//   });

//   const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

//   const [totalPrices, setTotalPrices] = useState<TotalPrices>({});

//   const [totalDays, setTotalDays] = useState(0);

//   const [finalPrice,setFinalPrice]=useState(0);

//   const [totalGuests, setTotalGuests] = useState(0);

//   const [isOTPNumber, setIsOTPNumber] = useState(false);

//   const [isOTPVerified, setIsOTPVerified] = useState(false);

//   const [isAnimation, setIsAnimation] = useState(false);

//   const { stayId } = useParams();

//   const checkin=JSON.parse(localStorage.getItem("startDate") || "{}");

//   const checkout=JSON.parse(localStorage.getItem("endDate") || "{}");

//   const handleTotalGuestsChange = (newTotalGuests: any) => {
//     setTotalGuests(newTotalGuests);
//     console.log("newTotalGuests", newTotalGuests);
//   };

//   const [loading, setLoading] = useState(false);

//   const [enquiryDetails, setEnquiryDetails] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const handleEnquiryDetailsChange = (e: any) => {
//     const { name, value } = e.target;
//     setEnquiryDetails((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const [roomTypeCounts] = useState(JSON.parse(localStorage.getItem("roomTypeCounts") || "{}"));
  
//     const calculateTotalPrice = (
//       startDate: Date | any,
//       endDate: Date | any,
//       impDates: string[],
//       prices: Prices,
//       blockPrice: number
//     ): number => {
//       let end = new Date(endDate).toISOString();
//       let currentDate = new Date(startDate).toISOString();

//       let totalPrice = 0;

//       while (currentDate <= end) {
//         if (impDates.includes(currentDate)) {
//           totalPrice += blockPrice;
//         } else {
//           const dayOfWeek = new Intl.DateTimeFormat("en-US", {
//             weekday: "long",
//           })
//             .format(new Date(currentDate))
//             .toLowerCase();
//           totalPrice += prices[dayOfWeek] || 0;
//         }

//         const nextDate = new Date(currentDate);
//         nextDate.setDate(nextDate.getDate() + 1);
//         currentDate = nextDate.toISOString();
//       }
//       console.log("calculate total price", totalPrice);
//       setFinalPrice(totalPrice);
//       return totalPrice;
//     };

//   useEffect(() => {
//     const updatedTotalPrices: Record<string, number> = {};
//     const roomTypes = JSON.parse(localStorage.getItem("roomTypes") || "{}");
//     Object.entries(roomTypes).forEach(([type, rooms]: [any, any]) => {
//       const firstRoom = rooms[0];
//       const impDatesString = firstRoom.selectedDates || "[]";
//       const impDates = JSON.parse(impDatesString);
//       console.log("date string type", typeof impDates);
//       const blockPrice = JSON.parse(firstRoom.blockPrice);
//       const innerParse = JSON.parse(firstRoom.prices);
//       // const prices: Prices = JSON.parse(innerParse); //uncomment in production
//       const prices: Prices = innerParse; //comment in production
//       const checkin = JSON.parse(localStorage.getItem("startDate") || "{}");
//       const checkout = JSON.parse(localStorage.getItem("endDate") || "{}");
//       const totalPriceForRoom = calculateTotalPrice(
//         checkin,
//         checkout,
//         impDates,
//         prices,
//         blockPrice
//       );

//       updatedTotalPrices[type] = totalPriceForRoom;
//     });
//     console.log(updatedTotalPrices, "updatedTotalPrices");
//     setTotalPrices(updatedTotalPrices);
//   }, [startDate,endDate]);

//  useEffect(() => {
//    const total: number = Object.entries(roomTypeCounts).reduce(
//      (acc, [roomType, count]) => {
//        const totalPriceForRoomType = totalPrices[roomType] || 0;
//        return acc + totalPriceForRoomType * (count as number);
//      },
//      0
//    );

//    const totalRooms: number = (
//      Object.values(roomTypeCounts) as number[]
//    ).reduce((acc, currentValue) => acc + currentValue, 0);

//    setFinalPrice(total);
//  }, [totalPrices]);


//   useEffect(() => {
//     let checkin = JSON.parse(localStorage.getItem("startDate") || "{}");
//     let checkout = JSON.parse(localStorage.getItem("endDate") || "{}");
//     checkin=new Date(checkin);
//     checkout=new Date(checkout);
//     console.log("checkin", checkin, "checkout", checkout);
//     const diff: number =
//       new Date(checkout?.getTime()!).getTime() -
//       new Date(checkin?.getTime()!).getTime();
//     const days = diff / (1000 * 60 * 60 * 24);
//     setTotalDays(days);
//   }, [startDate, endDate]);

//   const renderSidebar = () => {




//     const handleDateChange = (dates: [Date | null, Date | null]) => {
//       // Handle the date changes here
//       const [start, end] = dates;
//       setStartDate(start);
//       setEndDate(end);
//       if (onDateChange) {
//         onDateChange(dates);
//         // calculateTotalPrice();
//         console.log("getting here");
//       }
//     };

    

//     return (
//       <>
//         <div className="listingSectionSidebar__wrap shadow-xl">
//           {/* PRICE */}
//           <span className="text-md font-semibold">Starting</span>
//           <div className="flex justify-between">
//             <span className="text-3xl font-semibold">
//               {startingPrice ? `₹ ${startingPrice}` : "₹ 7,000"}
//               <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
//                 /night
//               </span>
//             </span>
//             {/* <StartRating /> */}
//           </div>

//           <div>
//             <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 overflow-hidden z-10">
//               <ModalSelectDate
//                 renderChildren={({ openModal }) => (
//                   <button
//                     onClick={openModal}
//                     className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
//                     type="button"
//                   >
//                     <div className="flex flex-col">
//                       <span className="text-sm text-neutral-400">Date</span>
//                       <span className="mt-1.5 text-lg font-semibold">
//                         {converSelectedDateToString([startDate, endDate])}
//                       </span>
//                     </div>
//                     <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
//                   </button>
//                 )}
//                 onDateChange={handleDateChange}
//               />

//               <ModalSelectGuests
//                 onChange={handleTotalGuestsChange}
//                 renderChildren={({ openModal }) => (
//                   <button
//                     type="button"
//                     onClick={openModal}
//                     className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
//                   >
//                     <div className="flex flex-col">
//                       <span className="text-sm text-neutral-400">Guests</span>
//                       <span className="mt-1.5 text-lg font-semibold">
//                         <span className="line-clamp-1">
//                           {`${
//                             (guests.guestAdults || 1) +
//                             (guests.guestChildren || 0)
//                           } Guests, ${guests.guestInfants || 0} Infants`}
//                         </span>
//                       </span>
//                     </div>
//                     <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
//                   </button>
//                 )}
//               />
//             </div>
//           </div>

//           {/* SUM */}
//           <div className="flex flex-col space-y-4">
//             {Object?.entries(totalPrices)?.map(
//               ([roomType, totalPrice]) =>
//                 roomTypeCounts[roomType] > 0 && (
//                   <div
//                     key={roomType}
//                     className="flex justify-between text-neutral-6000 dark:text-neutral-300"
//                   >
//                     <span>{`${roomType} x ${
//                       totalDays > 0 ? totalDays : 0
//                     } night x ${roomTypeCounts[roomType] || 0} rooms`}</span>
//                     <span className="flex items-center">
//                       ₹{" "}
//                       {(
//                         totalPrice * (roomTypeCounts[roomType] || 0)
//                       ).toLocaleString("en-IN")}{" "}
//                       /-
//                     </span>
//                   </div>
//                 )
//             )}
//             {/* </div> */}
//             <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
//               <span>Service charge</span>
//               <span>₹ 0/- </span>
//             </div>
//             <div className="flex justify-between text-neutral-6000 dark:text-neutral-300"></div>
//             <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
//             <div className="flex justify-between font-semibold">
//               <span>Total</span>
//               <span>₹ {finalPrice}</span>
//             </div>
//           </div>

//           {/* SUBMIT */}
//           <ButtonPrimary onClick={() => setIsEnquiryModalOpen(true)}>
//             Enquiry
//           </ButtonPrimary>
//           {renderModalEnquiry()}
//           {renderOtpNumber()}
//           {renderOtpVerification()}
//           {renderAnimationModal()}
//         </div>
//       </>
//     );
//   };

//   // const renderModalEnquiry = () => {
//   //   function closeModalEnquiry() {
//   //     setIsEnquiryModalOpen(false);
//   //   }

//   //   function EnquriyOtpNumber() {
//   //     setIsEnquiryModalOpen(false);

//   //     setIsOTPNumber(true);
//   //   }

//   //   return (
//   //     <Transition appear show={isEnquiryModalOpen} as={Fragment}>
//   //       <Dialog
//   //         as="div"
//   //         className="fixed inset-0 z-50 overflow-y-auto"
//   //         onClose={closeModalEnquiry}
//   //       >
//   //         <div className="min-h-screen px-4 text-center">
//   //           <Transition.Child
//   //             as={Fragment}
//   //             enter="ease-out duration-300"
//   //             enterFrom="opacity-0"
//   //             enterTo="opacity-100"
//   //             leave="ease-in duration-200"
//   //             leaveFrom="opacity-100"
//   //             leaveTo="opacity-0"
//   //           >
//   //             <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
//   //           </Transition.Child>

//   //           <span
//   //             className="inline-block h-screen align-middle"
//   //             aria-hidden="true"
//   //           >
//   //             &#8203;
//   //           </span>
//   //           <Transition.Child
//   //             as={Fragment}
//   //             enter="ease-out duration-300"
//   //             enterFrom="opacity-0 scale-95"
//   //             enterTo="opacity-100 scale-100"
//   //             leave="ease-in duration-200"
//   //             leaveFrom="opacity-100 scale-100"
//   //             leaveTo="opacity-0 scale-95"
//   //           >
//   //             <div className="inline-block py-8 h-auto w-full max-w-xl">
//   //               <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
//   //                 <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
//   //                   <h3
//   //                     className="text-lg font-medium leading-6 text-gray-900"
//   //                     id="headlessui-dialog-title-70"
//   //                   >
//   //                     Enquriy Form
//   //                   </h3>
//   //                   <span className="absolute left-3 top-3">
//   //                     <ButtonClose onClick={closeModalEnquiry} />
//   //                   </span>
//   //                 </div>
//   //                 <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
//   //                   <form
//   //                     className="grid grid-cols-1 gap-6 mt-10 mb-10"
//   //                     onSubmit={(e) => e.preventDefault()}
//   //                   >
//   //                     <label className="block">
//   //                       <span className="text-neutral-800 dark:text-neutral-200">
//   //                         Name
//   //                       </span>
//   //                       <Input
//   //                         type="email"
//   //                         placeholder="Enter Your Name"
//   //                         className="mt-1"
//   //                       />
//   //                     </label>
//   //                     <label className="block">
//   //                       <span className="text-neutral-800 dark:text-neutral-200">
//   //                         Email address
//   //                       </span>
//   //                       <Input
//   //                         type="email"
//   //                         placeholder="Enter Your Email"
//   //                         className="mt-1"
//   //                       />
//   //                     </label>
//   //                     <label className="block">
//   //                       <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
//   //                         Mobile Number
//   //                       </span>
//   //                       <Input
//   //                         type="Number"
//   //                         className="mt-1"
//   //                         placeholder="Enter Your Number"
//   //                       />
//   //                     </label>

//   //                     <ButtonPrimary type="submit" onClick={EnquriyOtpNumber}>
//   //                       Send OTP
//   //                     </ButtonPrimary>
//   //                     {renderOtpNumber()}
//   //                   </form>
//   //                 </div>
//   //               </div>
//   //             </div>
//   //           </Transition.Child>
//   //         </div>
//   //       </Dialog>
//   //     </Transition>
//   //   );
//   // };

//   const renderModalEnquiry = () => {
//     function closeModalEnquiry() {
//       setIsEnquiryModalOpen(false);
//     }
//     const sendEnquiry = async () => {
//       const details = {
//         checkin: (new Date(checkin))?.toISOString(),
//         checkout: (new Date(checkout))?.toISOString(),
//         guests: totalGuests,
//         propertyId: stayId,
//         rooms: JSON.stringify(roomTypeCounts),
//         amount: finalPrice,
//         ...enquiryDetails,
//       };
//       console.log("details", details);

//       try {
//         const res = await axiosInstance.post("/enquiry/createEnquiry", {
//           details,
//         });
//         if (res.status === 200) {
//           Swal.fire(
//             "Enquiry Submitted",
//             "Your enquiry has been submitted successfully",
//             "success"
//           );
//           setIsEnquiryModalOpen(false);
//         } else {
//           Swal.fire(
//             "Enquiry Not Submitted",
//             "Your enquiry has not been submitted",
//             "error"
//           );
//           setIsEnquiryModalOpen(false);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     return (
//       <Transition appear show={isEnquiryModalOpen} as={Fragment}>
//         <Dialog
//           as="div"
//           className="fixed inset-0 z-50 overflow-y-auto"
//           onClose={closeModalEnquiry}
//         >
//           <div className="min-h-screen px-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
//             </Transition.Child>

//             <span
//               className="inline-block h-screen align-middle"
//               aria-hidden="true"
//             >
//               &#8203;
//             </span>
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <div className="inline-block py-8 h-auto w-full max-w-xl">
//                 <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
//                   <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
//                     <h3
//                       className="text-lg font-medium leading-6 text-gray-900"
//                       id="headlessui-dialog-title-70"
//                     >
//                       Enquriy Form
//                     </h3>
//                     <span className="absolute left-3 top-3">
//                       <ButtonClose onClick={closeModalEnquiry} />
//                     </span>
//                   </div>
//                   <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
//                     <form
//                       className="grid grid-cols-1 gap-6 mt-10 mb-10"
//                       onSubmit={(e) => e.preventDefault()}
//                     >
//                       <label className="block">
//                         <span className="text-neutral-800 dark:text-neutral-200">
//                           First Name
//                         </span>
//                         <Input
//                           type="text"
//                           name="first_name"
//                           placeholder="Enter Your First Name"
//                           className="mt-1"
//                           onChange={handleEnquiryDetailsChange}
//                           required
//                         />
//                       </label>
//                       <label className="block">
//                         <span className="text-neutral-800 dark:text-neutral-200">
//                           Last Name
//                         </span>
//                         <Input
//                           type="text"
//                           name="last_name"
//                           placeholder="Enter Your Last Name"
//                           className="mt-1"
//                           onChange={handleEnquiryDetailsChange}
//                           required
//                         />
//                       </label>
//                       <label className="block">
//                         <span className="text-neutral-800 dark:text-neutral-200">
//                           Email address
//                         </span>
//                         <Input
//                           type="email"
//                           name="email"
//                           placeholder="Enter Your Email"
//                           className="mt-1"
//                           onChange={handleEnquiryDetailsChange}
//                           required
//                         />
//                       </label>
//                       <label className="block">
//                         <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
//                           Mobile Number
//                         </span>
//                         <Input
//                           type="Number"
//                           className="mt-1"
//                           name="phone"
//                           placeholder="Enter Your Number"
//                           onChange={handleEnquiryDetailsChange}
//                           required
//                         />
//                       </label>
//                       <label className="block">
//                         <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
//                           Message
//                         </span>
//                         <Input
//                           type="text"
//                           name="message"
//                           className="mt-1"
//                           placeholder="Any message to Vendor"
//                           onChange={handleEnquiryDetailsChange}
//                         />
//                       </label>

//                       {/* <ButtonPrimary
//                         type="submit"
//                         onClick={() => {
//                           sendEnquiry();
//                         }}
//                       >
//                         Send Enquiry
//                       </ButtonPrimary> */}
//                       <ButtonPrimary
//                         type="submit"
//                         onClick={() => {
//                           sendEnquiry();
//                         }}
//                       >
//                         {!loading && "Save Changes"}
//                         {loading && (
//                           <span
//                             className="indicator-progress"
//                             style={{ display: "block" }}
//                           >
//                             Please wait...{" "}
//                             <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
//                           </span>
//                         )}
//                       </ButtonPrimary>
//                       {renderOtpNumber()}
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition>
//     );
//   };


//   const renderOtpNumber = () => {
//     function ClosedModalOTP() {
//       setIsOTPNumber(false);
//     }

//     function OtpGenratorVerified() {
//       setIsOTPNumber(false);

//       setIsOTPVerified(true);
//     }

//     return (
//       <Transition appear show={isOTPNumber} as={Fragment}>
//         <Dialog
//           as="div"
//           className="fixed inset-0 z-50 overflow-y-auto"
//           onClose={ClosedModalOTP}
//         >
//           <div className="min-h-screen px-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
//             </Transition.Child>

//             <span
//               className="inline-block h-screen align-middle"
//               aria-hidden="true"
//             >
//               &#8203;
//             </span>
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <div className="inline-block py-8 h-auto w-full max-w-xl">
//                 <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
//                   <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
//                     <h3
//                       className="text-lg font-medium leading-6 text-gray-900"
//                       id="headlessui-dialog-title-70"
//                     >
//                       OTP Generator
//                     </h3>
//                     <span className="absolute left-3 top-3">
//                       <ButtonClose onClick={ClosedModalOTP} />
//                     </span>
//                   </div>
//                   <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
//                     <form
//                       className="grid grid-cols-1 gap-6 mt-10 mb-10"
//                       onSubmit={(e) => e.preventDefault()}
//                     >
//                       <label className="block">
//                         <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
//                           Mobile Number
//                         </span>
//                         <Input
//                           type="Number"
//                           className="mt-3"
//                           placeholder="Enter Your Number"
//                         />
//                       </label>

//                       <ButtonPrimary
//                         type="submit"
//                         onClick={OtpGenratorVerified}
//                       >
//                         Verify
//                       </ButtonPrimary>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition>
//     );
//   };

//   const renderOtpVerification = () => {
//     function ClosedModalVerified() {
//       setIsOTPVerified(false);
//     }

//     function AnimationModal() {
//       setIsOTPVerified(false);

//       setIsAnimation(true);
//     }
//     return (
//       <Transition appear show={isOTPVerified} as={Fragment}>
//         <Dialog
//           as="div"
//           className="fixed inset-0 z-50 overflow-y-auto"
//           onClose={ClosedModalVerified}
//         >
//           <div className="min-h-screen px-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
//             </Transition.Child>

//             {/* This element is to trick the browser into centering the modal contents. */}
//             <span
//               className="inline-block h-screen align-middle"
//               aria-hidden="true"
//             >
//               &#8203;
//             </span>
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <div className="inline-block py-8 h-auto w-full max-w-xl">
//                 <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
//                   <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
//                     <h3
//                       className="text-lg font-medium leading-6 text-gray-900"
//                       id="headlessui-dialog-title-70"
//                     >
//                       OTP Verification
//                     </h3>
//                     <span className="absolute left-3 top-3">
//                       <ButtonClose onClick={ClosedModalVerified} />
//                     </span>
//                   </div>
//                   <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
//                     <form
//                       className="grid grid-cols-1 gap-6 mt-10 mb-10"
//                       onSubmit={(e) => e.preventDefault()}
//                     >
//                       <label className="block">
//                         <h3 className="text-center">
//                           An OTP is sent to +91 79XXXXXX07 SuccessFully !!!
//                         </h3>
//                         <Input
//                           type="text"
//                           className="mt-5"
//                           placeholder="Enter Your 6 Digit Number"
//                           maxLength={6}
//                         />
//                       </label>

//                       <ButtonPrimary type="submit" onClick={AnimationModal}>
//                         Submit
//                       </ButtonPrimary>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition>
//     );
//   };

//   const renderAnimationModal = () => {
//     function ClosedModalAnimation() {
//       setIsAnimation(false);
//     }
//     return (
//       <Transition appear show={isAnimation} as={Fragment}>
//         <Dialog
//           as="div"
//           className="fixed inset-0 z-50 overflow-y-auto"
//           onClose={ClosedModalAnimation}
//         >
//           <div className="min-h-screen px-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
//             </Transition.Child>

//             {/* This element is to trick the browser into centering the modal contents. */}
//             <span
//               className="inline-block h-screen align-middle"
//               aria-hidden="true"
//             >
//               &#8203;
//             </span>
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <div className="inline-block py-8 h-auto w-full max-w-xl">
//                 <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
//                   <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
//                     <h3
//                       className="text-lg font-medium leading-6 text-gray-900"
//                       id="headlessui-dialog-title-70"
//                     >
//                       Registration
//                     </h3>
//                     <span className="absolute left-3 top-3">
//                       <ButtonClose onClick={ClosedModalAnimation} />
//                     </span>
//                   </div>
//                   <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
//                     <form
//                       className="grid grid-cols-1 gap-6 mt-10 mb-10 text-center"
//                       onSubmit={(e) => e.preventDefault()}
//                     >
//                       <div className="flex justify-center items-center">
//                         <Success />
//                       </div>
//                       <h2 className="text-2xl font-semibold">
//                         Yay Registered SuccessFully 🥳
//                       </h2>

//                       {/* <Error /> */}

//                       <ButtonPrimary
//                         type="submit"
//                         onClick={ClosedModalAnimation}
//                       >
//                         Go Back
//                       </ButtonPrimary>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition>
//     );
//   };

//   const renderMain = () => {
//     return (
//       <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
//         <h2 className="text-3xl lg:text-4xl font-semibold">Enquriy Details</h2>
//         <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
//         <div>{renderSidebar()}</div>
//       </div>
//     );
//   };

//   return (
//     <div className={`nc-CheckOutPagePageMain ${className}`}>
//       <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
//         <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
//         {/* <div className="hidden lg:block flex-grow">{renderSidebar()}</div> */}
//       </main>
//     </div>
//   );
// };

// export default CheckOutPagePageMain;


// import { Dialog, Transition } from "@headlessui/react";
// import { PencilSquareIcon } from "@heroicons/react/24/outline";
// import React, { FC, Fragment, useEffect, useState } from "react";
// // import visaPng from "images/vis.png";
// // import mastercardPng from "images/mastercard.svg";
// import { GuestsObject } from "components/HeroSearchForm/type";
// import StartRating from "components/StartRating/StartRating";
// // import NcModal from "shared/NcModal/NcModal";
// import ModalSelectDate from "components/ModalSelectDate";
// import converSelectedDateToString from "utils/converSelectedDateToString";
// import ModalSelectGuests from "components/ModalSelectGuests";
// // import Label from "components/Label/Label";
// import Input from "shared/Input/Input";
// // import Textarea from "shared/Textarea/Textarea";
// import ButtonPrimary from "shared/Button/ButtonPrimary";
// // import ButtonSecondary from "shared/Button/ButtonSecondary";
// import ButtonClose from "shared/ButtonClose/ButtonClose";
// import Success from "components/Animations/Sucess";
// import { displayPartsToString } from "typescript";
// import Swal from "sweetalert2";
// import { axiosInstance } from "index";
// import { useParams } from "react-router-dom";
// // import StayDatesRangeInput from "components/HeroSearchForm2Mobile/DatesRangeInput";
// // import GuestsInput from "components/HeroSearchForm/GuestsInput";

// export interface CheckOutPagePageMainProps {
//   className?: string;
//   startingPrice?: number;
//   totalPrice?: number;
//   onDateChange?: (dates: [Date | null, Date | null]) => void;
//   // calculateTotalPrice?: any;
// }
// interface Prices {
//   sunday: number;
//   monday: number;
//   tuesday: number;
//   wednesday: number;
//   thursday: number;
//   friday: number;
//   saturday: number;
//   [key: string]: number;
// }

// interface TotalPrices {
//   [roomType: string]: number;
// }
// const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
//   className = "",
//   startingPrice,
//   totalPrice,
//   onDateChange,
//   // calculateTotalPrice,
// }) => {
//   const [startDate, setStartDate] = useState<Date | null>(
//     new Date("2023/02/06")
//   );
//   const [endDate, setEndDate] = useState<Date | null>(new Date("2023/02/23"));

//   const [guests] = useState<GuestsObject>({
//     guestAdults: 2,
//     guestChildren: 1,
//     guestInfants: 1,
//   });

//   const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

//   const [totalPrices, setTotalPrices] = useState<TotalPrices>({});

//   const [totalDays, setTotalDays] = useState(0);

//   const [finalPrice, setFinalPrice] = useState(0);

//   const [totalGuests, setTotalGuests] = useState(0);

//   const [isOTPNumber, setIsOTPNumber] = useState(false);

//   const [isOTPVerified, setIsOTPVerified] = useState(false);

//   const [isAnimation, setIsAnimation] = useState(false);

//   const { stayId } = useParams();

//   const checkin = JSON.parse(localStorage.getItem("startDate") || "{}");

//   // const checkout = localStorage.getItem("endDate")!==null?JSON.parse(localStorage.getItem("endDate")):JSON.parse("2024-03-08T18:30:00.000Z")

//   const endDateString = localStorage.getItem("endDate");

//   const checkout =
//     endDateString !== null
//       ? JSON.parse(endDateString)
//       : JSON.parse(JSON.stringify(new Date("2024-03-08T18:30:00.000Z")));

//   const handleTotalGuestsChange = (newTotalGuests: any) => {
//     setTotalGuests(newTotalGuests);
//     console.log("newTotalGuests", newTotalGuests);
//   };

//   const [loading, setLoading] = useState(false);

//   const [enquiryDetails, setEnquiryDetails] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const handleEnquiryDetailsChange = (e: any) => {
//     const { name, value } = e.target;
//     setEnquiryDetails((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const [roomTypeCounts] = useState(
//     JSON.parse(localStorage.getItem("roomTypeCounts") || "{}")
//   );

//   const calculateTotalPrice = (
//     startDate: Date | any,
//     endDate: Date | any,
//     impDates: string[],
//     prices: Prices,
//     blockPrice: number
//   ): number => {
//     console.log("end", endDate);
//     let end = endDate
//       ? new Date(endDate).toISOString()
//       : new Date("2024-03-08T18:30:00.000Z").toISOString();
//     console.log("start", startDate);
//     let currentDate = startDate?(new Date(startDate)).toISOString():new Date("2024-03-04T18:30:00.000Z").toISOString();

//     let totalPrice = 0;

//     while (currentDate <= end) {

//       if (impDates.includes(currentDate)) {
//         totalPrice += blockPrice;
//       } else {
//         const dayOfWeek = new Intl.DateTimeFormat("en-US", {
//           weekday: "long",
//         })
//           .format(new Date(currentDate))
//           .toLowerCase();
//         totalPrice += prices[dayOfWeek] || 0;
//       }

//       const nextDate = new Date(currentDate);
//       nextDate.setDate(nextDate.getDate() + 1);
//       currentDate = nextDate.toISOString();
//     }
//     console.log("calculate total price", totalPrice);
//     setFinalPrice(totalPrice);
//     return totalPrice;
//   };

//   useEffect(() => {
//     const updatedTotalPrices: Record<string, number> = {};
//     const roomTypes = JSON.parse(localStorage.getItem("roomTypes") || "{}");
//     Object.entries(roomTypes).forEach(([type, rooms]: [any, any]) => {
//       const firstRoom = rooms[0];
//       const impDatesString = firstRoom.selectedDates || "[]";
//       const impDates = JSON.parse(impDatesString);
//       console.log("date string type", typeof impDates);
//       const blockPrice = JSON.parse(firstRoom.blockPrice);
//       const innerParse = JSON.parse(firstRoom.prices);
//       // const prices: Prices = JSON.parse(innerParse); //uncomment in production
//       const prices: Prices = innerParse; //comment in production
//       const checkin = JSON.parse(localStorage.getItem("startDate") || "{}");
//       const checkout = JSON.parse(localStorage.getItem("endDate") || "{}");
//       const totalPriceForRoom = calculateTotalPrice(
//         checkin,
//         checkout,
//         impDates,
//         prices,
//         blockPrice
//       );

//       updatedTotalPrices[type] = totalPriceForRoom;
//     });
//     console.log(updatedTotalPrices, "updatedTotalPrices");
//     setTotalPrices(updatedTotalPrices);
//   }, [startDate, endDate]);

//   useEffect(() => {
//     const total: number = Object.entries(roomTypeCounts).reduce(
//       (acc, [roomType, count]) => {
//         const totalPriceForRoomType = totalPrices[roomType] || 0;
//         return acc + totalPriceForRoomType * (count as number);
//       },
//       0
//     );

//     const totalRooms: number = (
//       Object.values(roomTypeCounts) as number[]
//     ).reduce((acc, currentValue) => acc + currentValue, 0);

//     setFinalPrice(total);
//   }, [totalPrices]);

//   useEffect(() => {
//     let checkin = JSON.parse(localStorage.getItem("startDate") || "{}");
//     let checkout = JSON.parse(localStorage.getItem("endDate") || "{}");
//     checkin = new Date(checkin);
//     checkout = new Date(checkout);
//     console.log("checkin", checkin, "checkout", checkout);
//     const diff: number =
//       new Date(checkout?.getTime()!).getTime() -
//       new Date(checkin?.getTime()!).getTime();
//     const days = diff / (1000 * 60 * 60 * 24);
//     setTotalDays(days);
//   }, [startDate, endDate]);

//   const renderSidebar = () => {
//     const handleDateChange = (dates: [Date | null, Date | null]) => {
//       // Handle the date changes here
//       const [start, end] = dates;
//       setStartDate(start);
//       setEndDate(end);
//       if (onDateChange) {
//         onDateChange(dates);
//         // calculateTotalPrice();
//         console.log("getting here");
//       }
//     };

//     return (
//       <>
//         <div className="listingSectionSidebar__wrap shadow-xl">
//           {/* PRICE */}
//           <span className="text-md font-semibold">Starting</span>
//           <div className="flex justify-between">
//             <span className="text-3xl font-semibold">
//               {startingPrice ? `₹ ${startingPrice}` : "₹ 7,000"}
//               <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
//                 /night
//               </span>
//             </span>
//             {/* <StartRating /> */}
//           </div>

//           <div>
//             <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 overflow-hidden z-10">
//               <ModalSelectDate
//                 renderChildren={({ openModal }) => (
//                   <button
//                     onClick={openModal}
//                     className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
//                     type="button"
//                   >
//                     <div className="flex flex-col">
//                       <span className="text-sm text-neutral-400">Date</span>
//                       <span className="mt-1.5 text-lg font-semibold">
//                         {converSelectedDateToString([startDate, endDate])}
//                       </span>
//                     </div>
//                     <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
//                   </button>
//                 )}
//                 onDateChange={handleDateChange}
//               />

//               <ModalSelectGuests
//                 onChange={handleTotalGuestsChange}
//                 renderChildren={({ openModal }) => (
//                   <button
//                     type="button"
//                     onClick={openModal}
//                     className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
//                   >
//                     <div className="flex flex-col">
//                       <span className="text-sm text-neutral-400">Guests</span>
//                       <span className="mt-1.5 text-lg font-semibold">
//                         <span className="line-clamp-1">
//                           {`${
//                             (guests.guestAdults || 1) +
//                             (guests.guestChildren || 0)
//                           } Guests, ${guests.guestInfants || 0} Infants`}
//                         </span>
//                       </span>
//                     </div>
//                     <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
//                   </button>
//                 )}
//               />
//             </div>
//           </div>

//           {/* SUM */}
//           <div className="flex flex-col space-y-4">
//             {Object?.entries(totalPrices)?.map(
//               ([roomType, totalPrice]) =>
//                 roomTypeCounts[roomType] > 0 && (
//                   <div
//                     key={roomType}
//                     className="flex justify-between text-neutral-6000 dark:text-neutral-300"
//                   >
//                     <span>{`${roomType} x ${
//                       totalDays > 0 ? totalDays : 0
//                     } night x ${roomTypeCounts[roomType] || 0} rooms`}</span>
//                     <span className="flex items-center">
//                       ₹{" "}
//                       {(
//                         totalPrice * (roomTypeCounts[roomType] || 0)
//                       ).toLocaleString("en-IN")}{" "}
//                       /-
//                     </span>
//                   </div>
//                 )
//             )}
//             {/* </div> */}
//             <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
//               <span>Service charge</span>
//               <span>₹ 0/- </span>
//             </div>
//             <div className="flex justify-between text-neutral-6000 dark:text-neutral-300"></div>
//             <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
//             <div className="flex justify-between font-semibold">
//               <span>Total</span>
//               <span>₹ {finalPrice}</span>
//             </div>
//           </div>

//           {/* SUBMIT */}
//           <ButtonPrimary onClick={() => setIsEnquiryModalOpen(true)}>
//             Enquiry
//           </ButtonPrimary>
//           {renderModalEnquiry()}
//           {renderOtpNumber()}
//           {renderOtpVerification()}
//           {renderAnimationModal()}
//         </div>
//       </>
//     );
//   };

//   // const renderModalEnquiry = () => {
//   //   function closeModalEnquiry() {
//   //     setIsEnquiryModalOpen(false);
//   //   }

//   //   function EnquriyOtpNumber() {
//   //     setIsEnquiryModalOpen(false);

//   //     setIsOTPNumber(true);
//   //   }

//   //   return (
//   //     <Transition appear show={isEnquiryModalOpen} as={Fragment}>
//   //       <Dialog
//   //         as="div"
//   //         className="fixed inset-0 z-50 overflow-y-auto"
//   //         onClose={closeModalEnquiry}
//   //       >
//   //         <div className="min-h-screen px-4 text-center">
//   //           <Transition.Child
//   //             as={Fragment}
//   //             enter="ease-out duration-300"
//   //             enterFrom="opacity-0"
//   //             enterTo="opacity-100"
//   //             leave="ease-in duration-200"
//   //             leaveFrom="opacity-100"
//   //             leaveTo="opacity-0"
//   //           >
//   //             <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
//   //           </Transition.Child>

//   //           <span
//   //             className="inline-block h-screen align-middle"
//   //             aria-hidden="true"
//   //           >
//   //             &#8203;
//   //           </span>
//   //           <Transition.Child
//   //             as={Fragment}
//   //             enter="ease-out duration-300"
//   //             enterFrom="opacity-0 scale-95"
//   //             enterTo="opacity-100 scale-100"
//   //             leave="ease-in duration-200"
//   //             leaveFrom="opacity-100 scale-100"
//   //             leaveTo="opacity-0 scale-95"
//   //           >
//   //             <div className="inline-block py-8 h-auto w-full max-w-xl">
//   //               <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
//   //                 <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
//   //                   <h3
//   //                     className="text-lg font-medium leading-6 text-gray-900"
//   //                     id="headlessui-dialog-title-70"
//   //                   >
//   //                     Enquriy Form
//   //                   </h3>
//   //                   <span className="absolute left-3 top-3">
//   //                     <ButtonClose onClick={closeModalEnquiry} />
//   //                   </span>
//   //                 </div>
//   //                 <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
//   //                   <form
//   //                     className="grid grid-cols-1 gap-6 mt-10 mb-10"
//   //                     onSubmit={(e) => e.preventDefault()}
//   //                   >
//   //                     <label className="block">
//   //                       <span className="text-neutral-800 dark:text-neutral-200">
//   //                         Name
//   //                       </span>
//   //                       <Input
//   //                         type="email"
//   //                         placeholder="Enter Your Name"
//   //                         className="mt-1"
//   //                       />
//   //                     </label>
//   //                     <label className="block">
//   //                       <span className="text-neutral-800 dark:text-neutral-200">
//   //                         Email address
//   //                       </span>
//   //                       <Input
//   //                         type="email"
//   //                         placeholder="Enter Your Email"
//   //                         className="mt-1"
//   //                       />
//   //                     </label>
//   //                     <label className="block">
//   //                       <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
//   //                         Mobile Number
//   //                       </span>
//   //                       <Input
//   //                         type="Number"
//   //                         className="mt-1"
//   //                         placeholder="Enter Your Number"
//   //                       />
//   //                     </label>

//   //                     <ButtonPrimary type="submit" onClick={EnquriyOtpNumber}>
//   //                       Send OTP
//   //                     </ButtonPrimary>
//   //                     {renderOtpNumber()}
//   //                   </form>
//   //                 </div>
//   //               </div>
//   //             </div>
//   //           </Transition.Child>
//   //         </div>
//   //       </Dialog>
//   //     </Transition>
//   //   );
//   // };

//   const renderModalEnquiry = () => {
//     function closeModalEnquiry() {
//       setIsEnquiryModalOpen(false);
//     }
//     const sendEnquiry = async () => {
//       const details = {
//         checkin: new Date(checkin)?.toISOString(),
//         checkout: new Date(checkout)?.toISOString(),
//         guests: totalGuests,
//         propertyId: stayId,
//         rooms: JSON.stringify(roomTypeCounts),
//         amount: finalPrice,
//         ...enquiryDetails,
//       };
//       console.log("details", details);

//       try {
//         const res = await axiosInstance.post("/enquiry/createEnquiry", {
//           details,
//         });
//         if (res.status === 200) {
//           Swal.fire(
//             "Enquiry Submitted",
//             "Your enquiry has been submitted successfully",
//             "success"
//           );
//           setIsEnquiryModalOpen(false);
//         } else {
//           Swal.fire(
//             "Enquiry Not Submitted",
//             "Your enquiry has not been submitted",
//             "error"
//           );
//           setIsEnquiryModalOpen(false);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     return (
//       <Transition appear show={isEnquiryModalOpen} as={Fragment}>
//         <Dialog
//           as="div"
//           className="fixed inset-0 z-50 overflow-y-auto"
//           onClose={closeModalEnquiry}
//         >
//           <div className="min-h-screen px-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
//             </Transition.Child>

//             <span
//               className="inline-block h-screen align-middle"
//               aria-hidden="true"
//             >
//               &#8203;
//             </span>
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <div className="inline-block py-8 h-auto w-full max-w-xl">
//                 <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
//                   <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
//                     <h3
//                       className="text-lg font-medium leading-6 text-gray-900"
//                       id="headlessui-dialog-title-70"
//                     >
//                       Enquriy Form
//                     </h3>
//                     <span className="absolute left-3 top-3">
//                       <ButtonClose onClick={closeModalEnquiry} />
//                     </span>
//                   </div>
//                   <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
//                     <form
//                       className="grid grid-cols-1 gap-6 mt-10 mb-10"
//                       onSubmit={(e) => e.preventDefault()}
//                     >
//                       <label className="block">
//                         <span className="text-neutral-800 dark:text-neutral-200">
//                           First Name
//                         </span>
//                         <Input
//                           type="text"
//                           name="first_name"
//                           placeholder="Enter Your First Name"
//                           className="mt-1"
//                           onChange={handleEnquiryDetailsChange}
//                           required
//                         />
//                       </label>
//                       <label className="block">
//                         <span className="text-neutral-800 dark:text-neutral-200">
//                           Last Name
//                         </span>
//                         <Input
//                           type="text"
//                           name="last_name"
//                           placeholder="Enter Your Last Name"
//                           className="mt-1"
//                           onChange={handleEnquiryDetailsChange}
//                           required
//                         />
//                       </label>
//                       <label className="block">
//                         <span className="text-neutral-800 dark:text-neutral-200">
//                           Email address
//                         </span>
//                         <Input
//                           type="email"
//                           name="email"
//                           placeholder="Enter Your Email"
//                           className="mt-1"
//                           onChange={handleEnquiryDetailsChange}
//                           required
//                         />
//                       </label>
//                       <label className="block">
//                         <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
//                           Mobile Number
//                         </span>
//                         <Input
//                           type="Number"
//                           className="mt-1"
//                           name="phone"
//                           placeholder="Enter Your Number"
//                           onChange={handleEnquiryDetailsChange}
//                           required
//                         />
//                       </label>
//                       <label className="block">
//                         <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
//                           Message
//                         </span>
//                         <Input
//                           type="text"
//                           name="message"
//                           className="mt-1"
//                           placeholder="Any message to Vendor"
//                           onChange={handleEnquiryDetailsChange}
//                         />
//                       </label>

//                       {/* <ButtonPrimary
//                         type="submit"
//                         onClick={() => {
//                           sendEnquiry();
//                         }}
//                       >
//                         Send Enquiry
//                       </ButtonPrimary> */}
//                       <ButtonPrimary
//                         type="submit"
//                         onClick={() => {
//                           sendEnquiry();
//                         }}
//                       >
//                         {!loading && "Save Changes"}
//                         {loading && (
//                           <span
//                             className="indicator-progress"
//                             style={{ display: "block" }}
//                           >
//                             Please wait...{" "}
//                             <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
//                           </span>
//                         )}
//                       </ButtonPrimary>
//                       {renderOtpNumber()}
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition>
//     );
//   };

//   const renderOtpNumber = () => {
//     function ClosedModalOTP() {
//       setIsOTPNumber(false);
//     }

//     function OtpGenratorVerified() {
//       setIsOTPNumber(false);

//       setIsOTPVerified(true);
//     }

//     return (
//       <Transition appear show={isOTPNumber} as={Fragment}>
//         <Dialog
//           as="div"
//           className="fixed inset-0 z-50 overflow-y-auto"
//           onClose={ClosedModalOTP}
//         >
//           <div className="min-h-screen px-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
//             </Transition.Child>

//             <span
//               className="inline-block h-screen align-middle"
//               aria-hidden="true"
//             >
//               &#8203;
//             </span>
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <div className="inline-block py-8 h-auto w-full max-w-xl">
//                 <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
//                   <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
//                     <h3
//                       className="text-lg font-medium leading-6 text-gray-900"
//                       id="headlessui-dialog-title-70"
//                     >
//                       OTP Generator
//                     </h3>
//                     <span className="absolute left-3 top-3">
//                       <ButtonClose onClick={ClosedModalOTP} />
//                     </span>
//                   </div>
//                   <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
//                     <form
//                       className="grid grid-cols-1 gap-6 mt-10 mb-10"
//                       onSubmit={(e) => e.preventDefault()}
//                     >
//                       <label className="block">
//                         <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
//                           Mobile Number
//                         </span>
//                         <Input
//                           type="Number"
//                           className="mt-3"
//                           placeholder="Enter Your Number"
//                         />
//                       </label>

//                       <ButtonPrimary
//                         type="submit"
//                         onClick={OtpGenratorVerified}
//                       >
//                         Verify
//                       </ButtonPrimary>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition>
//     );
//   };

//   const renderOtpVerification = () => {
//     function ClosedModalVerified() {
//       setIsOTPVerified(false);
//     }

//     function AnimationModal() {
//       setIsOTPVerified(false);

//       setIsAnimation(true);
//     }
//     return (
//       <Transition appear show={isOTPVerified} as={Fragment}>
//         <Dialog
//           as="div"
//           className="fixed inset-0 z-50 overflow-y-auto"
//           onClose={ClosedModalVerified}
//         >
//           <div className="min-h-screen px-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
//             </Transition.Child>

//             {/* This element is to trick the browser into centering the modal contents. */}
//             <span
//               className="inline-block h-screen align-middle"
//               aria-hidden="true"
//             >
//               &#8203;
//             </span>
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <div className="inline-block py-8 h-auto w-full max-w-xl">
//                 <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
//                   <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
//                     <h3
//                       className="text-lg font-medium leading-6 text-gray-900"
//                       id="headlessui-dialog-title-70"
//                     >
//                       OTP Verification
//                     </h3>
//                     <span className="absolute left-3 top-3">
//                       <ButtonClose onClick={ClosedModalVerified} />
//                     </span>
//                   </div>
//                   <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
//                     <form
//                       className="grid grid-cols-1 gap-6 mt-10 mb-10"
//                       onSubmit={(e) => e.preventDefault()}
//                     >
//                       <label className="block">
//                         <h3 className="text-center">
//                           An OTP is sent to +91 79XXXXXX07 SuccessFully !!!
//                         </h3>
//                         <Input
//                           type="text"
//                           className="mt-5"
//                           placeholder="Enter Your 6 Digit Number"
//                           maxLength={6}
//                         />
//                       </label>

//                       <ButtonPrimary type="submit" onClick={AnimationModal}>
//                         Submit
//                       </ButtonPrimary>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition>
//     );
//   };

//   const renderAnimationModal = () => {
//     function ClosedModalAnimation() {
//       setIsAnimation(false);
//     }
//     return (
//       <Transition appear show={isAnimation} as={Fragment}>
//         <Dialog
//           as="div"
//           className="fixed inset-0 z-50 overflow-y-auto"
//           onClose={ClosedModalAnimation}
//         >
//           <div className="min-h-screen px-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
//             </Transition.Child>

//             {/* This element is to trick the browser into centering the modal contents. */}
//             <span
//               className="inline-block h-screen align-middle"
//               aria-hidden="true"
//             >
//               &#8203;
//             </span>
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <div className="inline-block py-8 h-auto w-full max-w-xl">
//                 <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
//                   <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
//                     <h3
//                       className="text-lg font-medium leading-6 text-gray-900"
//                       id="headlessui-dialog-title-70"
//                     >
//                       Registration
//                     </h3>
//                     <span className="absolute left-3 top-3">
//                       <ButtonClose onClick={ClosedModalAnimation} />
//                     </span>
//                   </div>
//                   <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
//                     <form
//                       className="grid grid-cols-1 gap-6 mt-10 mb-10 text-center"
//                       onSubmit={(e) => e.preventDefault()}
//                     >
//                       <div className="flex justify-center items-center">
//                         <Success />
//                       </div>
//                       <h2 className="text-2xl font-semibold">
//                         Yay Registered SuccessFully 🥳
//                       </h2>

//                       {/* <Error /> */}

//                       <ButtonPrimary
//                         type="submit"
//                         onClick={ClosedModalAnimation}
//                       >
//                         Go Back
//                       </ButtonPrimary>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition>
//     );
//   };

//   const renderMain = () => {
//     return (
//       <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
//         <h2 className="text-3xl lg:text-4xl font-semibold">Enquriy Details</h2>
//         <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
//         <div>{renderSidebar()}</div>
//       </div>
//     );
//   };

//   return (
//     <div className={`nc-CheckOutPagePageMain ${className}`}>
//       <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
//         <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
//         {/* <div className="hidden lg:block flex-grow">{renderSidebar()}</div> */}
//       </main>
//     </div>
//   );
// };

// export default CheckOutPagePageMain;




import { Dialog, Transition } from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { FC, Fragment, useEffect, useState } from "react";
// import visaPng from "images/vis.png";
// import mastercardPng from "images/mastercard.svg";
import { GuestsObject } from "components/HeroSearchForm/type";
import StartRating from "components/StartRating/StartRating";
// import NcModal from "shared/NcModal/NcModal";
import ModalSelectDate from "components/ModalSelectDate";
import converSelectedDateToString from "utils/converSelectedDateToString";
import ModalSelectGuests from "components/ModalSelectGuests";
// import Label from "components/Label/Label";
import Input from "shared/Input/Input";
// import Textarea from "shared/Textarea/Textarea";
import ButtonPrimary from "shared/Button/ButtonPrimary";
// import ButtonSecondary from "shared/Button/ButtonSecondary";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Success from "components/Animations/Sucess";
import { displayPartsToString } from "typescript";
import Swal from "sweetalert2";
import { axiosInstance } from "index";
import { useParams } from "react-router-dom";
import { useSearch } from "SearchContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "AuthContext";
import { toast } from "react-toastify";

export interface CheckOutPagePageMainProps {
  className?: string;
  startingPrice?: number;
  totalPrice?: number;
  onDateChange?: (dates: [Date | null, Date | null]) => void;
  // calculateTotalPrice?: any;
}
interface Prices {
  sunday: number;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  [key: string]: number;
}

interface TotalPrices {
  [roomType: string]: number;
}

const enquirySchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  message: Yup.string().required("Message is required"),
});
const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
  className = "",
  startingPrice,
  totalPrice,
  onDateChange,
}) => {
  const {
    searchcheckin,
    searchcheckout,
    ContexttotalPrices,
    ContexttotalPrice,
    ContextroomTypeCounts,
    ContexttotalDays,
  } = useSearch();
  const [startDate, setStartDate] = useState<Date | null>(new Date(Date.now()));
  const { user, login } = useAuth();

  const [endDate, setEndDate] = useState<Date | null>(
    new Date(Date.now() + 24 * 60 * 60 * 1000)
  );

  const [guests] = useState<GuestsObject>({
    guestAdults: 1,
    guestChildren: 0,
    guestInfants: 0,
  });

  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  const [totalPrices, setTotalPrices] = useState<TotalPrices>({});

  const [totalDays, setTotalDays] = useState(0);

  const [finalPrice, setFinalPrice] = useState(0);

  const [totalGuests, setTotalGuests] = useState(4);

  const [isOTPNumber, setIsOTPNumber] = useState(false);

  const [isOTPVerified, setIsOTPVerified] = useState(false);

  const [isAnimation, setIsAnimation] = useState(false);

  const { stayId } = useParams();
  const [checkin, setCheckin] = useState(
    new Date(Date.now() + 24 * 60 * 60 * 1000)
  );
  const endDateString = localStorage.getItem("endDate");
  const [checkout, setCheckout] = useState(
    new Date(Date.now() + 48 * 60 * 60 * 1000)
  );

  const handleTotalGuestsChange = (newTotalGuests: any) => {
    setTotalGuests(newTotalGuests);
    console.log("newTotalGuests", newTotalGuests);
  };

  const [loading, setLoading] = useState(false);
  const [enquiryDetails, setEnquiryDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
    itinerary: [],
  });
  const handleEnquiryDetailsChange = (e: any) => {
    const { name, value } = e.target;
    setEnquiryDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (user) {
      setEnquiryDetails(user);
    }
  }, [user]);

  const getUserById = async () => {
    try {
      const res = await axiosInstance.get(`/users/${user.id}`);
      if (res.status === 200) {
        const data = res.data.data;
        console.log(data);
        setEnquiryDetails({ ...enquiryDetails, ...data, itinerary: [] });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user && user.id) {
      getUserById();
    }
  }, [user]);
  
  const [roomTypeCounts] = useState(
    JSON.parse(localStorage.getItem("roomTypeCounts") || "{}")
  );
  const calculateTotalPrice = (
    startDate: Date | any,
    endDate: Date | any,
    impDates: string[],
    prices: Prices,
    blockPrice: number
  ): number => {
    console.log("end", endDate);
    let end = endDate;

    console.log("start", startDate);
    let currentDate = startDate
      ? new Date(startDate).toISOString()
      : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    let totalPrice = 0;
    while (currentDate <= end) {
      if (impDates.includes(currentDate)) {
        console.log(blockPrice);
        totalPrice += blockPrice;
      } else {
        const dayOfWeek = new Intl.DateTimeFormat("en-US", {
          weekday: "long",
        })
          .format(new Date(currentDate))
          .toLowerCase();
        totalPrice += prices[dayOfWeek] || 0;
      }
      const nextDate = new Date(currentDate);
      nextDate.setDate(nextDate.getDate() + 1);
      currentDate = nextDate.toISOString();
    }
    setFinalPrice(totalPrice);
    return totalPrice;
  };

  useEffect(() => {
    setStartDate(searchcheckin);
    setEndDate(searchcheckout);
  }, []);

  const renderSidebar = () => {
    const handleDateChange = (dates: [Date | null, Date | null]) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
      if (onDateChange) {
        onDateChange(dates);
      }
    };

    return (
      <>
        <div className="listingSectionSidebar__wrap shadow-xl">
          {/* PRICE */}
          <span className="text-md font-semibold">Starting</span>
          <div className="flex justify-between">
            <span className="text-3xl font-semibold">
              {startingPrice && `₹ ${startingPrice}`}
              <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
                /night
              </span>
            </span>
          </div>

          <div>
            <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 overflow-hidden z-10">
              <ModalSelectDate
                renderChildren={({ openModal }) => (
                  <button
                    onClick={openModal}
                    className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    type="button"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm text-neutral-400">Date</span>
                      <span className="mt-1.5 text-lg font-semibold">
                        {converSelectedDateToString([startDate, endDate])}
                      </span>
                    </div>
                    <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                  </button>
                )}
                onDateChange={handleDateChange}
              />

              <ModalSelectGuests
                onChange={handleTotalGuestsChange}
                renderChildren={({ openModal }) => (
                  <button
                    type="button"
                    onClick={openModal}
                    className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm text-neutral-400">Guests</span>
                      <span className="mt-1.5 text-lg font-semibold">
                        <span className="line-clamp-1">
                          {`${
                            (guests.guestAdults || 1) +
                            (guests.guestChildren || 0)
                          } Guests, ${guests.guestInfants || 0} Infants`}
                        </span>
                      </span>
                    </div>
                    <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                  </button>
                )}
              />
            </div>
          </div>

          {/* SUM */}
          <div className="flex flex-col space-y-4">
            {Object?.entries(ContexttotalPrices)?.map(
              ([roomType, totalPrice]: [roomType: any, totalPrice: any]) => {
                if (ContextroomTypeCounts[roomType]) {
                  return (
                    <div
                      key={roomType}
                      className="flex justify-between text-neutral-6000 dark:text-neutral-300"
                    >
                      <span>{`${roomType} x ${
                        ContexttotalDays >= 1 ? ContexttotalDays : 0
                      } night x ${
                        ContextroomTypeCounts[roomType] || 0
                      } rooms`}</span>
                      <span className="flex items-center">
                        ₹{totalPrice * (ContextroomTypeCounts[roomType] || 0)}{" "}
                        /-
                      </span>
                    </div>
                  );
                } else {
                  return "";
                }
              }
            )}
            {/* </div> */}
            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
              <span>Service charge</span>
              <span>₹ 0/- </span>
            </div>
            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300"></div>
            <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹ {ContexttotalPrice}</span>
            </div>
          </div>

          {/* SUBMIT */}
          <ButtonPrimary onClick={() => setIsEnquiryModalOpen(true)}>
            Enquiry
          </ButtonPrimary>
          {renderModalEnquiry()}
          {renderOtpNumber()}
          {renderOtpVerification()}
          {renderAnimationModal()}
        </div>
      </>
    );
  };

  // const renderModalEnquiry = () => {
  //   function closeModalEnquiry() {
  //     setIsEnquiryModalOpen(false);
  //   }

  //   function EnquriyOtpNumber() {
  //     setIsEnquiryModalOpen(false);

  //     setIsOTPNumber(true);
  //   }

  //   return (
  //     <Transition appear show={isEnquiryModalOpen} as={Fragment}>
  //       <Dialog
  //         as="div"
  //         className="fixed inset-0 z-50 overflow-y-auto"
  //         onClose={closeModalEnquiry}
  //       >
  //         <div className="min-h-screen px-4 text-center">
  //           <Transition.Child
  //             as={Fragment}
  //             enter="ease-out duration-300"
  //             enterFrom="opacity-0"
  //             enterTo="opacity-100"
  //             leave="ease-in duration-200"
  //             leaveFrom="opacity-100"
  //             leaveTo="opacity-0"
  //           >
  //             <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
  //           </Transition.Child>

  //           <span
  //             className="inline-block h-screen align-middle"
  //             aria-hidden="true"
  //           >
  //             &#8203;
  //           </span>
  //           <Transition.Child
  //             as={Fragment}
  //             enter="ease-out duration-300"
  //             enterFrom="opacity-0 scale-95"
  //             enterTo="opacity-100 scale-100"
  //             leave="ease-in duration-200"
  //             leaveFrom="opacity-100 scale-100"
  //             leaveTo="opacity-0 scale-95"
  //           >
  //             <div className="inline-block py-8 h-auto w-full max-w-xl">
  //               <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
  //                 <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
  //                   <h3
  //                     className="text-lg font-medium leading-6 text-gray-900"
  //                     id="headlessui-dialog-title-70"
  //                   >
  //                     Enquriy Form
  //                   </h3>
  //                   <span className="absolute left-3 top-3">
  //                     <ButtonClose onClick={closeModalEnquiry} />
  //                   </span>
  //                 </div>
  //                 <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
  //                   <form
  //                     className="grid grid-cols-1 gap-6 mt-10 mb-10"
  //                     onSubmit={(e) => e.preventDefault()}
  //                   >
  //                     <label className="block">
  //                       <span className="text-neutral-800 dark:text-neutral-200">
  //                         Name
  //                       </span>
  //                       <Input
  //                         type="email"
  //                         placeholder="Enter Your Name"
  //                         className="mt-1"
  //                       />
  //                     </label>
  //                     <label className="block">
  //                       <span className="text-neutral-800 dark:text-neutral-200">
  //                         Email address
  //                       </span>
  //                       <Input
  //                         type="email"
  //                         placeholder="Enter Your Email"
  //                         className="mt-1"
  //                       />
  //                     </label>
  //                     <label className="block">
  //                       <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
  //                         Mobile Number
  //                       </span>
  //                       <Input
  //                         type="Number"
  //                         className="mt-1"
  //                         placeholder="Enter Your Number"
  //                       />
  //                     </label>

  //                     <ButtonPrimary type="submit" onClick={EnquriyOtpNumber}>
  //                       Send OTP
  //                     </ButtonPrimary>
  //                     {renderOtpNumber()}
  //                   </form>
  //                 </div>
  //               </div>
  //             </div>
  //           </Transition.Child>
  //         </div>
  //       </Dialog>
  //     </Transition>
  //   );
  // };

  const renderModalEnquiry = () => {
    function closeModalEnquiry() {
      setIsEnquiryModalOpen(false);
    }
    const sendEnquiry = async (values: any) => {
      if (ContexttotalPrice === 0) {
        return toast.error("Please select room");
      }
      const details = {
        checkin: new Date(searchcheckin)?.toISOString(),
        checkout: new Date(searchcheckout)?.toISOString(),
        guests: totalGuests,
        propertyId: stayId,
        rooms: JSON.stringify(ContextroomTypeCounts),
        amount: ContexttotalPrice,
        ...values,
      };

      try {
        const res = await axiosInstance.post("/enquiry/createEnquiry", details);
        if (res.status === 200) {
          Swal.fire(
            "Enquiry Submitted",
            "Your enquiry has been submitted successfully",
            "success"
          );
          setIsEnquiryModalOpen(false);
        } else {
          Swal.fire(
            "Enquiry Not Submitted",
            "Your enquiry has not been submitted",
            "error"
          );
          setIsEnquiryModalOpen(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <Transition appear show={isEnquiryModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModalEnquiry}
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
              <div className="inline-block py-8 h-auto w-full max-w-xl">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      Enquriy Form
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalEnquiry} />
                    </span>
                  </div>
                  <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                    <Formik
                      initialValues={enquiryDetails}
                      onSubmit={sendEnquiry}
                      validationSchema={enquirySchema}
                      enableReinitialize={true}
                    >
                      {() => (
                        <Form className="grid grid-cols-1 gap-6 mt-10 mb-10">
                          <label className="block">
                            <span className="text-neutral-800 dark:text-neutral-200">
                              First Name
                            </span>
                            <Field
                              type="text"
                              name="first_name"
                              placeholder="Enter Your First Name"
                              className="mt-1"
                            />
                            <ErrorMessage
                              className="text-rose-500"
                              name="first_name"
                            />
                          </label>
                          <label className="block">
                            <span className="text-neutral-800 dark:text-neutral-200">
                              Last Name
                            </span>
                            <Field
                              type="text"
                              name="last_name"
                              placeholder="Enter Your Last Name"
                              className="mt-1"
                            />
                            <ErrorMessage
                              className="text-rose-500"
                              name="last_name"
                            />
                          </label>
                          <label className="block">
                            <span className="text-neutral-800 dark:text-neutral-200">
                              Email address
                            </span>
                            <Field
                              type="email"
                              name="email"
                              placeholder="Enter Your Email"
                              className="mt-1"
                            />
                            <ErrorMessage
                              className="text-rose-500"
                              name="email"
                            />
                          </label>
                          <label className="block">
                            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                              Mobile Number
                            </span>
                            <Field
                              type="Number"
                              className="mt-1"
                              name="phone"
                              placeholder="Enter Your Number"
                            />
                            <ErrorMessage
                              className="text-rose-500"
                              name="phone"
                            />
                          </label>
                          <label className="block">
                            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                              Message
                            </span>
                            <Field
                              type="text"
                              name="message"
                              className="mt-1"
                              placeholder="Any message to Vendor"
                            />
                            <ErrorMessage
                              className="text-red-200"
                              name="message"
                            />
                          </label>
                          <label>
                            <span
                              className="flex items-center text-neutral-900 dark:text-neutral-200"
                              style={{ fontSize: "20px" }}
                            >
                              Looking for customized{" "}
                              <span
                                style={{
                                  color: "green",
                                  marginLeft: "3px",
                                  marginRight: "5px",
                                }}
                              >
                                {" "}
                                Itinerary
                              </span>
                              <Field
                                type="checkbox"
                                name="itinerary"
                                className="mt-1"
                                value="true"
                                placeholder="Do you require a customized iterary package"
                              />
                            </span>

                            <ErrorMessage
                              className="text-red-200"
                              name="itinerary"
                            />
                          </label>
                          <ButtonPrimary type="submit"> Submit </ButtonPrimary>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  const renderOtpNumber = () => {
    function ClosedModalOTP() {
      setIsOTPNumber(false);
    }

    function OtpGenratorVerified() {
      setIsOTPNumber(false);

      setIsOTPVerified(true);
    }

    return (
      <Transition appear show={isOTPNumber} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={ClosedModalOTP}
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
              <div className="inline-block py-8 h-auto w-full max-w-xl">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      OTP Generator
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={ClosedModalOTP} />
                    </span>
                  </div>
                  <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                    <form
                      className="grid grid-cols-1 gap-6 mt-10 mb-10"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <label className="block">
                        <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                          Mobile Number
                        </span>
                        <Input
                          type="Number"
                          className="mt-3"
                          placeholder="Enter Your Number"
                        />
                      </label>

                      <ButtonPrimary
                        type="submit"
                        onClick={OtpGenratorVerified}
                      >
                        Verify
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

  const renderOtpVerification = () => {
    function ClosedModalVerified() {
      setIsOTPVerified(false);
    }

    function AnimationModal() {
      setIsOTPVerified(false);

      setIsAnimation(true);
    }
    return (
      <Transition appear show={isOTPVerified} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={ClosedModalVerified}
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
                      <ButtonClose onClick={ClosedModalVerified} />
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

                      <ButtonPrimary type="submit" onClick={AnimationModal}>
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

  const renderAnimationModal = () => {
    function ClosedModalAnimation() {
      setIsAnimation(false);
    }
    return (
      <Transition appear show={isAnimation} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={ClosedModalAnimation}
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
                      <ButtonClose onClick={ClosedModalAnimation} />
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

                      <ButtonPrimary
                        type="submit"
                        onClick={ClosedModalAnimation}
                      >
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

  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">Enquriy Details</h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>{renderSidebar()}</div>
      </div>
    );
  };

  return (
    <div className={`nc-CheckOutPagePageMain ${className}`}>
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        {/* <div className="hidden lg:block flex-grow">{renderSidebar()}</div> */}
      </main>
    </div>
  );
};

export default CheckOutPagePageMain;
