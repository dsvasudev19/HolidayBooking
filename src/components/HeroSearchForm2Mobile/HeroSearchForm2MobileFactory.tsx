import React from "react";
import HeroSearchForm2Mobile from "./HeroSearchForm2Mobile";
import HeroSearchForm2RealEstateMobile from "./HeroSearchForm2RealEstateMobile";
import { PathName } from "routers/types";
import { useLocation } from "react-router-dom";

const PAGES_REAL_ESTATE: PathName[] = [
  "/home-2",
  "/listing-real-estate",
  "/listing-real-estate-map",
];

const HeroSearchForm2MobileFactory = () => {
  const pathname = useLocation().pathname;
  if (PAGES_REAL_ESTATE.includes(pathname as PathName)) {
    return <HeroSearchForm2RealEstateMobile />;
  }
  return <HeroSearchForm2Mobile />;
};

export default HeroSearchForm2MobileFactory;
