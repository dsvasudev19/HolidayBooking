import { Tab } from "@headlessui/react";
// import StayCard from "components/StayCard/StayCard";

import { Fragment, useEffect, useState } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { FC } from "react";
import { UserDetails } from "./UserCard";
import WishListCard from "./WishListCard";
import { axiosInstance } from "../../../index";
interface WishListProps {
  userId: number;
}
interface PropertyMedia {
  path: string;
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
  featuredPropertyMedia: PropertyMedia;
  room: { id: number }[];
}

interface user {
  id: number;
  first_name: string;
  last_name: string;
}

interface WishlistItem {
  id: number;
  userId: number;
  propertyId: number;
  createdAt: string;
  updatedAt: string;
  property: Property;
  User: user;
}
const UserWishList: FC<WishListProps> = ({ userId }) => {
  console.log(userId);
  let [categories] = useState(["Hotels", "Resorts",'All']);
  const [wishList, setWishList] = useState<WishlistItem[]>([]);
  const [user, setUser] = useState<UserDetails | null>(null);
  
  const getWishListById = async () => {
    try {
      const response = await axiosInstance.get(`/wishlist/${userId}`);

      if (response.status === 200) {
        console.log(response.data.wishlist);
        setWishList(response.data.wishlist);
        setUser(response.data.wishlist[0].User);
        console.log(response.data.wishlist[0].User);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getWishListById();
  }, []);
  return (
    <div className="listingSection__wrap mt-6 lg:mt-0 bg-grey">
      {" "}
      {/* Add margin top for smaller screens */}
      <div>
        <h2 className="text-2xl font-semibold">
          {(user?.first_name || "") + " " + (user?.last_name || " ")}
          Wishlist
        </h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          {(user?.first_name || "") + " " + (user?.last_name || " ")}
          wishlist is very rich, 5-star reviews help him to be more branded.
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="overflow-x-auto">
        {" "}
        {/* Wrap Tab.List with overflow-x-auto */}
        <Tab.Group>
          <Tab.List className="flex space-x-4">
            {categories.map((item) => (
              <Tab key={item} as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                      selected
                        ? "bg-brown text-secondary-50 "
                        : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    } `}
                  >
                    {item}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-1 lg:grid-cols-2">
                {/* {DEMO_STAY_LISTINGS.slice(0, 4).map((stay) => (
                  <StayCard key={stay.id} data={stay} />
                ))} */}
                {wishList?.map(
                  (item) =>
                    item.property?.property_typeId === 1 && (
                      // <StayCard key={item.id} data={item.property} />
                      <WishListCard key={item.id} data={item.property} />
                    )
                )}
              </div>
              <div className="flex mt-11 justify-center items-center">
                {/* <ButtonSecondary>Show me more</ButtonSecondary> */}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-1 lg:grid-cols-2">
                {/* {DEMO_EXPERIENCES_LISTINGS.slice(0, 4).map((experience) => (
                  <ExperiencesCard key={experience.id} data={experience} />
                ))} */}
                {wishList.map(
                  (item) =>
                    item.property?.property_typeId === 3 && (
                      // <StayCard key={item.id} data={item.property} />
                      <WishListCard key={item.id} data={item.property} />
                    )
                )}
              </div>
              <div className="flex mt-11 justify-center items-center">
                {/* <ButtonSecondary>Show me more</ButtonSecondary> */}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-1 lg:grid-cols-2">
                {/* {DEMO_EXPERIENCES_LISTINGS.slice(0, 4).map((experience) => (
                  <ExperiencesCard key={experience.id} data={experience} />
                ))} */}
                {wishList.map(
                  (item) =>
                    
                      // <StayCard key={item.id} data={item.property} />
                      <WishListCard key={item.id} data={item.property} />
                )}
              </div>
              <div className="flex mt-11 justify-center items-center">
                {/* <ButtonSecondary>Show me more</ButtonSecondary> */}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-1 lg:grid-cols-2">
                {/* {DEMO_EXPERIENCES_LISTINGS.slice(0, 4).map((experience) => (
                  <ExperiencesCard key={experience.id} data={experience} />
                ))} */}
                {wishList.map(
                  (item) =>
                   
                      // <StayCard key={item.id} data={item.property} />
                      <WishListCard key={item.id} data={item.property} />
                    
                )}
              </div>
              <div className="flex mt-11 justify-center items-center">
                <ButtonSecondary>Show me more</ButtonSecondary>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default UserWishList;
