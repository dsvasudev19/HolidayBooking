import Button, { ButtonProps } from "shared/Button/Button";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonPrimary  bg-brown hover:bg-brown text-neutral-50 focus:outline-none focus:border-none focus:ring-2 focus:bg-brown active:border-none active:ring-2 active:bg-brown ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;
