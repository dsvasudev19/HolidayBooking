import React, { ReactNode, useEffect, useState } from "react";
import { imageGallery as listingStayImageGallery } from "./listing-stay-detail/constant";
import { imageGallery as listingCarImageGallery } from "./listing-car-detail/constant";
import { imageGallery as listingExperienceImageGallery } from "./listing-experiences-detail/constant";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ListingImageGallery from "components/ListingImageGallery/ListingImageGallery";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import MobileFooterSticky from "./(components)/MobileFooterSticky";
import { axiosInstance } from "../../index";

const DetailPagetLayout = ({
  children,
  startingPrice,
  totalPrice,
  onDateChange,
}: // calculateTotalPrice,
{
  children: ReactNode;
  startingPrice: any;
  totalPrice: any;
  onDateChange: (dates: [Date | null, Date | null]) => void;
  // calculateTotalPrice: any;
}) => {
  const navigate = useNavigate();
  const thisPathname = useLocation().pathname;
  const [searchParams] = useSearchParams();
  const modal = searchParams?.get("modal");
  const [selectedDates, setSelectedDates] = useState<
    [Date | null, Date | null]
  >([new Date("2023/02/06"), new Date("2023/02/23")]);

  const [properties, setProperties] = useState([]);
  const getAllProperties = async () => {
    try {
      const response = await axiosInstance.get(
        "/users/hotels?page=1&pageSize=10",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setProperties(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProperties();
  }, []);
  const handleCloseModalImageGallery = () => {
    let params = new URLSearchParams(document.location.search);
    params.delete("modal");
    navigate(`${thisPathname}/?${params.toString()}`);
  };

  const getImageGalleryListing = () => {
    if (thisPathname?.includes("/listing-stay-detail")) {
      return listingStayImageGallery;
    }
    if (thisPathname?.includes("/listing-car-detail")) {
      return listingCarImageGallery;
    }
    if (thisPathname?.includes("/listing-experiences-detail")) {
      return listingExperienceImageGallery;
    }

    return [];
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setSelectedDates(dates);
    console.log(dates);
    onDateChange && onDateChange(dates);
  };

  return (
    <div className="ListingDetailPage">
      <ListingImageGallery
        isShowModal={modal === "PHOTO_TOUR_SCROLLABLE"}
        onClose={handleCloseModalImageGallery}
        images={getImageGalleryListing()}
      />
      <div className="container ListingDetailPage__content">{children}</div>
      <div className="container relative space-y-24 mb-24 mt-20 lg:space-y-28 lg:mb-28">
    
{/*         <SectionSliderNewCategories
          categories={properties}
          uniqueClassName="PageHome_s1"
        /> */}
      </div>
      {/* STICKY FOOTER MOBILE */}
      <MobileFooterSticky
        startingPrice={startingPrice}
        totalPrice={totalPrice}
        onDateChange={handleDateChange}
        // calculateTotalPrice={calculateTotalPrice}
      />
    </div>
  );
};

export default DetailPagetLayout;
