import React from "react";
import FooterLogo from "./FooterLogo";
import SocialsList from "shared/SocialsList/SocialsList";

export interface CustomLink {
  href: string;
  label: string;
}

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "Our Menu",
    menus: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/HotelListing", label: "Stays" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    id: "1",
    title: "Explore",
    menus: [
      { href: "/HotelListing", label: "DudhSagar Water Falls" },
      { href: "/HotelListing", label: "Gokarna" },
      { href: "/HotelListing", label: "Mahabaleshwar" },
      { href: "/UserAccount", label: "UserPage" },
    ],
  },
  {
    id: "2",
    title: "Bookings",
    menus: [
      { href: "/HotelListing", label: "Hotels" },
      { href: "/HotelListing", label: "Villas" },
      { href: "/HotelListing", label: "Resorts" },
      { href: "/HotelListing", label: "Stays" },
    ],
  },
  {
    id: "4",
    title: "Policies",
    menus: [
      { href: "/TermsConditions", label: "Terms & Conditions" },
      { href: "/PrivacyPolicy", label: "Privacy Policy" },
      { href: "/CancellationPolicy", label: "Cancellation Policy" },
      { href: "/RefundPolicy", label: "Refund Policy" },
    ],
  },
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => (
    <div key={index} className="text-sm text-center">
      <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
        {menu.title}
      </h2>
      <ul className="mt-5 space-y-4">
        {menu.menus.map((item, index) => (
          <li key={index}>
            <a
              className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
              href={item.href}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="nc-Footer relative py-24 lg:py-28 border-t border-neutral-200 dark:border-neutral-700">
      <div className="container mx-auto grid grid-cols-1 gap-y-10 sm:gap-y-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10">
        <div className="grid grid-cols-4 gap-0 col-span-full md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col items-center justify-center">
          <div className="col-span-2 md:col-span-1 text-center">
            <FooterLogo />
          </div>
          <div className="col-span-2 flex items-center md:col-span-3 justify-center">
            <SocialsList />
          </div>
        </div>
        {widgetMenus.map(renderWidgetMenuItem)}
      </div>
    </div>
  );
};

export default Footer;
