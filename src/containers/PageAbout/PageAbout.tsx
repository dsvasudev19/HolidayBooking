import rightImg from "images/about-hero-right.png";
import React, { FC } from "react";
// import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatistic";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionHero from "./SectionHero";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import SectionVideos from "containers/PageHome/SectionVideos";

export interface PageAboutProps {
  className?: string;
}

const PageAbout: FC<PageAboutProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-PageAbout overflow-hidden relative ${className}`}
      data-nc-id="PageAbout"
    >
      <Helmet>
        <title>About || Solitiary Holidays</title>
      </Helmet>

      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <SectionHero
          rightImg={rightImg}
          heading="👋 About Us."
          btnText=""
          subHeading="Solitary Holidays: Where luxury meets authenticity. Committed to impeccable service, we create distinctive stays, crafting each moment with care for a uniquely memorable experience."
        />
        <SectionStatistic />

        <SectionVideos />
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay uniqueClassName="PageAbout_" />
        </div>

        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageAbout;
