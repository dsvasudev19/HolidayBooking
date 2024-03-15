import React, { FC, useState } from "react";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SocialsList from "shared/SocialsList/SocialsList";
import Label from "components/Label/Label";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import { axiosInstance } from "./../../index";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export interface PageContactProps {
  className?: string;
}

const info = [
  {
    title: "🗺 ADDRESS",
    desc: "Hyderabad,Telangana,500067",
  },
  {
    title: "💌 EMAIL",
    desc: "info@solitaryholydays.in",
  },
  {
    title: "☎ PHONE",
    desc: "+91 6300685881",
  },
];

const PageContact: FC<PageContactProps> = ({ className = "" }) => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    setInitialValues({ ...initialValues, [name]: value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/support/", initialValues);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Message Sent",
          text: "We will get back to you soon",
          showConfirmButton: false,
          timer: 800,
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`nc-PageContact overflow-hidden ${className}`}
      data-nc-id="PageContact"
    >
      <Helmet>
        <title>Contact || Solitiary Holidays</title>
      </Helmet>
      <div className="mb-24 lg:mb-32">
        <h2 className="my-16 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Contact
        </h2>
        <div className="container max-w-7xl mx-auto">
          <div className="flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-12 ">
            <div className="max-w-sm space-y-8">
              {info.map((item, index) => (
                <div key={index}>
                  <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                    {item.title}
                  </h3>
                  <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                    {item.desc}
                  </span>
                </div>
              ))}
              <div>
                <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                  🌏 SOCIALS
                </h3>
                <SocialsList className="mt-2" />
              </div>
            </div>
            <div>
              <form
                className="grid grid-cols-1 gap-6"
                method="post"
                onSubmit={(e: any) => handleSubmit(e)}
              >
                <label className="block">
                  <Label>Full name</Label>

                  <Input
                    placeholder="Example Doe"
                    name="name"
                    type="text"
                    value={initialValues.name}
                    className="mt-1"
                    onChange={(e: any) => handleChange(e)}
                    required
                  />
                </label>
                <label className="block">
                  <Label>Email address</Label>

                  <Input
                    type="email"
                    name="email"
                    placeholder="example@example.com"
                    className="mt-1"
                    value={initialValues.email}
                    onChange={(e: any) => handleChange(e)}
                    required
                  />
                </label>
                <label className="block">
                  <Label>Message</Label>
                  <Textarea
                    className="mt-1"
                    rows={6}
                    name="message"
                    value={initialValues.message}
                    onChange={(e: any) => handleChange(e)}
                    required
                  />
                </label>
                <div>
                  <ButtonPrimary type="submit">Send Message</ButtonPrimary>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* OTHER SECTIONS */}
      <div className="container">
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay uniqueClassName="Pagecontact_" />
        </div>
        <SectionSubscribe2 className="py-24 lg:py-32" />
      </div>
    </div>
  );
};

export default PageContact;
