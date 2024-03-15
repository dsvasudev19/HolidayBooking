// import { Helmet } from "react-helmet";
// import UserLayout from "./UserLayout";
// import { FC, Fragment, useEffect, useState } from "react";

// import ButtonSecondary from "shared/Button/ButtonSecondary";
// import { Dialog, Transition } from "@headlessui/react";
// import ButtonClose from "shared/ButtonClose/ButtonClose";
// // import { GuestsObject } from "components/HeroSearchForm/type";
// import ModalSelectDate from "components/ModalSelectDate";
// import ModalSelectGuests from "components/ModalSelectGuests";
// import { CalendarIcon, UserPlusIcon } from "@heroicons/react/24/outline";
// import ButtonPrimary from "shared/Button/ButtonPrimary";
// import Textarea from "shared/Textarea/Textarea";
// import { useAuth } from "../../AuthContext";

// import { axiosInstance } from "../../index";
// import Swal from "sweetalert2";
// export interface EnquriyPageProps {
//   className?: string;
// }
// interface Vendor {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
// }
// interface Media {
//   path: string;
//   url: string;
//   file_name: string;
// }
// interface User {
//   id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   gender: string;
//   dob: string;
//   location: string;
//   password: string;
//   phone: string;
//   createdAt: string;
//   updatedAt: string;
//   deletedAt: string | null;
// }
// interface Property {
//   id: number;
//   property_typeId: number;
//   vendorId: number;
//   title: string;
//   slug: string;
//   description: string;
//   about: string | null;
//   address: string;
//   city: string;
//   state: string;
//   country: string;
//   email: string;
//   phone: string;
//   status: number;
//   checkin: string;
//   checkout: string;
//   cancellation_policy: string;
//   special_note: string;
//   position: string;
//   createdAt: string;
//   updatedAt: string;
//   deletedAt: string | null;
//   featuredPropertyMedia: Media;
// }
// export interface Enquiry {
//   id: number;
//   userId: number;
//   propertyId: number;
//   rooms: string;
//   checkin: string;
//   checkout: string;
//   guests: number;
//   message: string;
//   vendorMessage:string;
//   amount: number | null;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
//   deletedAt: string | null;
//   user: User;
//   property: Property;
//   vendor: Vendor;
// }
// const EnquriyPage: FC<EnquriyPageProps> = ({ className = "" }) => {
//   const [modalIndex, setModalIndex] = useState<number>(0);
//   // const [startDate] = useState<Date | null>(new Date("2023/02/06"));
//   // const [endDate] = useState<Date | null>(new Date("2023/02/23"));
//   const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
//   const [isBookingModal, setisBookingModal] = useState(false);
//   const { user, loading } = useAuth();

//   function openModalBooking() {
//     setisBookingModal(true);
//   }

//   const handleGuestsChange = (value: number) => {
//     console.log(value);
//   };

//   function closeModalBooking() {
//     setisBookingModal(false);
//   }

//   const getEnquiries = async () => {
//     try {
//       const response = await axiosInstance.get(`/enquiry/${user?.id}`, {
//         withCredentials: true,
//       });

//       if (response.status === 200) {
//         const data: Enquiry[] = response.data.data;
//         setEnquiries(data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     if (!loading && user) {
//       getEnquiries();
//     }
//   }, [user, loading]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   const idSetter = (id: number) => {
//     setModalIndex((prevIndex) => {
//       const newIndex = id;
//       console.log(newIndex);
//       return newIndex;
//     });
//   };
//   const cancelEnquiry = async () => {
//     const swalWithBootstrapButtons = Swal.mixin({
//       customClass: {
//         confirmButton: "btn btn-success",
//         cancelButton: "btn btn-danger",
//       },
//       buttonsStyling: true,
//     });
    
//       Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#A47557",
//         cancelButtonColor: "#68391B",
//         confirmButtonText: "Yes,I want to Cancel it!",
//         cancelButtonText: "No,Don't cancel!",
//       }).then(async (result) => {
//         if (result.isConfirmed) {
//           try {
//             const id = enquiries[modalIndex].id;
//             const values = { status: "Cancelled" };
//             const response = await axiosInstance.put(`/enquiry/${id}`, values, {
//               withCredentials: true,
//             });

//             if (response.status === 200) {
//               Swal.fire({
//                 title: "Cancelled!",
//                 text: "Your Enquiry has been cancelled.",
//                 icon: "success",
//               });
//               getEnquiries();
//             }
//           } catch (error: any) {
//             Swal.fire({
//               title: "Cancelled!",
//               text: error.message,
//               icon: "error",
//               showCancelButton: false,
//               showConfirmButton: false,
//               timer: 700,
//             });
//             console.log(error);
//           }
//         } else if (result.dismiss === Swal.DismissReason.cancel) {
//           Swal.fire({
//             title: "Cancelled",
//             text: "Your Booking Enquiry is safe",
//             icon: "error",
//             showConfirmButton: false,
//             timer:700
//           });
//         }
//       });
//   };
//   const acceptEnquiry = async () => {
//     try {
//       const id = enquiries[modalIndex].id;

