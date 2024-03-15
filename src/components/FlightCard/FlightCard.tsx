import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Swal from "sweetalert2";
import { axiosInstance } from "../../index";
import { IndianRupee } from "lucide-react";

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
  phone: any;
}
export interface FlightCardProps {
  className?: string;
  defaultOpen?: boolean;
  getBookings: () => {};
  data: {
    id: number;
    userId: number;
    reference_number: string;
    propertyId: number;
    rooms: any;
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
    Property: Property;
    user: User;
    firstName:string;
    lastName:string;
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
  locality:string;
  city:string;
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

const FlightCard: FC<FlightCardProps> = ({
  className = "",
  data,
  getBookings,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const cancelBooking = async (id: any) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#A47557",
        cancelButtonColor: "#68391B",
        confirmButtonText: "Yes,I want to Cancel it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            //  const id = bookings[modalIndex].id;
            // const values = { status: "Cancelled" };
            const response = await axiosInstance.put(`/bookings/cancel/${id}`, {
              withCredentials: true,
            });

            if (response.status === 200) {
              swalWithBootstrapButtons.fire({
                title: "Submitted",
                text: "Your Cancellation request sent Successfully.",
                icon: "success",
                confirmButtonColor: "#68391B",
              });
              getBookings();
            }
          } catch (error: any) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled!",
              text: error.message,
              icon: "error",
              showConfirmButton: false,
              timer: 700,
            });
            console.log(error);
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your Booking is safe :)",
            icon: "error",
            showConfirmButton: false,
            timer: 700,
          });
        }
      });
  };

  const renderDetail = () => {
    if (!isOpen) return null;
    const innerParse=JSON.parse(data.rooms);
    // const rooms=JSON.parse(innerParse);
    const rooms=innerParse;
    console.log(data);
    return (
      <div>
        <div className="listingSection__wrap">
          {/* HEADING */}
          <div className="flex flex-wrap justify-between">
            <div>
              <h2 className="text-2xl font-semibold">
                Booking Details{" " + data.reference_number}
              </h2>
              <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mt-3" />
            </div>

            {data.status !== "Cancelled" &&
              data.status !== "Rejected" &&
              data.status !== "Pending" && (
                <div className="flex items-center">
                  {/* Move buttons to the right */}
                  <ButtonSecondary
                    className="me-5"
                    onClick={() => cancelBooking(data.id)}
                  >
                    Cancel Booking
                  </ButtonSecondary>
                </div>
              )}
          </div>

          <div>
            <h4 className="text-lg font-semibold">Vendor Details</h4>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              <span>{data.Property.vendor?.name}</span>
            </span>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              <span>+91 {data.Property.vendor?.phone}</span>
            </span>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Guest Name</h4>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              <span>{data?.firstName + " " + data?.lastName}</span>
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
                      className={`flex space-x-10 justify-between p-3 rounded-lg mb-3 ${
                        index % 2 === 0 ? "bg-grey dark:bg-grey" : ""
                      }`}
                    >
                      <span>{key}</span>
                      <span>{value}</span>
                    </div>
                  );
                }
              )}
            </span>
          </div>
          <div className="flex flex-wrap lg:hidden justify-between">
            <div>
              <h4 className="text-lg font-semibold">Attend Status</h4>
              <div className="mt-3 text-neutral-500 dark:text-neutral-400 w-auto text-sm sm:text-base">
                {data?.attended === true ? (
                  <span className="inline-block bg-green-200 text-green-800 text-md px-1 py-1 rounded-md">
                    Attended ✅
                  </span>
                ) : (
                  <span className="inline-block bg-red-200 text-red-800 text-md px-1 py-1 rounded-md">
                    Not Attended ❌
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap lg:hidden justify-between">
            <div>
              <h4 className="text-lg font-semibold">Guests</h4>
              <div className="mt-3 text-neutral-500 dark:text-neutral-400 w-auto text-sm sm:text-base">
                <div className="flex space-x-10 justify-between p-3 bg-grey dark:bg-grey rounded-lg mb-3">
                  <span>Guests</span>
                  <span>{data?.guests}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            {/* Check-in Dates Section on the left */}
            <div className="w-full sm:w-1/2">
              <h4 className="text-lg font-semibold">
                Check in - Check out Dates
              </h4>
              <div className="mt-3 text-neutral-500 dark:text-neutral-400 max-w-md text-sm sm:text-base">
                <div className="flex space-x-10 justify-between p-3 bg-grey dark:bg-grey rounded-lg mb-3">
                  <span>Check-in</span>
                  <span>{data.checkin}</span>
                </div>
                <div className="flex space-x-10 justify-between p-3">
                  <span>Check-out</span>
                  <span>{data.checkout}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap lg:hidden justify-between">
            <div className="text-lg font-semibold">Status</div>
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
          </div>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
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
              src={data?.Property?.featuredPropertyMedia?.path}
              className="w-5/6 rounded-sm"
              alt="Property"
            />
          </div>

          {/* FOR MOBILE RESPONSIVE */}
          <div className="flex lg:hidden space-y-1 flex-1">
            <div className="font-semibold">
              <span>{data?.Property?.title}</span>
              <div className="text-sm text-neutral-500 font-normal mt-0.5">
                {data.Property.locality + ", " + data.Property.city}
              </div>
            </div>
          </div>

          {/* TIME - NAME */}
          <div className="hidden lg:block min-w-[150px] flex-1">
            <div className="font-medium text-lg">{data.Property.title}</div>
            <div className="text-sm text-neutral-500 font-normal mt-0.5">
              {data.Property.locality + ", " + data.Property.city}
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
              <span className="badge badge-light-info fs-7 fw-semibold">
                Pending
              </span>
            ) : data?.status === "Rejected" ? (
              <span className="badge badge-light-danger fs-7 fw-semibold">
                Rejected
              </span>
            ) : data?.status === "Accepted" ? (
              <span className="badge badge-light-success fs-7 fw-semibold">
                Accepted
              </span>
            ) : (
              <span className="badge badge-light-warning fs-7 fw-semibold">
                Cancelled
              </span>
            )}
            <div className="text-sm text-neutral-500 font-normal mt-0.5">
              Status
            </div>
          </div>
          <div className="hidden lg:block flex-1 whitespace-nowrap">
            {data?.attended === true ? (
              <span className="badge badge-light-success fs-7 fw-semibold">
                Attended ✅
              </span>
            ) : (
              <span className="badge badge-light-danger fs-7 fw-semibold">
                No ❌
              </span>
            )}
            <div className="text-sm text-neutral-500 font-normal mt-0.5">
              Attended
            </div>
          </div>

          {/* PRICE */}
          <div className="flex-1 whitespace-nowrap sm:text-right">
            <div>
              <span className="text-xl font-semibold text-secondary-6000">
                
                {data.amount}
              </span>
            </div>
            <div className="text-xs sm:text-sm text-neutral-500 font-normal mt-1">
              <Link to={`/listing-stay-detail/${data.Property.id}`}>
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

export default FlightCard;
