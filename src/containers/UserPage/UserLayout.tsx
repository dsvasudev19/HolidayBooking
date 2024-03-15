import React from "react";
import { FC } from "react";
import { NavLink } from "react-router-dom";

export interface UserLayoutProps {
  children?: React.ReactNode;
}

const UserLayout: FC<UserLayoutProps> = ({ children }) => {
  return (
    <div className="nc-UserLayoutProps"   style={{
      backgroundImage: 'linear-gradient(to right top, #d5e0e1, #d0dedf, #ccdbdc, #c7d9da, #c2d6d8)'
    }}>
      <div className="border-b border-neutral-200 dark:border-neutral-700 pt-12 bg-red dark:bg-neutral-800">
        <div className="container">
          <div className="flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
            <NavLink
              to="/UserAccount"
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${
                  !isActive ? "border-transparent" : "border-primary-500"
                }`
              }
            >
              Account / Profile
            </NavLink>
            <NavLink
              to="/EnquiryPage"
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${
                  !isActive ? "border-transparent" : "border-primary-500"
                }`
              }
            >
              Enquries
            </NavLink>
            <NavLink
              to="/BookingsPage"
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${
                  !isActive ? "border-transparent" : "border-primary-500"
                }`
              }
            >
              Bookings
            </NavLink>
            <NavLink
              to="/SettingsPage"
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${
                  !isActive ? "border-transparent" : "border-primary-500"
                }`
              }
            >
              Settings
            </NavLink>
            <NavLink
              to="/BillingPage"
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${
                  !isActive ? "border-transparent" : "border-primary-500"
                }`
              }
            >
              Billing
            </NavLink>
          </div>
        </div>
      </div>
      <div className="container pt-14 sm:pt-20 pb-24 lg:pb-32">{children}</div>
    </div>
  );
};

export default UserLayout;
