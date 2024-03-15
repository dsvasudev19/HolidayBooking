
import React, { FC, useState } from "react";
// import { ToastContainer } from "react-bootstrap";
import Swal from "sweetalert2";
import {axiosInstance} from '../../index'
export interface BtnLikeIconProps {
  className?: string;
  colorClass?: string;
  isLiked?: boolean;
  id: number | string;
}

const BtnLikeIcon: FC<BtnLikeIconProps> = ({
  className = "",
  colorClass = "text-white bg-black bg-opacity-30 hover:bg-opacity-50",
  isLiked = false,
  id,
}) => {
  const [likedState, setLikedState] = useState(isLiked);
  const addToWishlist = async () => {
    console.log("add to wishlist");
    try {
      const response = await axiosInstance.post(
        `/wishlist/${id}`,
        { status: "liked" },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Property saved successfully!",
          showConfirmButton: false,
          timer: 800,
        });
      } else if (response.status === 401) {
        Swal.fire("Please login to save the property", "", "warning")
      }
    } catch (error:any) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please login to save the property",
        confirmButtonColor: "#A47557",
      });
      console.log(error);
    }
  };
  const removeFromWishlist = async () => {
    console.log("remove from the wishlist");
    try {
      const response = await axiosInstance.delete(
        `/wishlist/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Property removed successfully!",
          showConfirmButton: false,
          timer: 800,
        });
      } else if (response.status === 401) {
        Swal.fire("Please login to remove the property", "", "warning");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSaveButton = () => {
    if (!likedState) {
      addToWishlist();
    } else {
      removeFromWishlist();
    }
    setLikedState(!likedState);
  };
  return (
    <div
      className={`nc-BtnLikeIcon w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
        likedState ? "nc-BtnLikeIcon--liked" : ""
      }  ${colorClass} ${className}`}
      data-nc-id="BtnLikeIcon"
      title="Save"
      onClick={handleSaveButton}
    >
      {/* <ToastContainer /> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill={likedState ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </div>
  );
};

export default BtnLikeIcon;
