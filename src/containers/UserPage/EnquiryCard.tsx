// import React, { FC, useState } from "react";
// import { Link } from "react-router-dom";
// import ButtonPrimary from "shared/Button/ButtonPrimary";
// import ButtonSecondary from "shared/Button/ButtonSecondary";
// import Swal from "sweetalert2";
// import { axiosInstance } from "../../index";

// interface User {
//   id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone: string;
// }
// interface Vendor {
//   id: number;
//   name: string;
// }
// export interface FlightCardProps {
//   className?: string;
//   defaultOpen?: boolean;
//   getBookings?: () => {};
//   getEnquiries: () => {};
//   data: {
//     id: number;
//     userId: number;
//     reference_number: string;
//     propertyId: number;
//     rooms: string;
//     email: string;
//     date: string;
//     checkin: string;
//     checkout: string;
//     time: string;
//     guests: number;
//     amount: number;
//     note: string;
//     status: string;
//     attended: boolean;
//     createdAt: string;
//     updatedAt: string;
//     deletedAt: string | null;
//     property: Property;
//     user: User;
//     message:string;
//     vendorMessage:string
//   };
// }
// interface PropertyMedia {
//   path: string;
//   url: string;
//   file_name: string;
// }

// // Define interface for Property
// interface Property {
//   id: number;
//   title: string;
//   description: string;
//   address: string;
//   property_typeId: number;
//   propertyMedia: PropertyMedia[];
//   featuredPropertyMedia: PropertyMedia;
//   cancellation_policy: string;
//   vendor: Vendor;
//   city:string;
//   locality:string;
// }

// // // Define interface for Booking
// // interface Booking {
// //   id: number;
// //   userId: number;
// //   reference_number: string;
// //   propertyId: number;
// //   rooms: string;
// //   email: string;
// //   date: string;
// //   checkin: string;
// //   checkout: string;
// //   time: string;
// //   guests: number;
// //   amount: number;
// //   note: string;
// //   status: string;
// //   attended: boolean;
// //   createdAt: string;
// //   updatedAt: string;
// //   deletedAt: string | null;
// //   Property: Property;
// //   User:User;
// // }

// const EnquiryCard: FC<FlightCardProps> = ({
//   className = "",
//   data,
//   getEnquiries,
//   defaultOpen = false,
// }) => {
//   console.log(data);
//   const [isOpen, setIsOpen] = useState(false);
//   const cancelEnquiry = async () => {
//     const swalWithBootstrapButtons = Swal.mixin({
//       customClass: {
//         confirmButton: "btn btn-success",
//         cancelButton: "btn btn-danger",
//       },
//       buttonsStyling: true,
//     });

//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#A47557",
//       cancelButtonColor: "#68391B",
//       confirmButtonText: "Yes,I want to Cancel it!",
//       cancelButtonText: "No,Don't cancel!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const id = data.id;
//           const values = { status: "Cancelled" };
//           const response = await axiosInstance.put(`/enquiry/${id}`, values, {
//             withCredentials: true,
//           });

//           if (response.status === 200) {
//             Swal.fire({
//               title: "Cancelled!",
//               text: "Your Enquiry has been cancelled.",
//               icon: "success",
//             });
//             getEnquiries();
//           }
//         } catch (error: any) {
//           Swal.fire({
//             title: "Cancelled!",
//             text: error.message,
//             icon: "error",
//             showCancelButton: false,
//             showConfirmButton: false,
//             timer: 700,
//           });
//           console.log(error);
//         }
//       } else if (result.dismiss === Swal.DismissReason.cancel) {
//         Swal.fire({
//           title: "Cancelled",
//           text: "Your Booking Enquiry is safe",
//           icon: "error",
//           showConfirmButton: false,
//           timer: 700,
//         });
//       }
//     });
//   };
//   const renderDetail = () => {
//     if (!isOpen) return null;
//     const innerParse=JSON.parse(data.rooms);
//     const rooms=JSON.parse(data.rooms);
//     return (
//       <div>
//         <div className="listingSection__wrap">
//           {/* HEADING */}
//           <div className="flex flex-wrap justify-between">
//             <div>
//               <h2 className="text-2xl font-semibold">
//                 Enquiry Details{" " + data.id}
//               </h2>
//               <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mt-3" />
//             </div>
//             {data.status === "Cancelled" ? (
//               <div className="py-5 sm:px-5 space-y-5">
//                 <span className="inline-block bg-yellow-200 text-yellow-800 text-xs font-semibold px-3 py-3 rounded-full">
//                   Cancelled
//                 </span>
//               </div>
//             ) : data.status === "Rejected" ? (
//               <div className="py-5 sm:px-5 space-y-5">
//                 <span className="inline-block bg-red-200 text-red-800 text-xs font-semibold px-3 py-3 rounded-full">
//                   Rejected
//                 </span>
//               </div>
//             ) : (
//               ""
//             )}

