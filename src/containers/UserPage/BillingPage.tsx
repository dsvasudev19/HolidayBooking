import { Helmet } from "react-helmet";
import UserLayout from "./UserLayout";
import { FC } from "react";
import ComingSoon from "../../images/Svg/OneBilling.svg";

export interface BillingPageProps {
  className?: string;
}

const BillingPage: FC<BillingPageProps> = ({ className = "" }) => {
  return (
    <div className={`nc-BillingPage ${className}`} data-nc-id="BillingPage" >
      <Helmet>
        <title>Solitary Holidays || Billing</title>
      </Helmet>
      <UserLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <img src={ComingSoon} alt="Coming Soon" />
            <h2 className="text-3xl font-bold mb-4 mt-20">
              Billing Coming Soon
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              Our billing system is undergoing maintenance. We'll be back
              shortly with exciting updates!
            </p>
          </div>
        </div>
      </UserLayout>
    </div>
  );
};

export default BillingPage;
