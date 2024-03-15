// import React, { FC, useEffect, useState } from "react";
// import { DEMO_EXPERIENCES_LISTINGS } from "data/listings";
// import { ExperiencesDataType, StayDataType } from "data/types";
// import Pagination from "shared/Pagination/Pagination";
// import TabFilters from "./TabFilters";
// import Heading2 from "components/Heading/Heading2";
// import ExperiencesCard from "components/ExperiencesCard/ExperiencesCard";
// import StayCard from "components/StayCard/StayCard";
// export interface SectionGridFilterCardProps {
//   className?: string;
//   data?: StayDataType[];
// }

// const DEMO_DATA: ExperiencesDataType[] = DEMO_EXPERIENCES_LISTINGS.filter(
//   (_, i) => i < 8
// );

// const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
//   className = "",
//   data 
// }) => {
//   // const [city,setCity] = useState("Goa");
//   // const heading=`Experience in ${city}`;

//   // useEffect(() => {
//   //   data ? setCity(data[0].city) : setCity("Goa");
//   // }, []);
//   return (
//     <div
//       className={`nc-SectionGridFilterCard ${className}`}
//       data-nc-id="SectionGridFilterCard"
//     >
//       <Heading2
//         heading="Listing from the city "
        
//       />

//       <div className="mb-8 lg:mb-11">
//         <TabFilters />
//       </div>
//       <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
//         {data?.map((stay) => (
//           <StayCard key={stay.id} data={stay} />
//         ))}
//       </div>
//       <div className="flex mt-16 justify-center items-center">
//         {/* <Pagination /> */}
//       </div>
//     </div>
//   );
// };

// export default SectionGridFilterCard;


import { FC, useEffect, useState } from "react";
import StayCard from "components/StayCard/StayCard";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import Pagination from "shared/Pagination/Pagination";
import Heading2 from "components/Heading/Heading2";
import { axiosInstance } from "../../index";
import { useSearch } from "SearchContext";
export interface SectionGridFilterCardProps {
  className?: string;
  data?: StayDataType[];
}
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);
const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  data,
}) => {
  const [properties, setProperties] = useState([]);
  const city = "Goa";
  const { type, location } = useSearch();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [total, setTotal] = useState<number>(0);
  const handlePageChange = async (selectedPage: number) => {
    setPageNumber(selectedPage);
  };
  
  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2 />

      <div className="mb-8 lg:mb-11">{/* <TabFilters /> */}</div>
      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.map((stay, index) => (
          <StayCard key={index} data={stay} />
        ))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        {/* <Pagination /> */}
        <Pagination total={total} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
