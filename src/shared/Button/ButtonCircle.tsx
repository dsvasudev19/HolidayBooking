import React, { ButtonHTMLAttributes } from "react";
import twFocusClass from "utils/twFocusClass";

export interface ButtonCircleProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: string;
}

const ButtonCircle: React.FC<ButtonCircleProps> = ({
  className = " ",
  size = " w-9 h-9 ",
  ...args
}) => {
  return (
    <button
      className={
        `ttnc-ButtonCircle flex items-center justify-center rounded-full !leading-none disabled:bg-opacity-70 bg-brown hover:bg-brown text-neutral-50 ${className} ${size} ` 
      }
      {...args}
    />
  );
};

export default ButtonCircle;
