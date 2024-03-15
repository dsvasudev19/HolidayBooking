import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type SearchContextType = {
  location: string;
  searchcheckin: any;
  searchcheckout: any;
  updateLocation: any;
  updateCheckin: any;
  updateCheckout: any;
  type: string;
  updateType: any;
  setContextRoomTypeCounts: any;
  ContextroomTypeCounts: any;
  ContexttotalDays: number;
  setContextTotalDays: any;
  ContexttotalPrice: any;
  setContextTotalPrice: any;
  ContexttotalPrices: any;
  setContextTotalPrices: any;
  updateCity: any;
  city: any;
};
const initialSearchContext: SearchContextType = {
  location: "",
  searchcheckin: new Date(Date.now() + 24 * 60 * 60 * 1000),
  searchcheckout: new Date(Date.now() + 48 * 60 * 60 * 1000),
  updateLocation: () => {},
  updateCheckin: () => {},
  updateCheckout: () => {},
  type: "",
  updateType: () => {},
  setContextRoomTypeCounts: () => {},
  ContextroomTypeCounts: {},
  ContexttotalDays: 0,
  setContextTotalDays: () => {},
  ContexttotalPrice: 0,
  setContextTotalPrice: () => {},
  ContexttotalPrices: {},
  setContextTotalPrices: () => {},
  updateCity: () => {},
  city: "",
};

export const searchContext =
  createContext<SearchContextType>(initialSearchContext);

export function SearchContextProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<string>(
    initialSearchContext.location
  );
  const [type, setType] = useState("");
  const [searchcheckin, setCheckin] = useState(
    initialSearchContext.searchcheckin
  );

  const [searchcheckout, setCheckout] = useState(
    initialSearchContext.searchcheckout
  );

  const [ContextroomTypeCounts, setContextRoomTypeCounts] = useState<any>({});
  const [ContexttotalDays, setContextTotalDays] = useState(0);
  const [ContexttotalPrice, setContextTotalPrice] = useState(0);
  const [ContexttotalPrices, setContextTotalPrices] = useState({});
  const [city, setCity] = useState("");

  const updateLocation = (location: string) => {
    setLocation(location);
  };
  const updateCheckin = (checkin: any) => {
    setCheckin(checkin);
  };
  const updateCheckout = (checkout: any) => {
    setCheckout(checkout);
  };

  const updateType = (type: string) => {
    setType(type);
  };

  console.log(city);
  console.log(location);
  const updateCity = (city: string) => {
    setCity(city);
  };

  useEffect(() => {
    const diff: number =
      new Date(searchcheckout?.getTime()!).getTime() -
      new Date(searchcheckin?.getTime()!).getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    setContextTotalDays(days);
  }, [searchcheckin, searchcheckout]);
  return (
    <searchContext.Provider
      value={{
        location,
        searchcheckin,
        searchcheckout,
        updateCheckin,
        updateCheckout,
        updateLocation,
        type,
        updateType,
        ContextroomTypeCounts,
        setContextRoomTypeCounts,
        ContexttotalDays,
        setContextTotalDays,
        ContexttotalPrice,
        setContextTotalPrice,
        ContexttotalPrices,
        setContextTotalPrices,
        updateCity,
        city,
      }}
    >
      {children}
    </searchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(searchContext);
  return context;
}
