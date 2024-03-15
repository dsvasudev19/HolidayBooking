/* eslint-disable @typescript-eslint/no-unused-vars */
import SectionHero from "components/SectionHero/SectionHero";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
// import React from "react";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionOurFeatures from "components/SectionOurFeatures/SectionOurFeatures";
import SectionGridFeaturePlaces from "./SectionGridFeaturePlaces";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import rightImgPng from "images/our-features-2.png";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../index";

function PageHome() {
  const [properties, setProperties] = useState([]);
  const [cities, setCities] = useState([]);
  const getAllProperties = async () => {
    try {
      const response = await axiosInstance.get(
        "/users/hotels/?page=1&pageSize=10"
      );
      setProperties(
        response.data.data.filter((item: any) => item.room?.length > 0)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getCities = async () => {
    try {
      const res = await axiosInstance.get("/cities");
      if (res && res.data) {
        console.log(res.data);
        setCities(res.data.data);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getAllProperties();
    getCities();
  }, []);
  return (
    <div className="nc-PageHome relative overflow-hidden">
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        <SectionHero className="pt-10 lg:pt-16 lg:pb-16" />
        <SectionSliderNewCategories
          categories={cities}
          uniqueClassName="PageHome_s1"
        />
        <SectionOurFeatures type="type2" rightImg={rightImgPng} />
        <div className="relative py-16">
          <BackgroundSection />
          <SectionGridFeaturePlaces />
        </div>
        <SectionHowItWork />
        <SectionSubscribe2 />

        <div className="relative py-16">
          <BackgroundSection className="bg-grey dark:bg-black " />
          <SectionGridAuthorBox />
        </div>

        <div className="relative py-16">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div>

        <SectionGridCategoryBox />

        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay uniqueClassName="PageHome_" />
        </div>
      </div>
    </div>
  );
}

export default PageHome;