//             {data.status !== "Cancelled" && (
//               <div className="flex items-center">
//                 <ButtonSecondary
//                   className="me-5"
//                   onClick={() => cancelEnquiry()}
//                 >
//                   Cancel
//                 </ButtonSecondary>
//               </div>
//             )}
//           </div>

//           {/* CONTENT */}
//           <div>
//             <h4 className="text-lg font-semibold">Guest Name</h4>
//             <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
//               <span>
//                 {data?.user?.first_name + " " + data?.user?.last_name}
//               </span>
//             </span>
//           </div>

//           <div>
//             <h4 className="text-lg font-semibold">Rooms</h4>
//             <span className="block mt-3 text-neutral-500 dark:text-neutral-400 max-w-md text-sm sm:text-base">
//               {Object?.entries(rooms)?.map(
//                 ([key, value]: [any, any], index: number) => {
//                   return (
//                     <div
//                       key={key}
//                       className={`flex space-x-10 justify-between p-3 rounded-lg mb-3 ${
//                         index % 2 === 0 ? "bg-grey dark:bg-grey" : ""
//                       }`}
//                     >
//                       <span>{key}</span>
//                       <span>{value}</span>
//                     </div>
//                   );
//                 }
//               )}
//             </span>
//           </div>

//           <div className="flex flex-wrap lg:hidden justify-between">
//             <div>
//               <h4 className="text-lg font-semibold">Dates</h4>
//               <div className="mt-3 text-neutral-500 dark:text-neutral-400 w-auto text-sm sm:text-base">
//                 <div className="flex space-x-10 justify-between p-3 bg-grey dark:bg-grey rounded-lg mb-3">
//                   <span>Checkin</span>
//                   <span>{(data?.checkin).split("T")[0]}</span>
//                 </div>
//                 <div className="flex space-x-10 justify-between p-3">
//                   <span>Checkout</span>
//                   <span>{(data?.checkout).split("T")[0]}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-wrap lg:hidden justify-between">
//             <div>
//               <h4 className="text-lg font-semibold">Guests</h4>
//               <div className="mt-3 text-neutral-500 dark:text-neutral-400 w-auto text-sm sm:text-base">
//                 <div className="flex space-x-10 justify-between p-3 bg-grey dark:bg-grey rounded-lg mb-3">
//                   <span>Guests</span>
//                   <span>{data?.guests}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-wrap justify-between">
//             <div>
//               <h4 className="text-lg font-semibold">Messages</h4>
//               <div className="mt-3 text-neutral-500 dark:text-neutral-400 w-auto text-sm sm:text-base">
//                 <div className="flex space-x-10 justify-between p-3 bg-grey dark:bg-grey rounded-lg mb-3">
//                   <span>Your Message to Vendor : </span>
//                   <span>{data?.message}</span>
//                 </div>
//                 <div className="flex space-x-10 justify-between p-3">
//                   <span>Message from Vendor : </span>
//                   <span>{data?.vendorMessage || " "}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-wrap lg:hidden justify-between">
//             <div className="text-lg font-semibold">Status</div>
//             {data?.status === "Pending" ? (
//               <span className="inline-block bg-violet-200 text-violet-800 text-md px-1 py-1 rounded-md">
//                 Pending
//               </span>
//             ) : data?.status === "Rejected" ? (
//               <span className="inline-block bg-red-200 text-red-800 text-md px-1 py-1 rounded-md">
//                 Rejected
//               </span>
//             ) : data?.status === "Accepted" ? (
//               <span className="inline-block bg-green-200 text-green-800 text-md px-1 py-1 rounded-md">
//                 Accepted
//               </span>
//             ) : data?.status === "Revised" ? (
//               <span className="inline-block bg-orange-200 text-orange-800 text-md px-1 py-1 rounded-md">
//                 Revised
//               </span>
//             ) : (
//               <span className="inline-block bg-yellow-200 text-yellow-800 text-md px-1 py-1 rounded-md">
//                 Cancelled
//               </span>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div
//       className={`nc-FlightCardgroup p-4 sm:p-6 relative bg-neutral  dark:bg-neutral-900 border border-brown
//      dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow space-y-6 ${className}`}
//       data-nc-id="FlightCard"
//     >
//       <div
//         className={` sm:pr-20 relative  ${className}`}
//         data-nc-id="FlightCard"
//       >
//         {/*  eslint-disable-next-line jsx-a11y/anchor-has-content */}
//         <a href="##" className="absolute inset-0" />

