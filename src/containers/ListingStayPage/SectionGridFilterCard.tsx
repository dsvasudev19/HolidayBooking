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
  data = DEMO_DATA,
}) => {
  const [properties, setProperties] = useState([]);
  const { type, location, city } = useSearch();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [total, setTotal] = useState<number>(0);
  const handlePageChange = async (selectedPage: number) => {
    setPageNumber(selectedPage);
  };

  const getPropertiesData = async () => {
    try {
      const queryParams: any = {
        pageSize: 64,
        page: pageNumber,
      };

      if (city !== "") {
        queryParams.city = city;
      }
      if (location !== "") {
        queryParams.locality = location;
      }

      const response = await axiosInstance.get("/users/hotels", {
        params: queryParams,
      });

      if (response.status === 200) {
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
            if (type === "All") {
              return true;
            } else {
              return item.property_typeId === (type === "Hotels" ? 1 : 2);
            }
          });
        console.log(response.data);
        setProperties(data);
        setTotal(response.data.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPropertiesData();
  }, [pageNumber, location, type, city]);

  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2 />

      <div className="mb-8 lg:mb-11">{/* <TabFilters /> */}</div>
      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {properties.map((stay, index) => (
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
