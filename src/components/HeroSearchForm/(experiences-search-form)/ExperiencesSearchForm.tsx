import React, { FC, useEffect, useState } from "react";
import LocationInput from "../LocationInput";
import GuestsInput from "../GuestsInput";
import ExperiencesDateSingleInput from "./ExperiencesDateSingleInput";
import { axiosInstance } from "index";
import { useSearch } from "SearchContext";
export interface ExperiencesSearchFormProps {}

const ExperiencesSearchForm: FC<ExperiencesSearchFormProps> = () => {
  const [cities, setCities] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [cityId, setCityId] = useState<any>(null);
  const { updateLocation, updateCity, location, city } = useSearch();

  const getLocalities = async () => {
    const res = await axiosInstance.get("/localities/" + cityId);
    if (res && res.data) {
      console.log(res.data);
      setLocalities(res.data.localities);
    }
  };

  const getCities = async () => {
    const res = await axiosInstance.get("/cities");
    if (res && res.data) {
      setCities(res.data.data);
    }
  };

  const cityHandler = (item: any) => {
    updateCity(item.name);
    setCityId(item.id);
  };

  useEffect(() => {
    getCities();
  }, []);

  const updateLocality = (item: any) => {
    updateLocation(item.name);
  };

  useEffect(() => {
    if (cityId) {
      getLocalities();
    }
  }, [cityId]);

  const renderForm = () => {
    return (
      <form className="w-full relative mt-8 flex flex-col md:flex-row  rounded-3xl md:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 ">
        <LocationInput
          data={cities}
          className="flex-[1.5]"
          placeHolder="Destination"
          clickHandler={cityHandler}
          contextValue={city}
        />
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <LocationInput
          data={localities}
          className="flex-[1.5]"
          placeHolder="Location"
          clickHandler={updateLocality}
          contextValue={location}
        />
        <ExperiencesDateSingleInput className="flex-1" />
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
      </form>
    );
  };

  return renderForm();
};

export default ExperiencesSearchForm;
