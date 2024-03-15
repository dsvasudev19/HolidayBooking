import { CustomLink } from "data/types";
import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import twFocusClass from "utils/twFocusClass";

const DEMO_PAGINATION: CustomLink[] = [
  {
    label: "1",
    href: "#",
  },
  {
    label: "2",
    href: "#",
  },
  {
    label: "3",
    href: "#",
  },
  {
    label: "4",
    href: "#",
  },
];

export interface PaginationProps {
  total: number;
  onPageChange: (selectedPage: number) => void;
  className?: string;
}

const Pagination: FC<PaginationProps> = ({
  total,
  onPageChange,
  className = "",
}) => {
  const [activePage, setActivePage] = useState(1);

  const handlePageClick = (page: number) => {
    setActivePage(page);
    onPageChange(page);
  };
  const renderItem = (page: number) => (
    <span
      key={page}
      className={`inline-flex w-11 h-11 items-center justify-center rounded-full ${
        page === activePage
          ? "bg-brown text-white"
          : "bg-white hover:bg- border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-brown dark:border-brown"
      } ${twFocusClass()}`}
      onClick={() => handlePageClick(page)}
      style={{cursor:"pointer"}}
    >
      {page}
    </span>
  );

  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
    >
      {/* {DEMO_PAGINATION.map(renderItem())} */}
      {Array.from({ length: total }, (_, index) => index + 1).map((page) =>
        renderItem(page)
      )}
    </nav>
  );
};

export default Pagination;
