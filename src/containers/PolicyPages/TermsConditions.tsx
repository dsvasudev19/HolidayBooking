import React from "react";

const TermsConditions = () => {
  return (
    <div>
        <div className="max-w-screen-md mx-auto space-y-5 mt-5 mb-10">
          <h1
            className=" text-neutral-900 font-bold text-3xl md:text-4xl md:!leading-[120%] lg:text-5xl dark:text-neutral-100 max-w-4xl text-center"
            title="Quiet ingenuity: 120,000 lunches and counting"
          >
            Terms And Conditions.
          </h1>
          <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
            Welcome to Solitary Holidays! These Terms and Conditions govern your
            use of our website and services. By accessing or using our website,
            you agree to be bound by these Terms and Conditions. If you disagree
            with any part of these terms, please refrain from using our website.
          </span>

          <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>

          <div
            id="single-entry-content"
            className="prose dark:prose-invert prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-dark"
          >
            <h3>1. Booking and Reservations:</h3>
            <ol>
              <li>
                Solitary Holidays facilitates the booking of hotel
                accommodations, resorts, and other related services in Goa,
                India, and may offer additional services as outlined on our
                website.
              </li>
              <li>
                By making a reservation through our website, you agree to abide
                by the terms of the booking, including payment obligations and
                cancellation policies set forth by the respective accommodation
                provider.
              </li>
            </ol>
            <h3>2. User Responsibilities:</h3>
            <ol>
              <li>
                You are responsible for providing accurate and up-to-date
                information during the booking process, including personal
                details and payment information.
              </li>
              <li>
                You agree to use our website and services for lawful purposes
                only and shall not engage in any activities that violate
                applicable laws or regulations.
              </li>
            </ol>
            <h3>3. Payment and Cancellation Policies:</h3>
            <ol>
              <li>
                Payment for bookings made through Solitary Holidays is processed
                securely via our designated payment gateway. Additional terms
                and conditions may apply based on the specific accommodation
                provider's policies.
              </li>
              <li>
                Cancellation policies vary depending on the accommodation
                provider and are clearly stated during the booking process. It
                is your responsibility to review and understand these policies
                before making a reservation.
              </li>
            </ol>
            <h3>4. Intellectual Property:</h3>
            <ol>
              <li>
                All content on the Solitary Holidays website, including but not
                limited to text, graphics, logos, images, and software, is the
                property of Solitary Holidays or its licensors and is protected
                by copyright laws.
              </li>
              <li>
                You may not use, reproduce, modify, distribute, or transmit any
                content from our website without prior written consent from
                Solitary Holidays.
              </li>
            </ol>
            <h3>5. Limitation of Liability:</h3>
            <ol>
              <li>
                {" "}
                Solitary Holidays strives to provide accurate and reliable
                information on our website, but we do not guarantee the
                completeness, accuracy, or reliability of any content.
              </li>
              <li>
                {" "}
                In no event shall Solitary Holidays or its affiliates be liable
                for any direct, indirect, incidental, special, or consequential
                damages arising out of or in any way connected with the use of
                our website or services.
              </li>
            </ol>
            <h3>6. Privacy Policy:</h3>
            <ol>
              <li>
                Your privacy is important to us. Please refer to our Privacy
                Policy for information on how we collect, use, and protect your
                personal data.
              </li>
            </ol>
            <h3>7. Governing Law:</h3>
            <ol>
              <li>
                These Terms and Conditions shall be governed by and construed in
                accordance with the laws of India. Any disputes arising under
                these terms shall be subject to the exclusive jurisdiction of
                the courts in Goa.
              </li>
            </ol>
            <h3>8. Modifications:</h3>
            <ol>
              <li>
                Solitary Holidays reserves the right to update or modify these
                Terms and Conditions at any time without prior notice. Your
                continued use of our website after any changes indicates your
                acceptance of the revised terms.
              </li>
            </ol>
            <h3>Contact Us:</h3>
            <ul>
              <li>
                If you have any questions or concerns about these Terms and
                Conditions, please contact us at &nbsp;
                <a href="mailto:info@solitaryholydays.in">info@solitaryholydays.in</a>
              </li>
            </ul>
          </div>
        </div>
    </div>
  );
};

export default TermsConditions;
