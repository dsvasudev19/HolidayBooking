import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ReactDatePickerCustomHeaderProps } from "react-datepicker";

const DatePickerCustomHeaderTwoMonth = ({
  monthDate,
  customHeaderCount,
  decreaseMonth,
  increaseMonth,
}: ReactDatePickerCustomHeaderProps) => {
  return (
    <div>
      {/* Button for navigating to the previous month */}
      <button
        aria-label="Previous Month"
        className={`react-datepicker__navigation react-datepicker__navigation--previous absolute -top-1 left-0 flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
          customHeaderCount === 1 ? "invisible" : ""
        }`}
        onClick={decreaseMonth}
        type="button"
      >
        <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous">
          <ChevronLeftIcon className="w-5 h-5" />
        </span>
      </button>

      {/* Displaying the current month and year */}
      <span className="react-datepicker__current-month">
        {monthDate.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </span>
      {/* Button for navigating to the next month */}
      <button
        aria-label="Next Month"
        className={`react-datepicker__navigation react-datepicker__navigation--next absolute -top-1 -right-0 flex items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full ${
          customHeaderCount === 0 ? "invisible" : ""
        }`}
        onClick={increaseMonth}
        type="button"
      >
        <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--next">
          <ChevronRightIcon className="w-5 h-5" />
        </span>
      </button>
    </div>
  );
};

export default DatePickerCustomHeaderTwoMonth;
