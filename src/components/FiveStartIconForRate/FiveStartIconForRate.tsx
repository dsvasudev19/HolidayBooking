import { StarIcon } from "@heroicons/react/24/solid";
import React, { FC, useEffect } from "react";
import { useState } from "react";

export interface FiveStartIconForRateProps {
  className?: string;
  iconClass?: string;
  defaultPoint?: number;
}

const FiveStartIconForRate: FC<
  FiveStartIconForRateProps & {
    currentHover: number;
    onHoverChange: (hoverValue: number) => void;
  }
> = ({
  className = "",
  iconClass = "w-4 h-4",
  defaultPoint = 5,
  // currentHover,
  onHoverChange,
}) => {
  const [point, setPoint] = useState(defaultPoint);
  const [currentHover, setCurrentHover] = useState(0);

  useEffect(() => {
    setPoint(defaultPoint);
  }, [defaultPoint]);

  return (
    <div
      className={`nc-FiveStartIconForRate flex items-center text-neutral-300 ${className}`}
      data-nc-id="FiveStartIconForRate"
    >
      {[1, 2, 3, 4, 5].map((item) => {
        return (
          <StarIcon
            key={item}
            className={`${
              point >= item || currentHover >= item ? "text-yellow-500" : ""
            } ${iconClass}`}
            // onMouseEnter={() => {setCurrentHover(() => item),onHoverChange(item)}}
            // onMouseLeave={() => {setCurrentHover(() => 0),onHoverChange(item)}}
            // onClick={() => {setPoint(() => item),onHoverChange(item)}}
            onMouseEnter={() => {
              setCurrentHover(item);
              onHoverChange(item);
            }}
            onMouseLeave={() => {
              setCurrentHover(0);
              onHoverChange(item);
            }}
            onClick={() => {
              setPoint(item);
              onHoverChange(item);
            }}
          />
        );
      })}
    </div>
  );
};

export default FiveStartIconForRate;
