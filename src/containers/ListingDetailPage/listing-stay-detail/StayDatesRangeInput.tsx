import React, { Fragment, useState, FC, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";
import ClearDataButton from "components/HeroSearchForm/ClearDataButton";
import DatePickerCustomHeaderTwoMonth from "components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "components/DatePickerCustomDay";
import { useSearch } from "SearchContext";
interface Prices {
  sunday: number;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
}
interface StayDatesRangeInputProps {
  className?: string;
  prices: Prices | any; // Assuming the type of prices
  impDates: any[] | [] | any; // Assuming the type of impDates
  blockPrice: string; // Assuming the type of blockPrice
  onCheckinChange: (checkin: Date | null) => void; // Callback to notify parent of checkin
  onCheckoutChange: (checkout: Date | null) => void;
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
  className = "flex-1",
  prices,
  impDates,
  blockPrice,
  onCheckinChange,
  onCheckoutChange,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(new Date(Date.now() + 24 * 60 * 60 * 1000))
  );
  const [endDate, setEndDate] = useState<Date | null>(
    new Date(new Date(Date.now() + 48 * 60 * 60 * 1000))
  );

  const { searchcheckin, searchcheckout, updateCheckin, updateCheckout } =
    useSearch();
  useEffect(() => {
    setEndDate(searchcheckout);
    setStartDate(searchcheckin);
    onCheckinChange(searchcheckin);
    onCheckoutChange(searchcheckout);
  }, [searchcheckin, searchcheckout]);

  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    updateCheckin(start);
    updateCheckout(end);
  };

  const renderInput = (
    prices: Prices,
    impDates: string[],
    blockPrice: string
  ) => {
    return (
      <>
        <div className="text-neutral-300 dark:text-neutral-400">
          <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow text-left">
          <span className="block xl:text-lg font-semibold">
            {startDate?.toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
            }) || "Add dates"}
            {endDate
              ? " - " +
                endDate?.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                })
              : ""}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {"Check in - Check out"}
          </span>
        </div>
      </>
    );
  };

  return (
    <Popover className={`StayDatesRangeInput z-10 relative flex ${className}`}>
      {({ open }) => (
        <>
          <Popover.Button
            className={`flex-1 flex relative p-3 items-center space-x-3 focus:outline-none ${
              open ? "shadow-lg" : ""
            }`}
          >
            {renderInput(prices, impDates, blockPrice)}
            {startDate && open && (
              <ClearDataButton onClick={() => onChangeDate([null, null])} />
            )}
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-auto xl:-right-10 right-0 z-10 mt-3 top-full w-screen max-w-md px-4 sm:px-0 lg:max-w-5xl">
              <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 p-8">
                <DatePicker
                  selected={searchcheckin}
                  onChange={onChangeDate}
                  startDate={searchcheckin}
                  endDate={searchcheckout}
                  minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
                  selectsRange
                  monthsShown={2}
                  showPopperArrow={false}
                  inline
                  renderCustomHeader={(p) => (
                    <DatePickerCustomHeaderTwoMonth {...p} />
                  )}
                  renderDayContents={(day, date) => (
                    <DatePickerCustomDay
                      dayOfMonth={day}
                      date={date}
                      prices={prices}
                      impDates={impDates}
                      blockPrice={blockPrice}
                    />
                  )}
                  className="w-full p-4 rounded-lg shadow-lg bg-white dark:bg-neutral-800"
                  dayClassName={() => "text-sm p-2"}
                  wrapperClassName="w-full" // Add this line to adjust DatePicker width
                  popperPlacement="bottom-end" // Adjusts DatePicker placement
                  popperModifiers={[
                    { name: "offset", options: { offset: [0, 10] } },
                  ]}
                />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default StayDatesRangeInput;
