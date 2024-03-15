import Avatar from "shared/Avatar/Avatar";

import Mail from "../../../images/Svg/Mail.svg";
import Phone from "../../../images/Svg/Phone.svg";
import Location from "../../../images/Svg/Location.svg";
import Date from "../../../images/Svg/Date.svg";
import { FC, useEffect, useState } from "react";

import {axiosInstance} from "../../../index";
// import ButtonPrimary from "shared/Button/ButtonPrimary";

interface UserCardProps {
  userId: number; // Adjust the type accordingly
  logout:()=>void;
}
interface Booking {
  id: number;
  userId: number;
  reference_number: string;
  propertyId: number;
  rooms: string; // You may need to define a more specific type for rooms
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
}

// interface Enquiry {
//   id: number;
//   userId: number;
//   propertyId: number;
//   rooms: string; // You may need to define a more specific type for rooms
//   checkin: string;
//   checkout: string;
//   guests: number;
//   message: string;
//   amount: number | null;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
//   deletedAt: string | null;
// }

// interface Review {
//   id: number;
//   reviewable_id: number;
//   reviewable_type: string;
//   content: string;
//   userId: number;
//   rating: number;
//   createdAt: string;
//   updatedAt: string;
// }

export interface UserDetails {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string | null;
  location: string | null;
  password: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  bookings: Booking[];
}
const UserCard: FC<UserCardProps> = ({ userId,logout }) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const getUserDetailsById=async ()=>{
    try{
      const res = await axiosInstance.get(
        `/users/${userId}`,
        {
          method: "GET",
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
        if(res.status===200){
          console.log(res.data.data);
          setUserDetails(res.data.data);
        }

    }catch(error){
      console.log(error);
    }

  }
  useEffect(() => {
    getUserDetailsById();
  }, []);

  return (
    <div className="w-full flex flex-col items-center text-center sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-7 px-0 sm:p-6 xl:p-8 bg-grey">
      <Avatar
        hasChecked
        hasCheckedClass="w-6 h-6 -top-0.5 right-2"
        sizeClass="w-28 h-28"
      />

      <div className="space-y-3 text-center flex flex-col items-center">
        <h2 className="text-3xl font-semibold">
          {userDetails?.first_name + " " + userDetails?.last_name}
        </h2>
        <span className="text-neutral-500 dark:text-neutral-400">
          {userDetails?.bookings?.length || 0} Bookings
        </span>
      </div>

      <p className="text-neutral-500 dark:text-neutral-400">
        User Account Details
      </p>

      <div className="border-b border-neutral-200 dark:border-neutral-700 w-14"></div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <img src={Mail} style={{ height: "24px" }} alt="Mail Icon" />
          <a
            href="mailto:Vikas_Sharma@Gmail.com"
            className="text-neutral-6000 dark:text-neutral-300"
          >
            {userDetails?.email}
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <img src={Phone} style={{ height: "24px" }} alt="Phone Icon" />
          <span className="text-neutral-6000 dark:text-neutral-300">
            +91 {userDetails?.phone}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <img src={Location} style={{ height: "24px" }} alt="Location Icon" />
          <span className="text-neutral-6000 dark:text-neutral-300">
            {userDetails?.location || "Not Available"}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <img src={Date} style={{ height: "24px" }} alt="Date Icon" />
          <span className="text-neutral-6000 dark:text-neutral-300">
            12/03/1975(date of birth)
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={logout}>Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