//         <span
//           className={`absolute right-0 bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 w-10 h-10 bg-neutral-50 dark:bg-neutral-800 rounded-full flex items-center justify-center cursor-pointer ${
//             isOpen ? "transform -rotate-180" : ""
//           }`}
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <i className="text-xl las la-angle-down"></i>
//         </span>

//         <div className="flex  flex-col sm:flex-row sm:items-center space-y-6 sm:space-y-0">
//           {/* LOGO IMG */}
//           <div className="w-24 lg:w-32 flex-shrink-0">
//             <img
//               src={data?.property?.featuredPropertyMedia?.path}
//               className="w-5/6 rounded-sm"
//               alt="Property"
//             />
//           </div>

//           {/* FOR MOBILE RESPONSIVE */}
//           <div className="block lg:hidden space-y-1 flex-1">
//             <div className="flex font-semibold">
//               <span>{data?.property?.title}</span>
//             </div>
//             <div className="text-sm text-neutral-500 font-normal mt-0.5">
//               {data?.property?.locality + ", " + data?.property?.city}
//             </div>
//           </div>

//           {/* TIME - NAME */}
//           <div className="hidden lg:block min-w-[150px] flex-1">
//             <div className="font-medium text-lg">{data?.property?.title}</div>
//             <div className="text-sm text-neutral-500 font-normal mt-0.5">
//               {data?.property?.locality + ", " + data?.property?.city}
//             </div>
//           </div>

//           {/* TIMME */}
//           <div className="hidden lg:block flex-1 whitespace-nowrap">
//             <div className="font-medium text-lg">
//               {new Date(data.checkin).toLocaleDateString("en-US", {
//                 month: "short",
//                 day: "numeric",
//               })}{" "}
//               -{" "}
//               {new Date(data.checkout).toLocaleDateString("en-US", {
//                 month: "short",
//                 day: "numeric",
//               })}
//             </div>
//             <div className="text-sm text-neutral-500 font-normal mt-0.5">
//               Check in - Check out
//             </div>
//           </div>

//           {/* TYPE */}
//           <div className="hidden lg:block flex-1 whitespace-nowrap">
//             <div className="font-medium text-lg">{data.guests}</div>
//             <div className="text-sm text-neutral-500 font-normal mt-0.5">
//               Guests
//             </div>
//           </div>
//           <div className="hidden lg:block flex-1 whitespace-nowrap">
//             {data?.status === "Pending" ? (
//               <span className="inline-block bg-violet-200 text-violet-800 text-md px-1 py-1 rounded-md">
//                 Pending
//               </span>
//             ) : data?.status === "Rejected" ? (
//               <span className="inline-block bg-red-200 text-red-800 text-md px-1 py-1 rounded-md">
//                 Rejected
//               </span>
//             ) : data?.status === "Accepted" ? (
//               <span className="inline-block bg-green-200 text-green-800 text-md px-1 py-1 rounded-md">
//                 Accepted
//               </span>
//             ) : data?.status === "Revised" ? (
//               <span className="inline-block bg-orange-200 text-orange-800 text-md px-1 py-1 rounded-md">
//                 Revised
//               </span>
//             ) : (
//               <span className="inline-block bg-yellow-200 text-yellow-800 text-md px-1 py-1 rounded-md">
//                 Cancelled
//               </span>
//             )}
//             <div className="text-sm text-neutral-500 font-normal mt-0.5">
//               Status
//             </div>
//           </div>

//           <div className="flex-1 whitespace-nowrap sm:text-right">
//             <div>
//               <span className="text-xl font-semibold text-secondary-6000">
//                 {data.amount}
//               </span>
//             </div>
//             <div className="text-xs sm:text-sm text-neutral-500 font-normal mt-1">
//               <Link to={`/listing-stay-detail/${data.property.id}`}>
//                 View Property
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* DETAIL */}
//       {renderDetail()}
//     </div>
//   );
// };

// export default EnquiryCard;

