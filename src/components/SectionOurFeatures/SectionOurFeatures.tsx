import React, { FC } from "react";
import rightImgPng from "images/Features-Cover.png";
import NcImage from "shared/NcImage/NcImage";
import Badge from "shared/Badge/Badge";

export interface SectionOurFeaturesProps {
  className?: string;
  rightImg?: string;
  type?: "type1" | "type2";
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
  className = "lg:py-14",
  rightImg = rightImgPng,
  type = "type1",
}) => {
  return (
    <div
      className={`nc-SectionOurFeatures relative flex flex-col items-center ${
        type === "type1" ? "lg:flex-row" : "lg:flex-row-reverse"
      } ${className}`}
      data-nc-id="SectionOurFeatures"
    >
      <div className="flex-grow">
        <NcImage src={rightImgPng} />
      </div>
      <div
        className={`max-w-2xl flex-shrink-0 mt-10 lg:mt-0 lg:w-2/5 ${
          type === "type1" ? "lg:pl-16" : "lg:pr-16"
        }`}
      >
        <span className="uppercase text-sm text-gray-400 tracking-widest">
          EXPLORE
        </span>
        <h2 className="font-semibold text-4xl mt-5">Happening Goa</h2>

        <ul className="space-y-10 mt-16">
          <li className="space-y-4">
            <Badge name="Cost Effective" />
            <span className="block text-xl font-semibold">
              Cost-effective Stays
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Solitary Holidays: Affordable hotel, villa, and resort bookings in
              picturesque Goa for a memorable stay.
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="green" name="Easy Booking " />
            <span className="block text-xl font-semibold">
              User Friendly System
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Enjoy a seamless experience with our user-friendly booking system
              at Solitary Holidays in Goa
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="red" name="Easy Cancellation" />
            <span className="block text-xl font-semibold">
              Cancellation & Refund
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
               Easy cancellations and quick refunds at Solitary
              Holidays for worry-free travel arrangements in Goa.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SectionOurFeatures;
