import React, { FC, Fragment, useEffect, useState } from "react";
import CommentListing from "components/CommentListing/CommentListing";
import FiveStartIconForRate from "components/FiveStartIconForRate/FiveStartIconForRate";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import LikeSaveBtns from "components/LikeSaveBtns";
import StayDatesRangeInput from "./StayDatesRangeInput";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowRightIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import ButtonCircle from "shared/Button/ButtonCircle";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import DetailPagetLayout from "../Layout";
import GuestsInput from "./GuestsInput";
import SectionDateRange from "../SectionDateRange";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import Success from "components/Animations/Sucess";
import { useAuth } from "../../../AuthContext";
import { axiosInstance } from "../../../index";
import Swal from "sweetalert2";
import { Formik, Field, Form, ErrorMessage } from "formik";
import ListingImageGallery from "components/ListingImageGallery/ListingImageGallery";
import * as Yup from "yup";
import { useSearch } from "SearchContext";
import { toast, ToastContainer } from "react-toastify";
interface Prices {
  sunday: number;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  [key: string]: number;
}

interface RoomType {
  [type: string | number]: Room[];
}

interface TotalPrices {
  [roomType: string]: number;
}

interface RoomTypeCounts {
  [roomType: string]: number;
}

interface Room {
  id: number;
  propertyId: number;
  title: string;
  description: string;
  blockPrice: string;
  roomType: number;
  occupancy: number;
  status: number;
  prices:
    | {
        sunday: number;
        monday: number;
        tuesday: number;
        wednesday: number;
        thursday: number;
        friday: number;
        saturday: number;
      }
    | any;
  roomMedia: { path: string }[];
  featuredRoomMedia: { path: string };
  Amenities: { id: number; name: string; amenity_type: string }[];
  foodOptions: number[] | [] | any;
  selectedDates: [] | any;
}

export type StayDetailPageContainerProps = {
  title: string;
  address: string;
  id: number;
  property_typeId: number;
  vendorId: number;
  slug: string;
  description: string;
  about: string;
  city: string;
  state: string;
  country: string;
  email: string;
  phone: string;
  status: number;
  checkin: string;
  checkout: string;
  position: string;
  cancellation_policy: string;
  special_note: string;
  propertyMedia: { path: string }[];
  featuredPropertyMedia: { path: string };
  vendor: {
    name: string;
    id: number;
    email: string;
    phone: string;
    createdAt: string;
    profileMedia: any;
  };
  Amenities: { id: number; name: string; amenity_type: string }[];
  room: {
    id: number;
    propertyId: number;
    title: string;
    description: string;
    blockPrice: string;
    roomType: number;
    occupancy: number;
    status: number;
    prices:
      | {
          sunday: number;
          monday: number;
          tuesday: number;
          wednesday: number;
          thursday: number;
          friday: number;
          Saturday: number;
        }
      | any;
    foodOptions: [];
    selectedDates: [] | any;
    roomMedia: { path: string }[];
    featuredRoomMedia: { path: string };
    Amenities: { id: number; name: string; amenity_type: string }[];
  }[];
  Reviews: {
    id: number;
    reviewable_id: number;
    reviewable_type: string;
    content: string;
    userId: number;
    rating: number;
    createdAt: string;
    updatedAt: string;
  }[];
  stars: number;
};

const enquirySchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  message: Yup.string().required("Message is required"),
});
const StayDetailPageContainer: FC<{}> = () => {
  const {
    updateCheckin,
    updateCheckout,
    setContextRoomTypeCounts,
    setContextTotalPrices,
    setContextTotalPrice,
    setContextTotalDays,
  } = useSearch();
  const { stayId } = useParams();
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [NoOfdays, setNoOfDays] = useState<number>(0);
  const [selected, setSelected] = useState<any>([]);
  const [imageModal, setImageModal] = useState(false);
  const [loading, setLoading] = useState(false);
  let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);
  let [isRoomAmenitiesModalOpen, setIsRoomAmenitiesModalOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isOTPNumber, setIsOTPNumber] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [isAnimation, setIsAnimation] = useState(false);

  const [isCalendarModalOpen, setIsCaledarModalOpen] = useState(false);

  const [buttonState, setButtonState] = useState(false);

  const [startingPrice, setStartingPrice] = useState<number | null>(0);

  const [dateRangeSelected, setDateRangeSelected] = useState(false);
  const [review, setReview] = useState("");

  const [currentHover, setCurrentHover] = useState(5);

  const [roomTypeCounts, setRoomTypeCounts] = useState<RoomTypeCounts>({});

  const [stayDetail, setStayDetail] = useState<StayDetailPageContainerProps>({
    title: "",
    address: "",
    id: 0,
    property_typeId: 0,
    vendorId: 0,
    slug: "",
    description: "",
    about: "",
    city: "",
    state: "",
    country: "",
    email: "",
    position: "",
    phone: "",
    status: 0,
    checkin: "",
    checkout: "",
    cancellation_policy: "",
    special_note: "",
    propertyMedia: [],
    featuredPropertyMedia: { path: "" },
    vendor: {
      name: "",
      id: 0,
      email: "",
      phone: "",
      createdAt: "",
      profileMedia: { path: "" },
    },
    Amenities: [],
    room: [],
    Reviews: [],
    stars: 0,
  });
  const [checkin, setCheckin] = useState<Date | null>(new Date(Date.now()));
  const [checkout, setCheckout] = useState<Date | null>(new Date(Date.now()));
  const [totalPrices, setTotalPrices] = useState<TotalPrices>({});
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalGuests, setTotalGuests] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [position, setPosition] = useState<string>("");
  const [room, setRoom] = useState<Room | any>({
    id: 0,
    propertyId: 0,
    title: "",
    description: "",
    blockPrice: "",
    roomType: 0,
    occupancy: 0,
    status: 0,
    prices: {},
    foodOptions: [],
    selectedDates: [],
    roomMedia: [],
    featuredRoomMedia: { path: "" },
    Amenities: [],
  });

  const [parsedPrices, setParsedPrices] = useState<Prices>({
    sunday: 0,
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
  });
  const [parsedDates, setParsedDates] = useState<string[]>([]);
  const [enquiryDetails, setEnquiryDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
    itinerary:[],
  });

  const handleEnquiryDetailsChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    setEnquiryDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const getUserById = async () => {
    try {
      const res = await axiosInstance.get(`/users/${user.id}`);
      if (res.status === 200) {
        const data = res.data.data;
        console.log(data);
        setEnquiryDetails({...enquiryDetails,...data,itinerary:[]});
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    
    if(user && user.id){
      getUserById();
    }
  },[user])

  const getRoomById = (id: any) => {
    const room: any = stayDetail?.room?.find((item) => item.id === id) || {
      id: 0,
      propertyId: 0,
      title: "",
      description: "",
      blockPrice: "",
      roomType: 0,
      occupancy: 0,
      status: 0,
      prices: {},
      foodOptions: [],
      selectedDates: [],
      roomMedia: [],
      featuredRoomMedia: { path: "" },
      Amenities: [],
    };
    if (room) {
      console.log(room);
      setRoom(room);
    }
  };
  const updateSelected = (value: any, id: any, type: any) => {
    const updatedSelected = [...selected];
    if (value === 0) {
      const indexToRemove = updatedSelected.findIndex(
        (item: any) => item.id === id && item.type === type
      );
      if (indexToRemove !== -1) {
        updatedSelected.splice(indexToRemove, 1);
      }
    } else {
      const existingIndex = updatedSelected.findIndex(
        (item: any) => item.id === id && item.type === type
      );
      if (existingIndex !== -1) {
        updatedSelected[existingIndex].value = value;
      } else {
        updatedSelected.push({ id: id, type: type, value: value });
      }
    }
    setSelected(updatedSelected);
  };

  const handleRoomSelection = (type: any, roomId: any, value: any) => {
    setRoomTypeCounts((prevCounts) => {
      const updatedCounts = {
        ...prevCounts,
        [type]: value,
      };
      return updatedCounts;
    });

    setContextRoomTypeCounts((prevCounts: any) => {
      const updatedCounts = {
        ...prevCounts,
        [type]: value,
      };
      return updatedCounts;
    });
  };

  const handleCheckinChange = (newCheckin: Date | null) => {
    setCheckin(newCheckin);
    updateCheckin(newCheckin);
  };

  const handleCheckoutChange = (newCheckout: Date | null) => {
    setCheckout(newCheckout);
    updateCheckout(newCheckout);
  };

  const handleTotalGuestsChange = (newTotalGuests: any) => {
    setTotalGuests(newTotalGuests);
  };

  const handleDatesChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    handleCheckinChange(start);
    updateCheckin(start);
    updateCheckout(end);
    handleCheckoutChange(end);
  };

  const getPropertyById = async () => {
    try {
      const res = await axiosInstance.get(`/users/hotels/${stayId}`);
      if (res.status === 200) {
        const data = res.data.data;
        console.log(data);
        const updatedIframeString = `${data.position?.replace(
          "<iframe",
          '<iframe allowfullscreen="true" width="100%" height="100%"'
        )}`;
        setPosition(updatedIframeString || "");
        setStayDetail(data);
        const firstRoomPrices = data.room[0].prices;
        setParsedPrices(firstRoomPrices);

        const receivedDates = JSON.parse(data.room[0].selectedDates) || [];
        console.log("dates got", receivedDates);
        setParsedDates(receivedDates);
        const lowest = Math.min(
          ...(Object.values(firstRoomPrices) as number[])
        );
        setStartingPrice(lowest);
        setImages([
          data?.featuredPropertyMedia?.path,
          ...data?.propertyMedia?.map((item: any) => {
            return { id: item.mediable_id, path: item.path };
          }),
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotalPrice = (
    startDate: Date | any,
    endDate: Date | any,
    impDates: string[],
    prices: Prices,
    blockPrice: any
  ): number => {
    let end = new Date(endDate).toISOString();
    let currentDate = new Date(startDate).toISOString();
    let totalPrice = 0;
    while (currentDate < end) {
      if (impDates.includes(currentDate)) {
        totalPrice += blockPrice;
      } else {
        const dayOfWeek = new Intl.DateTimeFormat("en-US", {
          weekday: "long",
        })
          .format(new Date(currentDate))
          .toLowerCase();
        totalPrice += prices[dayOfWeek] || 0;
      }
      const nextDate = new Date(currentDate);
      nextDate.setDate(nextDate.getDate() + 1);
      currentDate = nextDate.toISOString();
    }
    return totalPrice;
  };

  const roomTypes: RoomType = stayDetail.room.reduce((acc: any, item: any) => {
    const type = item.roomType;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item);
    localStorage.setItem("roomTypes", JSON.stringify(acc));
    return acc;
  }, {});

  useEffect(() => {
    if (user) {
      setEnquiryDetails(user);
    }
  }, [user]);

  useEffect(() => {
    const updatedTotalPrices: Record<string, number> = {};
    Object.entries(roomTypes).forEach(([type, rooms]) => {
      const firstRoom = rooms[0];
      const impDatesString = JSON.parse(firstRoom.selectedDates) || [];
      const impDates = impDatesString;
      const blockPrice = firstRoom.blockPrice;
      const prices: any = firstRoom.prices;
      const totalPriceForRoom = calculateTotalPrice(
        checkin,
        checkout,
        impDates,
        prices,
        blockPrice
      );
      updatedTotalPrices[type] = totalPriceForRoom;
    });
    console.log(updatedTotalPrices);
    setTotalPrices(updatedTotalPrices);
    setContextTotalPrices(updatedTotalPrices);
  }, [checkin, checkout, roomTypeCounts, totalGuests]);

  useEffect(() => {
    getPropertyById();
  }, [stayId]);

  useEffect(() => {
    const total: number = Object.entries(roomTypeCounts).reduce(
      (acc, [roomType, count]) => {
        const totalPriceForRoomType = totalPrices[roomType] || 0;
        return acc + totalPriceForRoomType * count;
      },
      0
    );
    const totalRooms: number = (
      Object.values(roomTypeCounts) as number[]
    ).reduce((acc, currentValue) => acc + currentValue, 0);
    setTotalPrice(total);
    setContextTotalPrice(total);
  }, [totalPrices]);
  useEffect(() => {
    const diff: number =
      new Date(checkout?.getTime()!).getTime() -
      new Date(checkin?.getTime()!).getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    setTotalDays(days);
    setContextTotalDays(days);
  }, [checkout, checkin]);

  function HandlerButtonClicker() {
    setButtonState(true);
  }

  function EnquriyOtpNumber() {
    setIsEnquiryModalOpen(false);

    setIsOTPNumber(true);
  }

  function OtpGenratorVerified() {
    setIsOTPNumber(false);

    setIsOTPVerified(true);
  }

  function AnimationModal() {
    setIsOTPVerified(false);

    setIsAnimation(true);
  }

  function closeModalAmenities() {
    setIsOpenModalAmenities(false);
  }

  function openModalAmenities() {
    setIsOpenModalAmenities(true);
  }

  function openRoomAmenitiesModal() {
    setIsRoomAmenitiesModalOpen(true);
  }

  function closeModalRoomAmenities() {
    setIsRoomAmenitiesModalOpen(false);
  }

  function ClosedModalOTP() {
    setIsOTPNumber(false);
  }

  function ClosedModalVerified() {
    setIsOTPVerified(false);
  }

  function ClosedModalAnimation() {
    setIsAnimation(false);
  }

  const handleOpenModalImageGallery = () => {
    setImageModal(true);
  };

  const handleCloseModalImageGallery = () => {
    setImageModal(false);
  };
  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6 bg-grey">
        {/* 1 */}
        <div className="flex justify-between items-center">
          {stayDetail.stars && <Badge name={stayDetail?.stars} />}
          <LikeSaveBtns />
        </div>

        {/* 2 */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {stayDetail?.title}
        </h2>

        {/* 3 */}
        <div className="flex items-center space-x-4">
          {/* <StartRating /> */}
          {/* <span>·</span> */}
          <span>
            <i className="las la-map-marker-alt"></i>
            <span className="ml-1">
              {" "}
              {stayDetail.city}
              {"  "}
              {stayDetail.state}
            </span>
          </span>
        </div>

        {/* 4 */}
        <div className="flex items-center">
          <Avatar
            hasChecked
            sizeClass="h-10 w-10"
            radius="rounded-full"
            imgUrl={stayDetail?.vendor?.profileMedia?.path}
          />

          <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
            Hosted by{" "}
            <span className="text-neutral-900 dark:text-neutral-200 font-medium">
              {stayDetail?.vendor?.name}
            </span>
          </span>
        </div>

        {/* 5 */}
        {/* <div className="w-full border-b border-neutral-100 dark:border-neutral-700" /> */}

        {/* 6 */}
        <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
          <div className="flex items-center space-x-3 ">
            {/* <i className=" las la-user text-2xl "></i> */}
            {/* <span className="">
              6 <span className="hidden sm:inline-block">guests</span>
            </span> */}
          </div>
          <div className="flex items-center space-x-3">
            <i className=" las la-bed text-2xl"></i>
            <span className=" ">
              {stayDetail?.room?.length}{" "}
              <span className="hidden sm:inline-block">Rooms</span>
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderCards = (room: Room, index: any) => {
    // const [bState,setBState]=useState(false);
    const amenities = room?.Amenities;
    const innerParse = JSON.parse(room?.foodOptions);
    // const foodOptions = JSON.parse(innerParse);
    const foodOptions=innerParse;
    
    return (
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-10 sm:space-y-8 px-4 sm:p-6 xl:p-8 bg-grey">
        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-semibold">Select Room</h2>
          <NcInputNumber
            className=""
            defaultValue={0}
            max={10}
            min={1}
            onChange={(value) => {
              handleRoomSelection(room.roomType, room.id, value);
            }}
          />
        </div>
        <div className="w-full sm:w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="flex flex-col sm:flex-row items-center">
          {/* Left Side (Title) */}
          <div className="w-full sm:w-4/5 mt-4 sm:mt-0">
            <div className="text-xl font-semibold mb-3">{room?.title} ✅</div>

            {/* Room Type Section */}
            <div className="flex items-center mb-4">
              <div className="mr-4 flex items-center mb-2 sm:mb-0">
                <span className="text-neutral-6000 dark:text-neutral-300">
                  Room Type:
                </span>
                <i className="text-2xl las la-couch ml-2"></i>
                <div className="text-neutral-6000 dark:text-neutral-300 ml-2">
                  {room?.roomType}
                  {/* {room.roomType===1?"Double":room.roomType===3?"Triple":room.roomType===4?"Quad":"Multiple"}Single":room.roomType===2?" */}
                </div>
              </div>
              <div className="mr-4 flex items-center mb-2 sm:mb-0">
                <i className="text-2xl las la-user-friends mr-3"></i>
                <div className="text-neutral-6000 dark:text-neutral-300">
                  {room?.occupancy}
                </div>
              </div>
              {/* <div className="flex items-center">
                  <i className="text-2xl las la-bed mr-3"></i>
                  <div className="text-neutral-6000 dark:text-neutral-300">
                    {room?.occupancy}
                  </div>
                </div> */}
            </div>
            <div className="text-neutral-6000 dark:text-neutral-300 mt-3 mb-2 text-md">
              Price includes:
              {Array.isArray(foodOptions) && foodOptions?.length > 0
                ? foodOptions?.map((item: any) =>
                    item === 1
                      ? " Breakfast"
                      : item === 2
                      ? " Lunch"
                      : item === 3
                      ? " Dinner"
                      : item === 4
                      ? " Lunch or Dinner "
                      : ""
                  )
                : " No Food"}
            </div>
            {/* Icon Section */}
            <div className="grid gap-6 text-sm text-neutral-700 dark:text-neutral-300">
              <div className="flex items-center">
                {room?.Amenities?.filter((_, i) => i < 3)?.map(
                  (item: any, index: any) => (
                    <div className="flex items-center" key={index}>
                      <div className="mr-1">
                        {/* <i className="text-2xl las la-amenity"></i> */}
                        <CheckCircle2 size={25} strokeWidth={1.5} />
                      </div>
                      <div className="text-neutral-6000 dark:text-neutral-300 mr-2">
                        {item?.name}
                      </div>
                    </div>
                  )
                )}

                <div className="flex items-center ml-3">
                  <div
                    className="text-neutral-6000 dark:text-neutral-300 cursor-pointer"
                    onClick={() => openRoomAmenitiesModal()}
                  >
                    More
                  </div>
                  {renderRoomAmenities(amenities)}
                </div>
              </div>
            </div>
          </div>
          {/* Right Side (Image) */}
          <div className="flex-shrink-0 w-full sm:w-1/6 mt-4 sm:mt-0">
            <div className="aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              <img
                alt="room"
                className="absolute inset-0 object-cover"
                sizes="200px"
                src={room?.featuredRoomMedia?.path}
              />
            </div>
          </div>
        </div>
        <div className="w-full border-b border-neutral-200 dark:border-neutral-700 mt-4"></div>
        <div className="flex justify-between items-center mt-4">
          <ButtonSecondary
            onClick={() => {
              getRoomById(room.id);
              setIsCaledarModalOpen(true);
            }}
          >
            Price Card<i className="las la-calendar text-2xl ms-2"></i>
          </ButtonSecondary>
          {renderModalCalendar()}
          <div>
            <span className="font-semibold px-2">Avg/night</span>
            <span className="font-semibold px-2">
              ₹{" "}
              {totalPrices[room.roomType] !== 0 &&
              !isNaN(totalPrices[room.roomType]) &&
              totalDays !== 0 &&
              !isNaN(totalDays) &&
              roomTypeCounts[room.roomType] !== undefined &&
              !isNaN(roomTypeCounts[room.roomType])
                ? (
                    (totalPrices[room.roomType] / totalDays) *
                    roomTypeCounts[room.roomType]
                  ).toFixed(2)
                : 0}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderModalCalendar = () => {
    function closeModalCalendar() {
      setIsCaledarModalOpen(false);
    }

    function handleDateRangeSelection() {
      setDateRangeSelected(true);
    }

    return (
      <Transition appear show={isCalendarModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModalCalendar}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block py-8 h-auto w-full max-w-screen-lg">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      Selected Dates
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalCalendar} />
                    </span>
                  </div>
                  <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                    <SectionDateRange
                      prices={parsedPrices}
                      checkin={checkin}
                      checkout={checkout}
                      setCheckin={handleCheckinChange}
                      setCheckout={handleCheckoutChange}
                      impDates={parsedDates}
                      blockPrice={stayDetail?.room[0]?.blockPrice}
                    />
                    <div className="text-end">
                      {/* <ButtonPrimary type="submit" onClick={closeModalCalendar}>
                        Submit
                      </ButtonPrimary> */}
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap bg-grey">
        <h2 className="text-2xl font-semibold">Stay information</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="text-neutral-6000 dark:text-neutral-300">
          <span>
            {/* Stay on the coast of the Arabian Sea near Cavelossim Beach at
              Radisson Blu Resort Goa Cavelossim Beach—an inspiring blend of
              Goan architecture and Portuguese culture. Make the easy, 45-minute
              commute from Dabolim International Airport (GOI), and allow the
              stress of everyday life to melt away in our stunning
              accommodations. Rest up and relax in 132 rooms and suites with
              private balconies, complemented perfectly with our on-site SOHUM
              spa, relaxing free-form pool, and gourmet restaurants. */}
            {stayDetail.description}
          </span>
          <br />
          <br />
          {/* <span>
            We also offer 6,000 square feet of tastefully appointed event space
            for once-in-a-lifetime weddings and successful corporate events.
          </span> */}
          <br /> <br />
        </div>
      </div>
    );
  };

  const renderSection3 = () => {
    return (
      <div className="listingSection__wrap bg-grey">
        <div>
          <h2 className="text-2xl font-semibold">Amenities </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {` About the property's amenities and services`}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* 6 */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
          {stayDetail?.Amenities?.filter((_, i) => i < 12)?.map((item) => (
            <div key={item.name} className="flex items-center space-x-3">
              {/* <i className={`text-3xl las ${item.icon}`}></i> */}
              <span className="symbol-label bg-light">
                <CheckCircle2 size={25} strokeWidth={1.5} />
              </span>
              <span className=" ">{item.name}</span>
            </div>
          ))}
        </div>

        {/* ----- */}
        <div className="w-14 border-b border-neutral-200"></div>
        <div>
          <ButtonSecondary onClick={openModalAmenities}>
            View all amenities
          </ButtonSecondary>
        </div>
        {renderMotalAmenities()}
      </div>
    );
  };

  const renderRoomAmenities = (
    amenities: { id: number; name: string; amenity_type: string }[]
  ) => {
    return (
      <Transition appear show={isRoomAmenitiesModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModalRoomAmenities}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block py-8 h-screen w-full max-w-4xl">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      Amenities
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalRoomAmenities} />
                    </span>
                  </div>
                  <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                    {amenities
                      ?.filter((_, i) => i < 1212)
                      ?.map((item: any) => (
                        <div
                          key={item?.name}
                          className="flex items-center py-2.5 sm:py-4 lg:py-5 space-x-5 lg:space-x-8"
                        >
                          {/* <i
                              className={`text-4xl text-neutral-6000 las ${item.icon}`}
                            ></i> */}
                          <CheckCircle2 size={25} strokeWidth={1.5} />
                          <span>{item.name}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };
  const renderMotalAmenities = () => {
    return (
      <Transition appear show={isOpenModalAmenities} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModalAmenities}
        >
          <div className="min-h-screen px-4 text-center">
            {" "}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block py-8 h-screen w-full max-w-4xl">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      Amenities
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalAmenities} />
                    </span>
                  </div>
                  <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                    {stayDetail?.Amenities?.filter((_, i) => i < 1212)?.map(
                      (item) => (
                        <div
                          key={item?.name}
                          className="flex items-center py-2.5 sm:py-4 lg:py-5 space-x-5 lg:space-x-8"
                        >
                          <CheckCircle2 size={25} strokeWidth={1.5} />
                          <span>{item?.name}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  const renderSection5 = () => {
    return (
      <div className="listingSection__wrap bg-grey">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Host Information</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* host */}
        <div className="flex items-center space-x-4">
          <Avatar
            hasChecked
            hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
            sizeClass="h-14 w-14"
            radius="rounded-full"
            imgUrl={stayDetail?.vendor?.profileMedia?.path}
          />
          <div>
            <a className="block text-xl font-medium" href="##">
              {stayDetail.vendor.name}
            </a>
            <div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
              <span> {stayDetail.vendor.email}</span>
            </div>
          </div>
        </div>

        {/* desc */}
        {/* <span className="block text-neutral-6000 dark:text-neutral-300">
            Providing lake views, The {stayDetail.title} in {stayDetail.city}{" "}
            provides accommodation, an outdoor swimming pool, a bar, a shared
            lounge, a garden and barbecue facilities...
          </span> */}

        {/* info */}
        <div className="block text-neutral-500 dark:text-neutral-400 space-y-2.5">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Joined {stayDetail?.vendor?.createdAt.split("T")[0]}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderSection6 = () => {
    const handleHoverChange = (hoverValue: any) => {
      setCurrentHover(hoverValue);
    };
    const handleSubmit = async (e: any) => {
      // e.preventDefault();
      try {
        const response = await axiosInstance.post(
          `/reviews/${stayDetail.id}`,
          {
            content: review,
            rating: currentHover,
            reviewable_type: "Property",
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 401) {
          Swal.fire(
            "Review Not Submitted",
            "You have Not Signed into the page Please sign and try again",
            "warning"
          );
          navigate("/login");
        }

        if (response.status === 200) {
          setReview("");
          Swal.fire(
            "Review Submitted",
            "Your review has been submitted successfully",
            "success"
          );
          getPropertyById();
        }
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div className="listingSection__wrap bg-grey">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">
          Reviews ({stayDetail?.Reviews?.length} reviews)
        </h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* Content */}
        <div className="space-y-5">
          <FiveStartIconForRate
            iconClass="w-6 h-6"
            className="space-x-0.5"
            currentHover={currentHover}
            onHoverChange={handleHoverChange}
          />
          <div className="relative">
            <Input
              fontClass=""
              sizeClass="h-16 px-4 py-3"
              rounded="rounded-3xl"
              value={review}
              placeholder="Share your thoughts ..."
              onChange={(e) => setReview(e.target.value)}
            />
            <ButtonCircle
              onClick={(e) => handleSubmit(e)}
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              size=" w-12 h-12 "
            >
              <ArrowRightIcon className="w-5 h-5" />
            </ButtonCircle>
          </div>
        </div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <CommentListing className="py-8" data={stayDetail?.Reviews} />

          {/* <CommentListing className="py-8" />  */}

          {/* {stayDetail?.Reviews?.length > 20 && (
            <div className="pt-8">
              <ButtonSecondary>View more 20 reviews</ButtonSecondary>
            </div>
          )} */}
        </div>
      </div>
    );
  };

  const renderSection7 = () => {
    return (
      <div className="listingSection__wrap bg-grey">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Location</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {stayDetail?.title} Near to {stayDetail?.address}{" "}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* MAP */}
        <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3 ring-1 ring-black/10 rounded-xl z-0">
          <div className="rounded-xl overflow-hidden z-0"></div>
          <div
            className="rounded-xl overflow-hidden z-0"
            dangerouslySetInnerHTML={{ __html: position }}
          />
        </div>
      </div>
    );
  };

  const renderSection8 = () => {
    return (
      <div className="listingSection__wrap bg-grey">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Things to know</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Cancellation policy</h4>
          <ul>
            <li>
              -For any update, the customer shall pay applicable
              cancellation/modification charges.{" "}
            </li>
            <li>
              -Modified bookings will be subject to availability an revised
              booking policy of the hotel.
            </li>
            <li>
              -The cancellation/modification charges are standard and any waiver
              is entirely on the hotel's discretion.
            </li>
            <li>
              - Any e-coupon discount on the original booking shall be forfeited
              in the event of cancellation or modification. Hotel Policy CHILD
              POLICY Children below 5 years are not chargeable. Above 5 years
              will be charged as per the tariff.
            </li>
            <li>
              <strong>TERMS AND CONDITION</strong>
            </li>
            <li>
              - According to government regulations, a valid photo ID has to be
              carried by every person above the age of 18 staying at Crossroads
              B&B. The identification proofs accepted are Driver's License,
              Voters Card, passport, Ration Card. Without a valid ID the guest
              will not be allowed to check in. The primary guest checking in to
              the hotel must be at least 18 years of age.
            </li>
            <li>
              - After booking you will be sent an email confirmation with the
              hotel phone number. You can contact the hotel directly for early
              check-in or late check-out. Early check-in or late check-out is
              subject to availability and may be chargeable.
            </li>
            <li>
              - This is a couple friendly property. Unmarried/Unrelated couples
              are allowed to check-in. Local ID's can be presented as proof of
              identification.
            </li>
            <li>
              - Final rights of admission/check-in remain reserved with the
              hotel management & refund can be denied in-case any misconduct is
              observed by the hotel management.
            </li>
            <li>
              - The room tariff includes all taxes. the amount paid for the room
              does not include charges for optional services and facilities.
            </li>
          </ul>
          {/* <p>
            The standard check-in time is 2:00 PM and the standard check-out
            time is 11:30 AM.
          </p> */}
          <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            {/* {stayDetail.cancellation_policy} */}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Check-in time</h4>
          <div className="mt-3 text-neutral-500 dark:text-neutral-400 max-w-md text-sm sm:text-base">
            <div className="flex space-x-10 justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <span>Check-in</span>
              <span>{stayDetail?.checkin}</span>
            </div>
            <div className="flex space-x-10 justify-between p-3">
              <span>Check-out</span>
              <span>{stayDetail?.checkout}</span>
            </div>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        {stayDetail.special_note && (
          <div>
            <h4 className="text-lg font-semibold">Special Note</h4>
            <div className="prose sm:prose">
              <ul
                className="mt-3 text-neutral-500 dark:text-neutral-400 space-y-2"
                dangerouslySetInnerHTML={{ __html: stayDetail.special_note }}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSidebar = (room: Room) => {
    const handleSubmit = async (event: any) => {
      event.preventDefault();
      if (!checkin || !checkout || !totalGuests) {
        return;
      } else {
        try {
          const response = await axiosInstance.post("/enquiry", {
            checkin: checkin?.toISOString(),
            checkout: checkout?.toISOString(),
            guests: totalGuests,
            propertyId: stayDetail?.id,
            message: "Please Accept the request",
            rooms: JSON?.stringify(roomTypeCounts),
            amount: totalPrice,
          });
          if (response && response.data) {
            console.log(response.data);
          } else if (response.status === 401) {
            navigate("/login");
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    return (
      <>
        <div className="listingSectionSidebar__wrap shadow-xl bg-grey">
          {/* PRICE */}
          <span className="text-md font-semibold"></span>
          <div className="flex justify-between flex-col">
            <span className="text-sm font-semibold">Starting At</span>
            <span className="text-3xl font-semibold">
              ₹{startingPrice}
              <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
                /night
              </span>
            </span>
            {/* <StartRating /> */}
          </div>

          <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl ">
            <StayDatesRangeInput
              className="flex-1 z-[11]"
              prices={parsedPrices}
              impDates={parsedDates}
              blockPrice={room?.blockPrice}
              onCheckinChange={handleCheckinChange}
              onCheckoutChange={handleCheckoutChange}
            />
            <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
            <GuestsInput
              className="flex-1"
              onTotalGuestsChange={handleTotalGuestsChange}
            />
          </form>
          <div className="flex flex-col space-y-4">
            {Object?.entries(totalPrices)?.map(([roomType, totalPrice]) => {
              if (roomTypeCounts[roomType]) {
                return (
                  <div
                    key={roomType}
                    className="flex justify-between text-neutral-6000 dark:text-neutral-300"
                  >
                    <span>{`${roomType} x ${
                      totalDays >= 1 ? totalDays : 0
                    } night x ${roomTypeCounts[roomType] || 0} rooms`}</span>
                    <span className="flex items-center">
                      ₹{totalPrice * (roomTypeCounts[roomType] || 0)} /-
                    </span>
                  </div>
                );
              } else {
                return "";
              }
            })}

            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
              <span>Service charge</span>
              <span>₹ 0 /-</span>
            </div>
            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300"></div>
            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300"></div>
            <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{totalPrice} /-</span>
            </div>
          </div>
          {/* SUBMIT */}
          <ButtonPrimary
            onClick={(e: any) => {
              setIsEnquiryModalOpen(true);
            }}
          >
            Enquiry
          </ButtonPrimary>
          {renderModalEnquiry()}
          {renderOtpNumber()}
          {renderOtpVerification()}
          {renderAnimationModal()}
        </div>
      </>
    );
  };

  const renderModalEnquiry = () => {
    function closeModalEnquiry() {
      setIsEnquiryModalOpen(false);
    }

    const sendEnquiry = async (values: any) => {
      if (totalPrice === 0) {
        toast.error("Please select Rooms");
      } else {
        setLoading(true);
        console.log(values);
        const details = {
          checkin: checkin?.toISOString(),
          checkout: checkout?.toISOString(),
          guests: totalGuests,
          propertyId: stayDetail?.id,
          rooms: JSON.stringify(roomTypeCounts),
          amount: totalPrice,
          ...values,
        };
        try {
          const res = await axiosInstance.post(
            "/enquiry/createEnquiry",
            details
          );
          console.log(res);
          if (res && res.data) {
            setIsAnimation(true);
            setIsEnquiryModalOpen(false);
          } else {
            setIsEnquiryModalOpen(false);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    return (
      <Transition appear show={isEnquiryModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModalEnquiry}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block py-8 h-auto w-full max-w-xl">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      Enquiry Form
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalEnquiry} />
                    </span>
                  </div>
                  <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                    <Formik
                      initialValues={enquiryDetails}
                      onSubmit={sendEnquiry}
                      validationSchema={enquirySchema}
                      enableReinitialize={true}
                    >
                      {() => (
                        <Form className="grid grid-cols-1 gap-6 mt-10 mb-10">
                          <label className="block">
                            <span className="text-neutral-800 dark:text-neutral-200">
                              First Name
                            </span>
                            <Field
                              type="text"
                              name="first_name"
                              placeholder="Enter Your First Name"
                              className="mt-1"
                            />
                            <ErrorMessage
                              className="text-rose-500"
                              name="first_name"
                            />
                          </label>
                          <label className="block">
                            <span className="text-neutral-800 dark:text-neutral-200">
                              Last Name
                            </span>
                            <Field
                              type="text"
                              name="last_name"
                              placeholder="Enter Your Last Name"
                              className="mt-1"
                            />
                            <ErrorMessage
                              className="text-rose-500"
                              name="last_name"
                            />
                          </label>
                          <label className="block">
                            <span className="text-neutral-800 dark:text-neutral-200">
                              Email address
                            </span>
                            <Field
                              type="email"
                              name="email"
                              placeholder="Enter Your Email"
                              className="mt-1"
                            />
                            <ErrorMessage
                              className="text-rose-500"
                              name="email"
                            />
                          </label>
                          <label className="block">
                            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                              Mobile Number
                            </span>
                            <Field
                              type="text"
                              className="mt-1"
                              name="phone"
                              placeholder="Enter Your Number"
                              
                            />
                            <ErrorMessage
                              className="text-rose-500"
                              name="phone"
                            />
                          </label>
                          <label className="block">
                            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                              Message
                            </span>
                            <Field
                              type="text"
                              name="message"
                              className="mt-1"
                              placeholder="Any message to Vendor"
                            />
                            <ErrorMessage
                              className="text-red-200"
                              name="message"
                            />
                          </label>
                          <label>
                            <span
                              className="flex items-center text-neutral-900 dark:text-neutral-200"
                              style={{ fontSize: "20px" }}
                            >
                              Looking for customized{" "}
                              <span
                                style={{
                                  color: "green",
                                  marginLeft: "3px",
                                  marginRight: "5px",
                                }}
                              >
                                {" "}
                                Itinerary
                              </span>
                              <Field
                                type="checkbox"
                                name="itinerary"
                                className="mt-1"
                                value="true"
                                placeholder="Do you require a customized iterary package"
                              />
                            </span>

                            <ErrorMessage
                              className="text-red-200"
                              name="itinerary"
                            />
                          </label>
                          
                          <ButtonPrimary type="submit" className="btn btn-primary">
                            {!loading && "Send Enquiry"}
                            {loading && (
                              <span
                                className="indicator-progress"
                                style={{ display: "block" }}
                              >
                                Please wait...{" "}
                                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                              </span>
                            )}
                          </ButtonPrimary>
                        </Form>
                      )}
                    </Formik>
                  </div>
                  {renderOtpNumber()}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  const renderOtpNumber = () => {
    return (
      <Transition appear show={isOTPNumber} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={ClosedModalOTP}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block py-8 h-auto w-full max-w-xl">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      OTP Generator
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={ClosedModalOTP} />
                    </span>
                  </div>
                  <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                    <form
                      className="grid grid-cols-1 gap-6 mt-10 mb-10"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <label className="block">
                        <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                          Mobile Number
                        </span>
                        <Input
                          type="Number"
                          className="mt-3"
                          placeholder="Enter Your Number"
                        />
                      </label>

                      <ButtonPrimary
                        type="submit"
                        onClick={OtpGenratorVerified}
                      >
                        Verify
                      </ButtonPrimary>
                    </form>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  const renderOtpVerification = () => {
    return (
      <Transition appear show={isOTPVerified} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={ClosedModalVerified}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block py-8 h-auto w-full max-w-xl">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      OTP Verification
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={ClosedModalVerified} />
                    </span>
                  </div>
                  <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                    <form
                      className="grid grid-cols-1 gap-6 mt-10 mb-10"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <label className="block">
                        <h3 className="text-center">
                          An OTP is sent to +91 79XXXXXX07 SuccessFully !!!
                        </h3>
                        <Input
                          type="text"
                          className="mt-5"
                          placeholder="Enter Your 6 Digit Number"
                          maxLength={6}
                        />
                      </label>

                      <ButtonPrimary type="submit" onClick={AnimationModal}>
                        Submit
                      </ButtonPrimary>
                    </form>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  const renderAnimationModal = () => {
    return (
      <Transition appear show={isAnimation} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={ClosedModalAnimation}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block py-8 h-auto w-full max-w-xl">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      Enquiry
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={ClosedModalAnimation} />
                    </span>
                  </div>
                  <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                    <form
                      className="grid grid-cols-1 gap-6 mt-10 mb-10 text-center"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div className="flex justify-center items-center">
                        <Success />
                      </div>
                      <h2 className="text-2xl font-semibold">
                        Yay Enquiry Successfull 🥳
                      </h2>
                      <strong style={{ fontSize: "20px" }}>
                        We also Offer <span style={{color:'green'}}>Train</span> and <span style={{color:'green'}}>Flight</span>{" "}
                        Ticket Booking Services
                      </strong>

                      {/* <Error /> */}

                      <ButtonPrimary
                        type="submit"
                        onClick={ClosedModalAnimation}
                      >
                        Go Back
                      </ButtonPrimary>
                    </form>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  return (
    <DetailPagetLayout
      startingPrice={startingPrice}
      totalPrice={totalPrice}
      onDateChange={handleDatesChange}
      // calculateTotalPrice={calculateTotalPrice}
    >
      <div className="nc-ListingStayDetailPage">
        {/*  HEADER */}
        <header className="rounded-md sm:rounded-xl">
          <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
            <div
              className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer "
              onClick={handleOpenModalImageGallery}
            >
              <img
                className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                src={stayDetail.featuredPropertyMedia.path}
                alt=""
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
              <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>
            {images
              ?.filter((_, i) => i >= 1 && i < 5)
              ?.map((item: any, index) => (
                <div
                  key={index}
                  className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                    index >= 3 ? "hidden sm:block" : ""
                  }`}
                >
                  <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
                    <img
                      className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                      src={item?.path || ""}
                      alt=""
                      sizes="400px"
                    />
                  </div>
                  <div
                    className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={handleOpenModalImageGallery}
                  />
                </div>
              ))}

            <button
              className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10"
              onClick={handleOpenModalImageGallery}
            >
              <Squares2X2Icon className="w-5 h-5" />
              <span className="ml-2 text-neutral-800 text-sm font-medium">
                Show all photos
              </span>
            </button>
          </div>
        </header>

        {/* MAIN */}
        <main className=" relative z-10 mt-11 flex flex-col lg:flex-row ">
          {/* CONTENT */}
          <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
            {renderSection1()}

            {Object.entries(roomTypes).map(([type, rooms], index) => {
              const roomToRender = rooms.length > 0 ? [rooms[0]] : [];

              return (
                <div key={type}>
                  {roomToRender?.length > 0 && (
                    <ul>
                      {roomToRender?.map((room) => (
                        <li key={room?.id}>{renderCards(room, index)}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
            {renderSection2()}
            {renderSection3()}
            {renderSection7()}
            {renderSection8()}
            {renderSection5()}
            {renderSection6()}
          </div>
          <ListingImageGallery
            images={images}
            isShowModal={imageModal}
            onClose={handleCloseModalImageGallery}
          />

          <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
            {stayDetail?.room[0] && (
              <div className="sticky top-28">
                {renderSidebar(stayDetail?.room[0])}
              </div>
            )}
          </div>
        </main>
      </div>
    </DetailPagetLayout>
  );
};

export default function ListingStayDetailPage() {
  return <StayDetailPageContainer />;
}
