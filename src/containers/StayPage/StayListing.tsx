import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionGridFilterCard from "containers/ListingStayPage/SectionGridFilterCard";
import React, { FC } from "react";
import { Helmet } from "react-helmet";

export interface HotelListingProps {
  className?: string;
}
const HotelListing: FC<HotelListingProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-HotelListing relative overflow-hidden ${className}`}
      data-nc-id="HotelListing"
    >
      <Helmet>
        <title>Stays || Solitiary Holidays</title>
      </Helmet>
      <BgGlassmorphism />

      <div className="container relative overflow-hidden">
        {/* SECTION HERO */}
        <SectionHeroArchivePage
          currentPage="Hotels"
          currentTab="Hotels"
          className="pt-10 pb-24 lg:pb-28 lg:pt-16 "
        />

        {/* SECTION */}
        <SectionGridFilterCard className="pb-24 lg:pb-28" />

        {/* SECTION */}
        <div className="relative py-16 mb-24 lg:mb-28">
          <BackgroundSection className="bg-grey dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div>

        {/* SECTION */}
        <SectionSubscribe2 className="py-24 lg:py-28" />
      </div>
    </div>
  );
};

export default HotelListing;
