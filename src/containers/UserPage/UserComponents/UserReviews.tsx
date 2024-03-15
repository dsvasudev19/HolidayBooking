import CommentListing from "components/CommentListing/CommentListing";
import { FC, useEffect, useState } from "react";

import {axiosInstance} from "../../../index";
interface UserReviewsProps {
  userId: number; // Adjust the type accordingly
}
interface User {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      role: string;
      createdAt: string;
      updatedAt: string;
    }
interface Review {
  id: number;
  reviewable_id: number;
  reviewable_type: string;
  content: string;
  userId: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
  User:User
}

const UserReviews:FC<UserReviewsProps> = ({userId}) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const getReviews = async () => {
    try {
      const res = await axiosInstance.get(
        `/reviews/${userId}`,
        { withCredentials: true }
      );
      // // const response = await res.json();
      // console.log(res.data.reviews);
      if(res.status===200){
        setReviews(res.data.reviews);
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getReviews();
  }, [])

  return (
    <div className="listingSection__wrap bg-grey">
      {/* HEADING */}
      <h2 className="text-2xl font-semibold">Recently Posted Reviews (Total {reviews.length} reviews)</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

      {/* comment */}
      <div className="divide-y divide-brown dark:divide-neutral-800">
        {/* <CommentListing hasListingTitle className="pb-8" />
        <CommentListing hasListingTitle className="py-8" />
        <CommentListing hasListingTitle className="py-8" />
      <CommentListing hasListingTitle className="py-8" /> */}
        <CommentListing className="py-8" data={reviews} />
        <div className="pt-8">
          {/* <ButtonSecondary>View more 20 reviews</ButtonSecondary> */}
        </div>
      </div>
    </div>
  );
};

export default UserReviews;
