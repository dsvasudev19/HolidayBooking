import React, { FC, useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import Input from "shared/Input/Input";

export interface NcInputCabProps {
  label?: string;
  subLabel?: string;
  className?: string;
  name: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const NcInputCab: FC<NcInputCabProps> = ({
  className = "w-full",
  label = "",
  name,
  defaultChecked,
  onChange,
}) => {
  const [showInputField, setShowInputField] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowInputField(e.target.checked);
    onChange && onChange(e.target.checked);
  };

  const renderLabel = () => {
    return (
      <div className={`flex text-sm sm:text-base ${className}`}>
        <input
          id={name}
          name={name}
          type="checkbox"
          className="focus:ring-action-primary h-6 w-6 text-primary-500 border-primary rounded border-neutral-500 bg-white dark:bg-neutral-700  dark:checked:bg-primary-500 focus:ring-primary-500"
          defaultChecked={defaultChecked}
          onChange={handleCheckboxChange}
        />
        {label && (
          <label
            htmlFor={name}
            className="ml-3.5 flex flex-col flex-1 justify-center"
          >
            <span className=" text-neutral-900 dark:text-neutral-100">
              {label}
            </span>
          </label>
        )}
      </div>
    );
  };

  return (
    <div
      className={`nc-NcInputCab flex items-center justify-between space-x-5 ${className}`}
      data-nc-id="NcInputCab"
    >
      {label && renderLabel()}

      {showInputField && (
        <div className="w-full">
          <Input
            type="text"
            placeholder="Enter Your Location"
            className="mt-1"
          />
        </div>
      )}
    </div>
  );
};

export default NcInputCab;
