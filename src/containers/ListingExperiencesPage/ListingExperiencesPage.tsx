import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import { TaxonomyType } from "data/types";
import React, { FC, useEffect, useState } from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { axiosInstance } from "index";

export interface ListingExperiencesPageProps {
  className?: string;
}

const ListingExperiencesPage: FC<ListingExperiencesPageProps> = ({
  className = "",
}) => {
  const { city } = useParams();
  const [properties, setProperties] = useState([]);
  const getPropertiesByCity = async () => {
    try {
      const response = await axiosInstance.get(`/users/properties/${city}`);
      console.log(response);
      if (response.status === 200) {
        setProperties(response.data.data)
        //   .filter((ele: any) => ele.room.length > 0)
        //   .map((item: any) => {
        //     let minPrice = Infinity;
        //     item.room.forEach((room: any) => {
        //       if (room.prices) {
        //         const pricesObject: Record<string, number> = room.prices;
        //         const roomMinPrice = Math.min(...Object.values(pricesObject));
        //         minPrice = Math.min(minPrice, roomMinPrice);
        //       }
        //     });
        //     return { ...item, price: minPrice };
        //   })
        // )
          
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPropertiesByCity();
  }, [city]);
  return (
    <div
      className={`nc-ListingExperiencesPage relative overflow-hidden ${className}`}
      data-nc-id="ListingExperiencesPage"
    >
      <Helmet>
        <title>Listing Properties from Localities</title>
      </Helmet>
      <BgGlassmorphism />

      <div className="container relative">
        {/* SECTION HERO */}
        <SectionHeroArchivePage
          currentPage="Resorts"
          currentTab="Resorts"
          type={0}
          className="pt-10 pb-24 lg:pb-28 lg:pt-16 "
        />

        {/* SECTION */}
        <SectionGridFilterCard className="pb-24 lg:pb-28" data={properties} />

        {/* SECTION 1 */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Explore top destination ✈"
            subHeading="Explore thousands of destinations around the world"
            categoryCardType="card4"
            itemPerRow={4}
            categories={DEMO_CATS}
            sliderStyle="style2"
            uniqueClassName="ListingExperiencesPage"
          />
        </div> */}

        {/* SECTION */}
        <SectionSubscribe2 className="py-24 lg:py-28" />
      </div>
    </div>
  );
};

export default ListingExperiencesPage;
