import React, { FC, ReactNode, useEffect, useState } from "react";
import imagePng from "images/Stay-Cover.png";
import HeroSearchForm, {
  SearchTab,
} from "components/HeroSearchForm/StaySearchForm";
import { useParams } from "react-router-dom";
import { useScratch } from "react-use";
import { axiosInstance } from "index";

export interface SectionHeroArchivePageProps {
  className?: string;
  listingType?: ReactNode;
  currentPage: "Hotels" | "Resorts";
  currentTab: SearchTab;
  rightImage?: string;
  type?: number;
}

const SectionHeroArchivePage: FC<SectionHeroArchivePageProps> = ({
  className = "",
  listingType,
  currentPage,
  currentTab,
  rightImage = imagePng,
  type = 1,
}) => {
  const [cities, setCities] = useState([]);
  const [destination, setDestination] = useState<any>({});

  const getAllCities = async () => {
    try {
      const response = await axiosInstance.get(`/cities`);
      console.log(response);
      if (response.status === 200) {
        console.log(response.data.data);
        setCities(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCities();
  }, []);
  useEffect(() => {
    if (cities) {
      const destiny = cities.find((element: any) => element.name === city);
      if (destiny) {
        setDestination(destiny);
      }
    }
  });
  const { city } = useParams();
  return (
    <div
      className={`nc-SectionHeroArchivePage flex flex-col relative ${className}`}
      data-nc-id="SectionHeroArchivePage"
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-6 lg:space-y-10 pb-14 lg:pb-64 xl:pb-80 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl leading-[110%]">
            Enjoy Your Vacation In {city}
          </h2>
          <div className="flex items-center text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            {/* <i className="text-2xl las la-map-marked"></i> */}
            {/* <span className="ml-2.5">Goa </span>
            <span className="mx-5"></span> */}
            {/* {listingType ? (
              listingType
            ) : (
              <>
                <i className="text-2xl las la-home"></i>
                <span className="ml-2.5">250+ Stays</span>
              </>
            )} */}
          </div>
        </div>
        <div className="flex-grow">
          <img className="w-full" src={destination.path || rightImage} alt="hero" />
        </div>
      </div>

      <div className="hidden lg:flow-root w-full">
        <div className="z-10 lg:-mt-40 xl:-mt-56 w-full">
          {type === 1 && (
            <HeroSearchForm currentPage={currentPage} currentTab={currentTab} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionHeroArchivePage;