import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Swal from "sweetalert2";
import { axiosInstance } from "../../index";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}
interface Vendor {
  id: number;
  name: string;
}
export interface FlightCardProps {
  className?: string;
  defaultOpen?: boolean;
  getBookings?: () => {};
  getEnquiries: () => {};
  data: {
    id: number;
    userId: number;
    reference_number: string;
    propertyId: number;
    rooms: string;
    email: string;
    date: string;
    checkin: string;
    checkout: string;
    time: string;
    guests: number;
    amount: number;
    note: string;
    status: string;
    attended: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    property: Property;
    user: User;
    message: string;
    vendorMessage: string;
  };
}
interface PropertyMedia {
  path: string;
  url: string;
  file_name: string;
}

// Define interface for Property
interface Property {
  id: number;
  title: string;
  description: string;
  address: string;
  property_typeId: number;
  propertyMedia: PropertyMedia[];
  featuredPropertyMedia: PropertyMedia;
  cancellation_policy: string;
  vendor: Vendor;
  city: string;
  locality: string;
}

// // Define interface for Booking
// interface Booking {
//   id: number;
//   userId: number;
//   reference_number: string;
//   propertyId: number;
//   rooms: string;
//   email: string;
//   date: string;
//   checkin: string;
//   checkout: string;
//   time: string;
//   guests: number;
//   amount: number;
//   note: string;
//   status: string;
//   attended: boolean;
//   createdAt: string;
//   updatedAt: string;
//   deletedAt: string | null;
//   Property: Property;
//   User:User;
// }

