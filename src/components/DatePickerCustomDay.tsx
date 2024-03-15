import React, { FC } from "react";
// type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
interface Props {
  dayOfMonth: number;
  date?: Date | undefined;
  prices: {
    sunday: number;
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
    [key: string]: number;
  };
  impDates: string[];
  blockPrice: string;
}

const DatePickerCustomDay: FC<Props> = ({
  dayOfMonth,
  date,
  prices,
  impDates,
  blockPrice,
}) => {
  const getDayName = (dayOfWeek: number): string => {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    return days[dayOfWeek];
  };

  const dayOfWeek: number | any = date?.getDay();
  // const price = prices[getDayName(dayOfWeek)]; // Get the price based on the day of the week
  // const price = impDates.includes(date?.toISOString()) ? blockPrice: prices[getDayName(dayOfWeek)];
  const price = impDates.includes(date?.toISOString() ?? "")
    ? blockPrice
    : prices[getDayName(dayOfWeek)];

  return (
    <div>
      <span className="react-datepicker__day_span">
        <div className="text-lg mt-0" style={{ lineHeight: "1.2rem" }}>
          {/* {dayOfMonth}
           */}
          {date?.getDate()}
          {/* <div className="mt-0 text-xxs text-white-300">₹ 2,000</div> */}
          <div className="mt-0 text-xxs text-white-300">₹{price}</div>
        </div>
      </span>
    </div>
  );
};

export default DatePickerCustomDay;
