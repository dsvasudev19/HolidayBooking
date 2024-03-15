import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header3 from "components/Header/Header3";
import Header from "components/Header/Header";
// import {
//   ShoppingBagIcon as ShoppingCartIcon,
//   Cog8ToothIcon as CogIcon,
// } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
// import { Popover, Transition } from "@headlessui/react";
import { PathName } from "routers/types";

export type SiteHeaders = "Header 1" | "Header 2" | "Header 3";

// interface HomePageItem {
//   name: string;
//   slug: PathName;
// }

let OPTIONS = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};
let OBSERVER: IntersectionObserver | null = null;
const PAGES_HIDE_HEADER_BORDER: PathName[] = [
  "/home-3",
  "/listing-car-detail",
  "/listing-experiences-detail",
  "/listing-stay-detail",
];

const SiteHeader = () => {
  const anchorRef = React.useRef<HTMLDivElement>(null);

  // let [headers] = React.useState<SiteHeaders[]>([
  //   "Header 1",
  //   "Header 2",
  //   "Header 3",
  // ]);

  // let [homePages] = React.useState<HomePageItem[]>([
  //   {
  //     name: "Home Main",
  //     slug: "/",
  //   },
  //   {
  //     name: "Real Estate",
  //     slug: "/home-2",
  //   },
  //   {
  //     name: "Home 2",
  //     slug: "/home-3",
  //   },
  // ]);
  const [headerSelected, setHeaderSelected] =
    React.useState<SiteHeaders>("Header 1");

  const [isTopOfPage, setIsTopOfPage] = React.useState(window.pageYOffset < 5);
  const location = useLocation();

  const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      setIsTopOfPage(entry.isIntersecting);
    });
  };

  useEffect(() => {
    if (location.pathname === "/home-2") {
      setHeaderSelected("Header 2");
    }
    if (location.pathname === "/home-3") {
      setHeaderSelected("Header 3");
    }
    if (location.pathname === "/") {
      setHeaderSelected("Header 1");
    }

    // disconnect the observer
    if (!PAGES_HIDE_HEADER_BORDER.includes(location.pathname as PathName)) {
      OBSERVER && OBSERVER.disconnect();
      OBSERVER = null;
      return;
    }
    if (!OBSERVER) {
      OBSERVER = new IntersectionObserver(intersectionCallback, OPTIONS);
      anchorRef.current && OBSERVER.observe(anchorRef.current);
    }
  }, [location.pathname]);

  // const renderRadioHeaders = () => {
  //   return (
  //     <div className="mt-4">
  //       <span className="text-sm font-medium">Header Styles</span>
  //       <div className="mt-1.5 flex items-center space-x-2">
  //         {headers.map((header) => {
  //           return (
  //             <div
  //               key={header}
  //               className={`py-1.5 px-3.5 flex items-center rounded-full font-medium text-xs cursor-pointer select-none ${
  //                 headerSelected === header
  //                   ? "bg-black text-white shadow-black/10 shadow-lg"
  //                   : "border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500"
  //               }`}
  //               onClick={() => setHeaderSelected(header)}
  //             >
  //               {header}
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // };

  // const renderRadioHomePages = () => {
  //   return (
  //     <div className="mt-4">
  //       <span className="text-sm font-medium">Home Demos</span>
  //       <div className="mt-1.5 flex items-center space-x-2">
  //         {homePages.map((home) => {
  //           return (
  //             <Link
  //               key={home.slug}
  //               to={home.slug}
  //               className={`py-1.5 px-3.5 flex items-center rounded-full font-medium text-xs cursor-pointer select-none ${
  //                 location.pathname === home.slug
  //                   ? "bg-black text-white shadow-black/10 shadow-lg"
  //                   : "border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500"
  //               }`}
  //             >
  //               {home.name}
  //             </Link>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // };

  const renderHeader = () => {
    let headerClassName = "shadow-sm dark:border-b dark:border-neutral-700";
    if (PAGES_HIDE_HEADER_BORDER.includes(location.pathname as PathName)) {
      headerClassName = isTopOfPage
        ? ""
        : "shadow-sm dark:border-b dark:border-neutral-700";
    }
    switch (headerSelected) {
      case "Header 1":
        return <Header className={headerClassName} navType="MainNav1" />;
      case "Header 2":
        return <Header className={headerClassName} navType="MainNav2" />;
      case "Header 3":
        return <Header3 className={headerClassName} />;

      default:
        return <Header3 className={headerClassName} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Solitiary Holidays</title>
      </Helmet>
      {renderHeader()}
      <div ref={anchorRef} className="h-1 absolute invisible"></div>
    </>
  );
};

export default SiteHeader;
