import React, { FC } from "react";
import { Link } from "react-router-dom";

interface Props {
  href?: string;
}

const ButtonSubmit: FC<Props> = ({ href = "#" }) => {
  return (
    <Link
      to={href}
      type="button"
      className="h-14 md:h-16 w-full md:w-16 rounded-full bg-brown hover:bg-brown flex items-center justify-center text-neutral-50 focus:outline-none"
    >
      <span className="mr-3 md:hidden">Search</span>
      <i className="las la-search text-2xl"></i>
    </Link>
  );
};

export default ButtonSubmit;
