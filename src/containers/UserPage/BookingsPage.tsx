import { Helmet } from "react-helmet";
import UserLayout from "./UserLayout";
import { FC, useEffect, useState } from "react";

import ButtonPrimary from "shared/Button/ButtonPrimary";
import FlightCard from "components/FlightCard/FlightCard";

import {useAuth} from '../../AuthContext'
import { axiosInstance } from "../../index";


export interface BookingsPageProps {
  className?: string;
}

const BookingsPage: FC<BookingsPageProps> = ({ className = "" }) => {
  const {user,loading}=useAuth();
  // const [modalIndex, setModalIndex] = useState(0);
  const [bookings,setBookings] = useState([]);
  console.log(user?.id);
  
 
  const getBookings = async () => {
    try {
      const res = await axiosInstance.get(
        `/bookings/user/${user?.id}`,
        { withCredentials: true }
      );
      if(res.status===200){
        setBookings(res.data.bookings);
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (!loading && user) {
      getBookings();
    }
  }, [loading, user]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={`nc-BookingsPage ${className}`} data-nc-id="BookingsPage">
      <Helmet>
        <title>Solitary Holidays || Settings</title>
      </Helmet>
      <UserLayout>
        <div
          className={`nc-SectionGridFilterCard ${className}`}
          data-nc-id="SectionGridFilterCard"
        >
          <div className="lg:p-10 lg:bg-neutral-50 lg:dark:bg-black/20 grid grid-cols-1 gap-6  rounded-3xl">
            {bookings.map((item, index) => (
              <FlightCard defaultOpen={!index} key={index} data={item} getBookings={getBookings}/>
            ))}

            <div className="flex mt-12 justify-center items-center">
              <ButtonPrimary>Show more</ButtonPrimary>
            </div>
          </div>
        </div>
      </UserLayout>
    </div>
  );
};

export default BookingsPage;