//       const response = await axiosInstance.put(
//         `/enquiry/accept/${id}`,

//         { withCredentials: true }
//       );

//       if (response.status === 200) {
//         Swal.fire(
//           "Accepted!",
//           "Your Enquiry has been Accepted You can find it in Bookings Page",
//           "success"
//         );
//         getEnquiries();
//       }
//     } catch (error: any) {
//       console.log(error);
//       Swal.fire("Error!", error.message, "error");
//     }
//   };
//   const renderBokkingModal = () => {
//     return (
//       <Transition appear show={isBookingModal} as={Fragment}>
//         <Dialog
//           as="div"
//           className="fixed inset-0 z-50 overflow-y-auto"
//           onClose={closeModalBooking}
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
//                       Booking Details
//                     </h3>
//                     <span className="absolute left-3 top-3">
//                       <ButtonClose onClick={closeModalBooking} />
//                     </span>
//                   </div>
//                   <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
//                     <form
//                       className="grid grid-cols-1 gap-6 mt-10 mb-10"
//                       onSubmit={(e) => e.preventDefault()}
//                     >
//                       <div className="flex justify-between font-semibold">
//                         <span>Status of Enquiry</span>
//                         <span className="badge btn-light-success">
//                           {enquiries[modalIndex].status}
//                         </span>
//                       </div>
//                       <div className="flex justify-between font-semibold">
//                         <span>Final Price</span>
//                         <span>{enquiries[modalIndex].amount}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="font-semibold">
//                           Your Message to Vendor -{" "}
//                         </span>
//                         <span>{enquiries[modalIndex].message}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="font-semibold">
//                           Message from Vendor -{" "}
//                         </span>
//                         <span>{enquiries[modalIndex].vendorMessage}</span>
//                       </div>
//                       <div className="mt-3 text-end">
//                         {enquiries[modalIndex].status === "Pending" && (
//                           <ButtonSecondary
//                             className="me-5"
//                             onClick={() => {
//                               closeModalBooking();
//                               cancelEnquiry();
//                             }}
//                           >
//                             Cancel Request
//                           </ButtonSecondary>
//                         )}
//                         {enquiries[modalIndex].status === "Accepted" && (
//                           <ButtonSecondary
//                             className="me-5"
//                             onClick={() => {
//                               closeModalBooking();
//                               cancelEnquiry();
//                             }}
//                           >
//                             Reject
//                           </ButtonSecondary>
//                         )}
//                       </div>
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

//   return (
//     <div className={`nc-EnquriyPage ${className} p-3`} data-nc-id="EnquriyPage">
//       <Helmet>
//         <title>Solitary Holidays || ENQUIRY</title>
//       </Helmet>
//       <UserLayout>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4"></div>

//         {enquiries.map((enquiry, index) => {
//           const rooms=JSON.parse(enquiry.rooms);
//           return (
//             <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 bg-grey space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8 mb-10 ms-3 px-4">
//               <div className="flex flex-col sm:flex-row sm:items-center space-x-4">
//                 <div className="flex-shrink-0 w-full sm:w-40">
//                   <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
//                     <img
//                       alt=""
//                       className="absolute inset-0 object-cover"
//                       sizes="200px"
//                       src={enquiry.property.featuredPropertyMedia.path}
//                     />
//                   </div>
//                 </div>

//                 <div className="py-5 sm:px-5 space-y-3 me-5">
//                   <div>
//                     <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
//                       {enquiry.property.property_typeId === 1
//                         ? "Hotel"
//                         : "Resort"}
//                     </span>
//                     <span className="text-2xl font-bold mt-1 block w-40">
//                       {enquiry.property.title}
//                     </span>
//                   </div>
//                   <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
//                     {
//                       Object.entries(rooms).map(([key, value]:[any,any]) => (
//                         <div key={key} className="flex justify-between">
//                           <span>{key}{"-"}{value}</span>
//                         </div>
//                       ))
//                     }
//                   </span>
//                 </div>

//                 <div className="flex-shrink-0 w-full sm:w-60">
//                   <ModalSelectDate
//                     renderChildren={() => (
//                       <button
//                         className="text-left flex-1 p-5 flex justify-between space-x-5"
//                         type="button"
//                       >
//                         <div className="flex items-center">
//                           <div className="text-neutral-300 dark:text-neutral-400">
//                             <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
//                           </div>
//                           <div className="ml-3">
//                             <span className="text-lg font-semibold">
//                               {new Date(
//                                 new Date(enquiry.checkin).getTime()
//                               ).toLocaleDateString("en-US", {
//                                 month: "short",
//                                 day: "numeric",
//                               })}
//                               {" - "}
//                               {new Date(
//                                 new Date(enquiry.checkout).getTime()
//                               ).toLocaleDateString("en-US", {
//                                 month: "short",
//                                 day: "numeric",
//                               })}
//                             </span>
//                             <span className="block text-sm text-neutral-400">
//                               Check in - Check out
//                             </span>
//                           </div>
//                         </div>
//                       </button>
//                     )}
//                   />
//                 </div>

