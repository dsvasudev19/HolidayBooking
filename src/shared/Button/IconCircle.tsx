import React, { ButtonHTMLAttributes } from "react";
import twFocusClass from "utils/twFocusClass";

export interface IconCircleProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: string;
}

const IconCircle: React.FC<IconCircleProps> = ({
  className = " ",
  size = " w-10 h-10 ",
  ...args
}) => {
  return (
    <button
      className={`ttnc-IconCircle flex items-center justify-center rounded-full !leading-none disabled:bg-opacity-70 bg-brown hover:bg-brown text-neutral-50 ${className} ${size} `}
      {...args}
    />
  );
};

export default IconCircle;
