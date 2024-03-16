// import { ComponentType } from "react";

// export interface LocationStates {
//   "/"?: {};
//   "/#"?: {};
//   "/home-2"?: {};
//   "/home-3"?: {};
//   "/home-1-header-2"?: {};
//   //
//   "/listing-flights"?: {};
//   //
  
//   "/HotelListing"?: {};
//   "/VillaListing"?: {};
//   "/ResortListing"?: {};
//   "/listing-stay"?: {};
//   "/listing-stay-map"?: {};
//   "/listing-stay-detail"?: {};
//   "/listingResortDetailPage"?: {};
//   //
//   "/listing-experiences"?: {};
//   "/listing-experiences/:city"?: {};
//   "/listing-experiences-map"?: {};
//   "/listing-experiences-detail"?: {};
//   //
//   "/listing-real-estate"?: {};
//   "/listing-real-estate-map"?: {};
//   "/listing-real-estate-detail"?: {};
//   //
//   "/listing-car"?: {};
//   "/listing-car-map"?: {};
//   "/listing-car-detail"?: {};
//   //
//   "/checkout"?: {};
//   "/pay-done"?: {};
//   //
//   "/account"?: {};
//   "/FlightBooking"?: {};
//   "/UserAccount"?: {};
//   "/EnquiryPage"?: {};
//   "/SettingsPage"?: {};
//   "/BookingsPage"?: {};
//   "/BillingPage"?: {};
//   "/account-savelists"?: {};
//   "/account-password"?: {};
//   "/account-billing"?: {};
//   //
//   "/blog"?: {};
//   "/blog-single"?: {};
//   //
//   "/add-listing-1"?: {};
//   "/add-listing-2"?: {};
//   "/add-listing-3"?: {};
//   "/add-listing-4"?: {};
//   "/add-listing-5"?: {};
//   "/add-listing-6"?: {};
//   "/add-listing-7"?: {};
//   "/add-listing-8"?: {};
//   "/add-listing-9"?: {};
//   "/add-listing-10"?: {};
//   //
//   "/author"?: {};
//   "/search"?: {};
//   "/about"?: {};
//   "/contact"?: {};
//   "/login"?: {};
//   "/signup"?: {};
//   // "/reset-password/:token"?: {};
//   "/reset-password"?: {};
//   "/forgot"?: {};
//   "/page404"?: {};
//   "/subscription"?: {};
//   //
//   "/TermsConditions"?: {};
//   "/PrivacyPolicy"?: {};
//   "/CancellationPolicy"?: {};
//   "/RefundPolicy"?: {};
//   "/FAQ"?: {};


// }

// export type PathName = keyof LocationStates;

// export interface Page {
//   path: PathName;
//   exact?: boolean;
//   component: ComponentType<Object>;
// }


import { ComponentType } from "react";

export interface LocationStates {
  "/"?: {};
  "/#"?: {};
  "/home-2"?: {};
  "/home-3"?: {};
  "/home-1-header-2"?: {};
  //
  "/listing-flights"?: {};
  //

  "/HotelListing"?: {};
  "/VillaListing"?: {};
  "/ResortListing"?: {};
  "/listing-stay"?: {};
  "/listing-stay-map"?: {};
  "/listing-stay-detail"?: {};
  "/listingResortDetailPage"?: {};
  //
  "/listing-experiences"?: {};
  "/listing-experiences/:city"?: {};
  "/listing-experiences-map"?: {};
  "/listing-experiences-detail"?: {};
  //
  "/listing-real-estate"?: {};
  "/listing-real-estate-map"?: {};
  "/listing-real-estate-detail"?: {};
  //
  "/listing-car"?: {};
  "/listing-car-map"?: {};
  "/listing-car-detail"?: {};
  //
  "/checkout"?: {};
  "/pay-done"?: {};
  //
  "/account"?: {};
  "/FlightBooking"?: {};
  "/UserAccount"?: {};
  "/EnquiryPage"?: {};
  "/SettingsPage"?: {};
  "/BookingsPage"?: {};
  "/BillingPage"?: {};
  "/account-savelists"?: {};
  "/account-password"?: {};
  "/account-billing"?: {};
  //
  "/blog"?: {};
  "/blog-single"?: {};
  //
  "/add-listing-1"?: {};
  "/add-listing-2"?: {};
  "/add-listing-3"?: {};
  "/add-listing-4"?: {};
  "/add-listing-5"?: {};
  "/add-listing-6"?: {};
  "/add-listing-7"?: {};
  "/add-listing-8"?: {};
  "/add-listing-9"?: {};
  "/add-listing-10"?: {};
  //
  "/author"?: {};
  "/search"?: {};
  "/about"?: {};
  "/contact"?: {};
  "/login"?: {};
  "/signup"?: {};
  "/reset-password/:token"?: {};
  "/ResetPassword/:token"?: {};
  "/ResetPassword"?: {};

  "/forgot"?: {};
  "/page404"?: {};
  "/subscription"?: {};
  //
  "/TermsConditions"?: {};
  "/PrivacyPolicy"?: {};
  "/CancellationPolicy"?: {};
  "/RefundPolicy"?: {};
  "/FAQ"?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  exact?: boolean;
  component: ComponentType<Object>;
}
