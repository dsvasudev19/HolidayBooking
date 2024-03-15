import CardCategoryBox1 from "components/CardCategoryBox1/CardCategoryBox1";
import Heading from "components/Heading/Heading";
import SectionLatestPosts from "containers/BlogPage/SectionLatestPosts";
import { TaxonomyType } from "data/types";
import React from "react";

export interface SectionGridCategoryBoxProps {
  categories?: TaxonomyType[];
  headingCenter?: boolean;
  categoryCardType?: "card1";
  className?: string;
  gridClassName?: string;
}

// const DEMO_CATS: TaxonomyType[] = [
//   {
//     id: "1",
//     href: "#",
//     name: "Baga Beach",
//     taxonomy: "category",
//     count: 1882,
//     thumbnail:
//       "https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: "2",
//     href: "#",
//     name: "Calangattu Beach",
//     taxonomy: "category",
//     count: 8288,
//     thumbnail:
//       "https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   },
//   {
//     id: "2",
//     href: "#",
//     name: "Agoda Fort",
//     taxonomy: "category",
//     count: 1288,
//     thumbnail:
//       "https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   },
//   {
//     id: "2",
//     href: "#",
//     name: "Vagator Beach",
//     taxonomy: "category",
//     count: 112,
//     thumbnail:
//       "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
//   },
//   {
//     id: "2",
//     href: "#",
//     name: "Tito's Street",
//     taxonomy: "category",
//     count: 323,
//     thumbnail:
//       "https://images.pexels.com/photos/4151484/pexels-photo-4151484.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
//   },
//   {
//     id: "2",
//     href: "#",
//     name: "Mahabaleswar",
//     taxonomy: "category",
//     count: 2223,
//     thumbnail:
//       "https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   },
//   {
//     id: "11",
//     href: "#",
//     name: "Gokarna",
//     taxonomy: "category",
//     count: 1775,
//     thumbnail:
//       "https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
//   },
//   {
//     id: "222",
//     href: "#",
//     name: "Panjim",
//     taxonomy: "category",
//     count: 1288,
//     thumbnail:
//       "https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   },
// ];

const SectionGridCategoryBox: React.FC<SectionGridCategoryBoxProps> = ({
  // categories = DEMO_CATS,
  categoryCardType = "card1",
  headingCenter = true,
  className = "",
  gridClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}) => {
  let CardComponentName = CardCategoryBox1;
  switch (categoryCardType) {
    case "card1":
      CardComponentName = CardCategoryBox1;
      break;

    default:
      CardComponentName = CardCategoryBox1;
  }

  return (
    <div className={`nc-SectionGridCategoryBox relative ${className}`}>
      <SectionLatestPosts className="py-16 lg:py-28" />
    </div>
  );
};

export default SectionGridCategoryBox;