//                 <div className="flex-shrink-0 w-full sm:w-80">
//                   <ModalSelectGuests
//                     onChange={handleGuestsChange}
//                     renderChildren={() => (
//                       <button
//                         type="button"
//                         className="text-left flex-1 p-5 flex justify-between space-x-5"
//                       >
//                         <div className="flex flex-row items-center">
//                           <div className="text-neutral-300 dark:text-neutral-400">
//                             <UserPlusIcon className="w-5 h-5 lg:w-7 lg:h-7" />
//                           </div>
//                           <div className="ml-5">
//                             <span className="text-lg font-semibold line-clamp-">
//                               {`${enquiry.guests} Guests`}
//                             </span>
//                             <span className="block text-sm text-neutral-400">
//                               Guests
//                             </span>
//                           </div>
//                         </div>
//                       </button>
//                     )}
//                   />
//                 </div>

//                 <div className="flex-shrink-0">
//                   <div>
//                     <span className="text-large font-semibold mt-3">
//                       {`${Math.ceil(
//                         (Number(new Date(enquiry.checkout)) -
//                           Number(new Date(enquiry.checkin))) /
//                           (24 * 60 * 60 * 1000)
//                       )} days - ${Math.ceil(
//                         (Number(new Date(enquiry.checkout)) -
//                           Number(new Date(enquiry.checkin))) /
//                           (24 * 60 * 60 * 1000)
//                       )} nights`}
//                     </span>
//                     <span className="mt-2 block  text-sm text-neutral-400 dark:text-neutral-400">
//                       No Of Nights
//                     </span>
//                   </div>
//                 </div>

//                 <div className="py-5 sm:px-3 space-y-5 px-10">
//                   {enquiry.status === "Cancelled" ? (
//                     <div className="py-5 sm:px-5 space-y-5">
//                       <span className="inline-block bg-yellow-200 text-yellow-800 text-xs font-semibold px-3 py-3 rounded-full">
//                         Cancelled
//                       </span>
//                     </div>
//                   ) : enquiry.status === "Rejected" ? (
//                     <div className="py-5 sm:px-5 space-y-5">
//                       <span className="inline-block bg-red-200 text-red-800 text-xs font-semibold px-3 py-3 rounded-full">
//                         Rejected
//                       </span>
//                     </div>
//                   ) : (
//                     <ButtonSecondary
//                       onClick={() => {
//                         openModalBooking();
//                         idSetter(index);
//                       }}
//                     >
//                       Action
//                     </ButtonSecondary>
//                   )}
//                 </div>
//                 {renderBokkingModal()}
//               </div>
//             </div>
//           );
//         })}

    
//       </UserLayout>
//     </div>
//   );
// };

// export default EnquriyPage;

import { Helmet } from "react-helmet";
import UserLayout from "./UserLayout";
import { FC, useEffect, useState } from "react";

import ButtonPrimary from "shared/Button/ButtonPrimary";
import FlightCard from "components/FlightCard/FlightCard";
import EnquiryCard from './EnquiryCard'
import {useAuth} from '../../AuthContext'
import { axiosInstance } from "../../index";


export interface BookingsPageProps {
  className?: string;
}

const EnquriyPage: FC<BookingsPageProps> = ({ className = "" }) => {
  const { user, loading } = useAuth();
  // const [modalIndex, setModalIndex] = useState(0);
  const [enquiries, setEnquiries] = useState([]);
  console.log(user?.id);

    const getEnquiries = async () => {
      try {
        const response = await axiosInstance.get(`/enquiry/${user?.id}`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          const data = response.data.data;
          setEnquiries(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
  useEffect(() => {
    if (!loading && user) {
      getEnquiries();
    }
  }, [loading, user]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={`nc-BookingsPage ${className}`} data-nc-id="BookingsPage">
      <Helmet>
        <title>Solitary Holidays || Settings</title>
      </Helmet>
      <UserLayout>
        <div
          className={`nc-SectionGridFilterCard ${className}`}
          data-nc-id="SectionGridFilterCard"
        >
          <div className="lg:p-10 lg:bg-neutral-50 lg:dark:bg-black/20 grid grid-cols-1 gap-6  rounded-3xl">
            {enquiries.map((item, index) => (
              <EnquiryCard
                defaultOpen={!index}
                key={index}
                data={item}
                getEnquiries={getEnquiries}
                getBookings={getEnquiries}
              />
            ))}

            <div className="flex mt-12 justify-center items-center">
              <ButtonPrimary>Show more</ButtonPrimary>
            </div>
          </div>
        </div>
      </UserLayout>
    </div>
  );
};

export default EnquriyPage;

