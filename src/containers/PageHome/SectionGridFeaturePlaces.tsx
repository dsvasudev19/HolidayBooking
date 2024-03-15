import React, { FC, ReactNode, useEffect, useState } from "react";
// import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import StayCard from "components/StayCard/StayCard";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../index";
import { useSearch } from "SearchContext";

export interface SectionGridFeaturePlacesProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  gridClass = "",
  heading = "Featured places to stay",
  subHeading = "Popular places to stay that Solitiary recommends for you",
  tabs = ["All", "Hotels", "Resorts"],
}) => {
  const renderCard = (stay: StayDataType) => {
    return <StayCard key={stay.id} data={stay} />;
  };
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [activeTab, setActiveTab] = useState("All");
  const [pageNumber, setPageNumber] = useState(1);
  const { location, type } = useSearch();
  const limit = 5;
  const onClickTab = (tab: string) => {
    setActiveTab(tab);
    const filteredStays = properties.filter((stay: any) => {
      return (
        (tab === "Hotels" && stay.property_typeId === 1) ||
        (tab === "Resorts" && stay.property_typeId === 3)
      );
    });
    setFilteredProperties(filteredStays);
  };
  const getAllProperties = async () => {
    try {
      const queryParams = {
        page: pageNumber,
        pageSize: 8,
      };
      const response = await axiosInstance.get("users/hotels", {
        params: queryParams,
      });
      const data = response.data.data
        .filter((ele: any) => ele.room.length > 0)
        .map((item: any) => {
          let minPrice = Infinity;
          item.room.forEach((room: any) => {
            if (room.prices) {
              const pricesObject: Record<string, number> = room.prices;
              const roomMinPrice = Math.min(...Object.values(pricesObject));
              minPrice = Math.min(minPrice, roomMinPrice);
            }
          });
          return { ...item, price: minPrice };
        })
        .filter((item: any) => {
          if (activeTab === "All") {
            return true;
          } else {
            return item.property_typeId === (activeTab === "Hotels" ? 1 : 2);
          }
        })
        .filter((item: any) => {
          if (location !== "") {
            return item.locality.toLowerCase().includes(location.toLowerCase());
          } else {
            return true;
          }
        });
      setProperties(data);
      setFilteredProperties(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllProperties();
  }, [location, activeTab, type]);
  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <HeaderFilter
        tabActive={""}
        subHeading={subHeading}
        tabs={tabs}
        heading={heading}
        onClickTab={onClickTab}
      />
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {filteredProperties
          .filter((_, i) => i < 16)
          .map((stay: any) => renderCard(stay))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <Link to="/HotelListing">
          <ButtonPrimary>Show me more</ButtonPrimary>
        </Link>
      </div>
    </div>
  );
};

export default SectionGridFeaturePlaces;
