import { SocialType } from "shared/SocialsShare/SocialsShare";
import React, { FC } from "react";
import ButtonCircle from "shared/Button/ButtonCircle";
import IconCircle from "shared/Button/IconCircle";

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  socials?: SocialType[];
}

const socialsDemo: SocialType[] = [
  {
    name: "Facebook",
    icon: "lab la-facebook-square",
    href: "https://www.facebook.com/solitary.holydays",
  },
  {
    name: "Instagram",
    icon: "lab la-instagram",
    href: "https://www.instagram.com/solitary_holydays/",
  },
  {
    name: "Whatsapp",
    icon: "lab la-whatsapp",
    href: "https://wa.me/6300685881",
  },
];

const SocialsList: FC<SocialsListProps> = ({
  className = "",
  itemClass = "block",
  socials = socialsDemo,
}) => {
  return (
    <nav
      className={`nc-SocialsList flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300 ${className} mt-5`}
      data-nc-id="SocialsList"
    >
      {socials.map((item, i) => (
        <a
          key={i}
          className={`${itemClass} text-2xl`}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.name}
        >
          <IconCircle>
            <i className={item.icon}></i>
          </IconCircle>
        </a>
      ))}
    </nav>
  );
};

export default SocialsList;
