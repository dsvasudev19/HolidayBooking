import DatePicker from "react-datepicker";
import React, { FC, useEffect, useState } from "react";
import DatePickerCustomHeaderTwoMonth from "components/DatePickerCustomHeaderTwoMonth";
import { useSearch } from "SearchContext";
export interface StayDatesRangeInputProps {
  className?: string;
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
  className = "",
}) => {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(Date.now() + 24 * 60 * 60 * 1000)
  );
  const { updateCheckin, updateCheckout, searchcheckin, searchcheckout } =
    useSearch();
  const [endDate, setEndDate] = useState<Date | null>(
    new Date(Date.now() + 48 * 60 * 60 * 1000)
  );
  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    updateCheckin(start);
    updateCheckout(end);
  };

  useEffect(() => {
    setEndDate(searchcheckout);
    setStartDate(searchcheckin);
  }, []);
  return (
    <div>
      <div className="p-5">
        <span className="block font-semibold text-xl sm:text-2xl">
          {` When's your trip?`}
        </span>
      </div>
      <div
        className={`relative flex-shrink-0 flex justify-center z-10 py-5 ${className} `}
      >
        <DatePicker
          selected={startDate}
          onChange={onChangeDate}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          monthsShown={2}
          showPopperArrow={false}
          inline
          renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
        />
      </div>
    </div>
  );
};

export default StayDatesRangeInput;
