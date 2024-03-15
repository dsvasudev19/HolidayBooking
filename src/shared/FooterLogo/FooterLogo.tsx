import React from "react";
import { Link } from "react-router-dom";
import logoImg from "images/logos/FooterLogo.png";
import logoLightImg from "images/logos/FooterLogo.png";
import LogoSvgFoot from "./LogoSvgFoot";

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const FooterLogo: React.FC<LogoProps> = ({
  img = logoImg,
  imgLight = logoLightImg,
  className = "w-30",
}) => {
  return (
    <Link
      to="/"
      className={`ttnc-logo inline-block text-primary-6000 focus:outline-none focus:ring-0 ${className} flex items-center justify-center mt-[-40px]`}
    >
      <LogoSvgFoot />
    </Link>
  );
};

export default FooterLogo;
