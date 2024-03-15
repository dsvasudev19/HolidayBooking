import DatePickerCustomDay from "components/DatePickerCustomDay";
import DatePickerCustomHeaderTwoMonth from "components/DatePickerCustomHeaderTwoMonth";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

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

const SectionDateRange = ({
  prices,
  impDates,
  blockPrice,
  checkin,
  checkout,
  setCheckout,
  setCheckin,
}: {
  prices: Prices;
  impDates: string[] | any[];
  blockPrice: string;
  checkout: Date | null;
  checkin: Date | null;
  setCheckout: any;
  setCheckin: any;
}) => {
  const [startDate, setStartDate] = useState<any>(
    new Date(Date.now() + 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState<any>(
    new Date(Date.now() + 48 * 60 * 60 * 1000)
  );
  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    if (end) {
      setEndDate(end);
    }
    if (start) {
      setStartDate(start);
    }
  };

  const renderSectionCheckIndate = (
    prices: Prices,
    impDates: string[],
    blockPrice: string
  ) => {
    return (
      <div className="listingSection__wrap overflow-hidden">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Availability</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Prices may increase on weekends or holidays
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* CONTENT */}

        <div className="">
          <DatePicker
            onChange={onChangeDate}
            selectsRange
            minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
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
          />
        </div>
      </div>
    );
  };
  return renderSectionCheckIndate(prices, impDates, blockPrice);
};

export default SectionDateRange;
