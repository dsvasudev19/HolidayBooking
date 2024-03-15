import React, { FC } from "react";
// type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
interface Props {
  dayOfMonth: number;
  date?: Date | undefined;

}

const NewDatePickerCustomDay: FC<Props> = ({
  dayOfMonth,
  date,

}) => {
  return (
    <div>
      <span className="react-datepicker__day_span">
        <div className="text-lg mt-0" style={{ lineHeight: "1.2rem" }}>
          {dayOfMonth}
        </div>
      </span>
    </div>
  );
};

export default NewDatePickerCustomDay;