const EnquiryCard: FC<FlightCardProps> = ({
  className = "",
  data,
  getEnquiries,
  defaultOpen = false,
}) => {
  console.log(data);
  const [isOpen, setIsOpen] = useState(false);
  const cancelEnquiry = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#A47557",
      cancelButtonColor: "#68391B",
      confirmButtonText: "Yes,I want to Cancel it!",
      cancelButtonText: "No,Don't cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const id = data.id;
          const values = { status: "Cancelled" };
          const response = await axiosInstance.put(`/enquiry/${id}`, values, {
            withCredentials: true,
          });

          if (response.status === 200) {
            Swal.fire({
              title: "Cancelled!",
              text: "Your Enquiry has been cancelled.",
              icon: "success",
            });
            getEnquiries();
          }
        } catch (error: any) {
          Swal.fire({
            title: "Cancelled!",
            text: error.message,
            icon: "error",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 700,
          });
          console.log(error);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Your Booking Enquiry is safe",
          icon: "error",
          showConfirmButton: false,
          timer: 700,
        });
      }
    });
  };
  const renderDetail = () => {
    if (!isOpen) return null;
    const innerParse = JSON.parse(data.rooms);
    const rooms = JSON.parse(innerParse);
    return (
      <div>
        <div className="listingSection__wrap">
          {/* HEADING */}
          <div className="flex flex-wrap justify-between">
            <div>
              <h2 className="text-2xl font-semibold">
                Enquiry Details{" " + data.id}
              </h2>
              <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mt-3" />
            </div>
            {data.status === "Cancelled" ? (
              <div className="py-5 sm:px-5 space-y-5">
                <span className="inline-block bg-yellow-200 text-yellow-800 text-xs font-semibold px-3 py-3 rounded-full">
                  Cancelled
                </span>
              </div>
            ) : data.status === "Rejected" ? (
              <div className="py-5 sm:px-5 space-y-5">
                <span className="inline-block bg-red-200 text-red-800 text-xs font-semibold px-3 py-3 rounded-full">
                  Rejected
                </span>
              </div>
            ) : (
              ""
            )}

            {data.status !== "Cancelled" && (
              <div className="flex items-center">
                <ButtonSecondary
                  className="me-5"
                  onClick={() => cancelEnquiry()}
                >
                  Cancel
                </ButtonSecondary>
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div>
            <h4 className="text-lg font-semibold">Guest Name</h4>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              <span>
                {data?.user?.first_name + " " + data?.user?.last_name}
              </span>
            </span>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Rooms</h4>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400 max-w-md text-sm sm:text-base">
              {Object?.entries(rooms)?.map(
                ([key, value]: [any, any], index: number) => {
                  return (
                    <div
                      key={key}
                      className={`flex space-x-10 justify-between p-3 rounded-lg mb-3 bg-grey dark:bg-grey`}
                    >
                      <span>{key}</span>
                      <span>{value}</span>
                    </div>
                  );
                }
              )}
            </span>
          </div>

          <div className="flex flex-wrap justify-between">
            <div>
              <h4 className="text-lg font-semibold">Messages</h4>
              <div className="mt-3 text-neutral-500 dark:text-neutral-400 w-auto text-sm sm:text-base">
                <div className="flex space-x-10 justify-between p-3 bg-grey dark:bg-grey rounded-lg mb-3">
                  <span>Your Message to Vendor : </span>
                  <span>{data?.message}</span>
                </div>
                <div className="flex space-x-10 justify-between p-3">
                  <span>Message from Vendor : </span>
                  <span>{data?.vendorMessage || " "}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-FlightCardgroup p-4 sm:p-6 relative bg-neutral  dark:bg-neutral-900 border border-brown
     dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow space-y-6 ${className}`}
      data-nc-id="FlightCard"
    >
      <div
        className={` sm:pr-20 relative  ${className}`}
        data-nc-id="FlightCard"
      >
        {/*  eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a href="##" className="absolute inset-0" />

        <span
          className={`absolute right-0 bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 w-10 h-10 bg-neutral-50 dark:bg-neutral-800 rounded-full flex items-center justify-center cursor-pointer ${
            isOpen ? "transform -rotate-180" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className="text-xl las la-angle-down"></i>
        </span>

        <div className="flex  flex-col sm:flex-row sm:items-center space-y-6 sm:space-y-0">
          {/* LOGO IMG */}
          <div className="w-24 lg:w-32 flex-shrink-0">
            <img
              src={data?.property?.featuredPropertyMedia?.path}
              className="w-5/6 rounded-sm"
              alt="Property"
            />
          </div>

          {/* FOR MOBILE RESPONSIVE */}
          <div className="block lg:hidden space-y-1 flex-1">
            <div className="flex font-semibold">
              <span>{data?.property?.title}</span>
              <span className="flex items-center text-sm text-neutral-500 font-normal mt-0.5">
                HND
              </span>
            </div>
          </div>

          {/* TIME - NAME */}
          <div className="hidden lg:block min-w-[150px] flex-1">
            <div className="font-medium text-lg">{data.property.title}</div>
            <div className="text-sm text-neutral-500 font-normal mt-0.5">
              {data.property?.locality + ", " + data.property?.city}
            </div>
          </div>

          {/* TIMME */}
          <div className="hidden lg:block flex-1 whitespace-nowrap">
            <div className="font-medium text-lg">
              {new Date(data.checkin).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}{" "}
              -{" "}
              {new Date(data.checkout).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>
            <div className="text-sm text-neutral-500 font-normal mt-0.5">
              Check in - Check out
            </div>
          </div>

          {/* TYPE */}
          <div className="hidden lg:block flex-1 whitespace-nowrap">
            <div className="font-medium text-lg">{data.guests}</div>
            <div className="text-sm text-neutral-500 font-normal mt-0.5">
              Guests
            </div>
          </div>
          <div className="hidden lg:block flex-1 whitespace-nowrap">
            {data?.status === "Pending" ? (
              <span className="inline-block bg-violet-200 text-violet-800 text-md px-1 py-1 rounded-md">
                Pending
              </span>
            ) : data?.status === "Rejected" ? (
              <span className="inline-block bg-red-200 text-red-800 text-md px-1 py-1 rounded-md">
                Rejected
              </span>
            ) : data?.status === "Accepted" ? (
              <span className="inline-block bg-green-200 text-green-800 text-md px-1 py-1 rounded-md">
                Accepted
              </span>
            ) : data?.status === "Revised" ? (
              <span className="inline-block bg-orange-200 text-orange-800 text-md px-1 py-1 rounded-md">
                Revised
              </span>
            ) : (
              <span className="inline-block bg-yellow-200 text-yellow-800 text-md px-1 py-1 rounded-md">
                Cancelled
              </span>
            )}
            <div className="text-sm text-neutral-500 font-normal mt-0.5">
              Status
            </div>
          </div>

          <div className="flex-1 whitespace-nowrap sm:text-right">
            <div>
              <span className="text-xl font-semibold text-secondary-6000">
                {data.amount}
              </span>
            </div>
            <div className="text-xs sm:text-sm text-neutral-500 font-normal mt-1">
              <Link to={`/listing-stay-detail/${data.property.id}`}>
                View Property
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* DETAIL */}
      {renderDetail()}
    </div>
  );
};

export default EnquiryCard;
