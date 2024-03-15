import Button, { ButtonProps } from "shared/Button/Button";
import React from "react";

export interface ButtonSecondaryProps extends ButtonProps {}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  className = " ",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonSecondary font-medium border bg-white border-brown text-neutral-700 dark:bg-brown dark:text-neutral-300 dark:border-brown hover:bg-brown hover:text-white dark:hover:bg-brown dark:hover:text-white ${className}`}
      {...args}
    />
  );
};

export default ButtonSecondary;
