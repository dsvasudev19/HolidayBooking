import React from "react";

const PrivacyPolicy = () => {
  return (
    <div>
      <div className="max-w-screen-md mx-auto space-y-5 mt-5 mb-10">
        <h1
          className=" text-neutral-900 font-bold text-3xl md:text-4xl md:!leading-[120%] lg:text-5xl dark:text-neutral-100 max-w-4xl text-center"
          title="Quiet ingenuity: 120,000 lunches and counting"
        >
          Privacy Policy
        </h1>
        <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
          At Solitary Holidays, the privacy of our visitors is of utmost
          importance to us. This privacy policy document outlines the types of
          personal information that is received and collected by Solitary
          Holidays and how it is used.
        </span>

        <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>

        <div
          id="single-entry-content"
          className="prose dark:prose-invert prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-dark"
        >
          <h3>1. Information We Collect</h3>

          <p>
            We collect information from you when you register on our site, place
            an order, subscribe to our newsletter, respond to a survey or fill
            out a form.
          </p>

          <p>
            When ordering or registering on our site, as appropriate, you may be
            asked to enter your: name, e-mail address, mailing address, phone
            number or credit card information. You may, however, visit our site
            anonymously.
          </p>

          <h3>2. How We Use Your Information</h3>
          <p>
            Any of the information we collect from you may be used in one of the
            following ways:
          </p>
          <ol>
            <li>
              To personalize your experience (your information helps us to
              better respond to your individual needs)
            </li>
            <li>
              To improve our website (we continually strive to improve our
              website offerings based on the information and feedback we receive
              from you)
            </li>
            <li>
              To improve customer service (your information helps us to more
              effectively respond to your customer service requests and support
              needs)
            </li>
            <li>
              To process transactions (Your information, whether public or
              private, will not be sold, exchanged, transferred, or given to any
              other company for any reason whatsoever, without your consent,
              other than for the express purpose of delivering the purchased
              product or service requested)
            </li>
            <li>
              To administer a contest, promotion, survey or other site feature
            </li>
          </ol>
          <h3>3. How We Protect Your Information</h3>
          <ol>
            <li>
              We implement a variety of security measures to maintain the safety
              of your personal information when you place an order or enter,
              submit, or access your personal information.
            </li>
          </ol>
          <h3>4. Disclosure of Information to Outside Parties</h3>
          <ol>
            <li>
              We do not sell, trade, or otherwise transfer to outside parties
              your personally identifiable information. This does not include
              trusted third parties who assist us in operating our website,
              conducting our business, or servicing you, so long as those
              parties agree to keep this information confidential. We may also
              release your information when we believe release is appropriate to
              comply with the law, enforce our site policies, or protect ours or
              others rights, property, or safety.
            </li>
          </ol>
          <h3>5. Changes to our Privacy Policy</h3>
          <ol>
            <li>
              {" "}
              If we decide to change our privacy policy, we will update the
              Privacy Policy modification date below.
            </li>
            <li> This policy was last modified on [09-02-2024].</li>
          </ol>

          <h3>Contacting Us</h3>

          <p>
            If there are any questions regarding this privacy policy you may
            contact us using the information below:
          </p>


          <h3>Solitary Holidays</h3>


          <p>Company Address</p>
          <p>Goa, India</p>
          <p>+91 6300 685 881</p>
          <p>Info@solitaryholydays.in</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
