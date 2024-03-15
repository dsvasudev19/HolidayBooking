import React, { FC } from "react";
import Logo from "shared/Logo/Logo";
import Navigation from "shared/Navigation/Navigation";
import SearchDropdown from "./SearchDropdown";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import MenuBar from "shared/MenuBar/MenuBar";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import HeroSearchForm2MobileFactory from "components/HeroSearchForm2Mobile/HeroSearchForm2MobileFactory";
import { useAuth } from "../../AuthContext";
import { Link } from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";

export interface MainNav1Props {
  className?: string;
}

const MainNav1: FC<MainNav1Props> = ({ className = "" }) => {
  const { user } = useAuth();
  return (
    <div className={`nc-MainNav1 relative z-10 ${className}`}    style={{
      backgroundImage: 'linear-gradient(to right top, #d5e0e1, #d0dedf, #ccdbdc, #c7d9da, #c2d6d8)'
    }}>
      <div className="px-4 lg:container py-4 lg:py-5 relative flex justify-between items-center">
        <div className="hidden md:flex justify-start flex-1 items-center space-x-4 sm:space-x-10">
          <Logo />
          <Navigation />
        </div>

        <div className="lg:hidden flex-[3] max-w-lg !mx-auto md:px-3">
          <HeroSearchForm2MobileFactory />
        </div>

        <div className="hidden md:flex flex-shrink-0 items-center justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100">
          <div className="hidden xl:flex items-center space-x-0.5">
     
            <div className="px-1" />
            {user ? (
              // User is authenticated, show logout button

              // <button onClick={logout}>Logout</button>
              <Link to="/UserAccount">
                <Avatar
                  // hasChecked
                  hasCheckedClass="w-6 h-6 -top-0.5 right-2"
                  sizeClass="w-12 h-12"
                />
              </Link>
            ) : (
              <ButtonPrimary href="/login">Sign in</ButtonPrimary>
            )}
          </div>
          <div className="flex xl:hidden items-center">
            <div className="px-0.5" />
            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
