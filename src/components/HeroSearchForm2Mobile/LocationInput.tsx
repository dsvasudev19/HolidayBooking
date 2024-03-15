import { MapPinIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect, useRef, FC } from "react";
import { useSearch } from "SearchContext";

interface Props {
  onClick?: () => void;
  onChange?: (value: string) => void;
  className?: string;
  defaultValue?: string;
  headingText?: string;
}

const LocationInput: FC<Props> = ({
  onChange = () => {},
  className = "",
  defaultValue = "United States",
  headingText = "Where to?",
}) => {
  const [value, setValue] = useState("");
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const { updateLocation } = useSearch();
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleSelectLocation = (item: string) => {
    updateLocation(item);
    setTimeout(() => {
      setValue(item);
      onChange && onChange(item);
    }, 0);
  };

  const renderSearchValues = ({
    heading,
    items,
  }: {
    heading: string;
    items: any[];
  }) => {
    return (
      <>
        <p className="block font-semibold text-base">
          {heading || "Destinations"}
        </p>
        <div className="mt-3">
          {items.map((item) => {
            return (
              <div
                className="py-2 mb-1 flex items-center space-x-3 text-sm"
                onClick={() => handleSelectLocation(item.name)}
                key={item.name}
              >
                <MapPinIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                <span className="">{item.name}</span>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className={`${className}`} ref={containerRef}>
      <div className="p-5">
        <span className="block font-semibold text-xl sm:text-2xl">
          {headingText}
        </span>
        <div className="relative mt-5">
          <input
            className={`block w-full bg-transparent border px-4 py-3 pr-12 border-neutral-900 dark:border-neutral-200 rounded-xl focus:ring-0 focus:outline-none text-base leading-none placeholder-neutral-500 dark:placeholder-neutral-300 truncate font-bold placeholder:truncate`}
            placeholder={"Search destinations"}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            ref={inputRef}
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2">
            <MagnifyingGlassIcon className="w-5 h-5 text-neutral-700 dark:text-neutral-400" />
          </span>
        </div>
        <div className="mt-7">
          {value
            ? renderSearchValues({
                heading: "Locations",
                items: [
                  { name: "Panaji" },
                  { name: "Margao" },
                  { name: "Vasco da Gama" },
                  { name: "Ponda" },
                  { name: "Calangute" },
                  { name: "Candolim" },
                  { name: "Baga" },
                  { name: "Anjuna" },
                  { name: "Arambol" },
                  { name: "Colva" },
                  { name: "Majorda" },
                  { name: "Dona Paula" },
                  { name: "Salcete" },
                  { name: "Bardez" },
                  { name: "Tiswadi" },
                  { name: "Sanguem" },
                  { name: "Bicholim" },
                  { name: "Quepem" },
                  { name: "Curchorem" },
                  { name: "Assolna" },
                  { name: "Nuvem" },
                  { name: "Dabolim" },
                  { name: "Cortalim" },
                  { name: "Colvale" },
                  { name: "Cansaulim" },
                  { name: "Santa Cruz" },
                  { name: "Chicalim" },
                  { name: "Verem" },
                  { name: "Porvorim" },
                  { name: "Siolim" },
                  { name: "Socorro" },
                  { name: "Navelim" },
                  { name: "Cavelossim" },
                  { name: "Benaulim" },
                  { name: "Varca" },
                  { name: "Dudhsagar" },
                  { name: "Sanquelim" },
                  { name: "Pernem" },
                  { name: "Vagator" },
                  { name: "Mandrem" },
                  { name: "Morjim" },
                  { name: "Assagao" },
                  { name: "Chapora" },
                  { name: "Assonora" },
                  { name: "Cuncolim" },
                  { name: "Sancoale" },
                  { name: "Loutolim" },
                  { name: "Surla" },
                  { name: "Aldona" },
                  { name: "Dharbandora" },
                  { name: "Pilerne" },
                  { name: "Caranzalem" },
                  { name: "Savoi Verem" },
                  { name: "Merces" },
                  { name: "Carambolim" },
                  { name: "Marcela" },
                  { name: "Seraulim" },
                  { name: "Arossim" },
                  { name: "Velim" },
                  { name: "Chinchinim" },
                  { name: "Quelossim" },
                  { name: "Taleigao" },
                  { name: "Velsao" },
                  { name: "Davorlim" },
                  { name: "Xeldem" },
                  { name: "Chandor" },
                  { name: "Nagoa" },
                  { name: "Moira" },
                  { name: "Cansarvornem" },
                  { name: "Sodiem Siolim" },
                  { name: "Mayem" },
                  { name: "Chorao" },
                  { name: "Dhargal" },
                  { name: "Arpora" },
                  { name: "Reis Magos" },
                  { name: "Saligao" },
                  { name: "Canacona" },
                  { name: "Mapusa" },
                  { name: "Chorla Ghat" },
                  { name: "Karmali" },
                  { name: "Querim Beach" },
                  { name: "Savordem" },
                  { name: "Old Goa" },
                  { name: "Betul Beach" },
                ],
              })
            : renderSearchValues({
                heading: "Popular destinations",
                items: [
                  { name: "Panaji" },
                  { name: "Margao" },
                  { name: "Vasco da Gama" },
                  { name: "Ponda" },
                  { name: "Calangute" },
                  { name: "Candolim" },
                  { name: "Baga" },
                  { name: "Anjuna" },
                  { name: "Arambol" },
                  { name: "Colva" },
                  { name: "Majorda" },
                  { name: "Dona Paula" },
                  { name: "Salcete" },
                  { name: "Bardez" },
                  { name: "Tiswadi" },
                  { name: "Sanguem" },
                  { name: "Bicholim" },
                  { name: "Quepem" },
                  { name: "Curchorem" },
                  { name: "Assolna" },
                  { name: "Nuvem" },
                  { name: "Dabolim" },
                  { name: "Cortalim" },
                  { name: "Colvale" },
                  { name: "Cansaulim" },
                  { name: "Santa Cruz" },
                  { name: "Chicalim" },
                  { name: "Verem" },
                  { name: "Porvorim" },
                  { name: "Siolim" },
                  { name: "Socorro" },
                  { name: "Navelim" },
                  { name: "Cavelossim" },
                  { name: "Benaulim" },
                  { name: "Varca" },
                  { name: "Dudhsagar" },
                  { name: "Sanquelim" },
                  { name: "Pernem" },
                  { name: "Vagator" },
                  { name: "Mandrem" },
                  { name: "Morjim" },
                  { name: "Assagao" },
                  { name: "Chapora" },
                  { name: "Assonora" },
                  { name: "Cuncolim" },
                  { name: "Sancoale" },
                  { name: "Loutolim" },
                  { name: "Surla" },
                  { name: "Aldona" },
                  { name: "Dharbandora" },
                  { name: "Pilerne" },
                  { name: "Caranzalem" },
                  { name: "Savoi Verem" },
                  { name: "Merces" },
                  { name: "Carambolim" },
                  { name: "Marcela" },
                  { name: "Seraulim" },
                  { name: "Arossim" },
                  { name: "Velim" },
                  { name: "Chinchinim" },
                  { name: "Quelossim" },
                  { name: "Taleigao" },
                  { name: "Velsao" },
                  { name: "Davorlim" },
                  { name: "Xeldem" },
                  { name: "Chandor" },
                  { name: "Nagoa" },
                  { name: "Moira" },
                  { name: "Cansarvornem" },
                  { name: "Sodiem Siolim" },
                  { name: "Mayem" },
                  { name: "Chorao" },
                  { name: "Dhargal" },
                  { name: "Arpora" },
                  { name: "Reis Magos" },
                  { name: "Saligao" },
                  { name: "Canacona" },
                  { name: "Mapusa" },
                  { name: "Chorla Ghat" },
                  { name: "Karmali" },
                  { name: "Querim Beach" },
                  { name: "Savordem" },
                  { name: "Old Goa" },
                  { name: "Betul Beach" },
                ],
              })}
        </div>
      </div>
    </div>
  );
};

export default LocationInput;
