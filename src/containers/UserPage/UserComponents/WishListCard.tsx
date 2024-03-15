import React, { FC } from "react";
import GallerySlider from "components/GallerySlider/GallerySlider";
import { Link } from "react-router-dom";

interface PropertyMedia {
  path: string|any;
  url: string;
  file_name: string;
}

interface Property {
  id: number;
  title: string;
  description: string;
  address: string;
  property_typeId: number;
  propertyMedia: PropertyMedia[];
  featuredPropertyMedia: PropertyMedia|any;
  room: { id: number }[];
}

interface WishListCardProps {
  className?: string;
  data?: Property;
  size?: "default" | "small";
}

const WishListCard: FC<WishListCardProps> = ({
  size = "default",
  className = "",
  data,
}) => {
  const {
    propertyMedia,
    featuredPropertyMedia,
    property_typeId,
    address,
    title,
    room,
    id,
  } = data || {};

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        {propertyMedia && propertyMedia.length > 0 && propertyMedia[0].path && (
          <GallerySlider
            uniqueID={`WishListCard_${id}`}
            ratioClass="aspect-w-4 aspect-h-3 "
            galleryImgs={[
              featuredPropertyMedia?.path,
              ...propertyMedia.map((item) => item?.path),
            ]}
          />
        )}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-2"}>
        <div className="space-y-2">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {property_typeId === 1 ? "Hotel" : "Resort"} · {room?.length} rooms
          </span>
          <div className="flex items-center space-x-2">
            
            <h2
              className={` font-medium capitalize ${
                size === "default" ? "text-lg" : "text-base"
              }`}
            >
              <span className="line-clamp-1">{title}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
            {size === "default" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
            <span className="">{address}</span>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            {/* {amount} */}
            {` 2541`}
            {size === "default" && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /night
              </span>
            )}
          </span>
          {/* {!!reviewStart && (
            <StartRating reviewCount={reviewCount} point={reviewStart} />
          )} */}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-WishListCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden will-change-transform hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="WishListCard"
    >
      {renderSliderGallery()}
      <Link to={`/listing-stay-detail/${id}`}>{renderContent()}</Link>
    </div>
  );
};

export default WishListCard;
