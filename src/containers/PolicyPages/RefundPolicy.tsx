import React from "react";

const RefundPolicy = () => {
  return (
    <div>
      <div className="max-w-screen-md mx-auto space-y-5 mt-5 mb-10">
        <h1
          className=" text-neutral-900 font-bold text-3xl md:text-4xl md:!leading-[120%] lg:text-5xl dark:text-neutral-100 max-w-4xl text-center"
          title="Quiet ingenuity: 120,000 lunches and counting"
        >
          Refund Policy
        </h1>
        <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
          At Solitary Holidays, we strive to provide exceptional service and a
          seamless booking experience. We understand that circumstances may
          arise that require cancellations or changes to your reservation.
          Please review our refund policy below for information on refunds,
          cancellations, and related procedures.
        </span>

        <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>

        <div
          id="single-entry-content"
          className="prose dark:prose-invert prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-dark"
        >
          <h3>1. Refund Eligibility</h3>
          <ol>
            <li>
              <span className="text-neutral-900 font-semibold">
                Full Refund: &nbsp;
              </span>
              You may be eligible for a full refund if you cancel your
              reservation within the specified cancellation period, as outlined
              in our cancellation policy. Please refer to your booking
              confirmation or contact our customer service team for details on
              the cancellation period applicable to your reservation.
            </li>
            <li>
              <span className="text-neutral-900 font-semibold">
                Partial Refund: &nbsp;
              </span>
              In certain cases, you may be eligible for a partial refund if you
              cancel your reservation after the specified cancellation period.
              The amount of the partial refund will be determined based on the
              specific terms and conditions of your reservation.
            </li>
            <li>
              <span className="text-neutal-900 font-semibold">
                {" "}
                Non-Refundable Reservations:
              </span>{" "}
              Some reservations may be designated as non-refundable at the time
              of booking. Non-refundable reservations are not eligible for
              refunds or cancellations. Please review the terms and conditions
              of your reservation carefully before making your booking.
            </li>
          </ol>
          <h3>2. Refund Process</h3>
          <ol>
            <li>
              <span className="text-neutal-900 font-semibold">
                Cancellation Notification:
              </span>
              If you need to cancel your reservation, please notify us as soon
              as possible by contacting our customer service team or through
              your online booking account.
            </li>
            <li>
              <span className="text-neutal-900 font-semibold">
                Refund Processing:
              </span>{" "}
              Refunds for eligible cancellations will be processed within a
              reasonable timeframe after the cancellation request is approved.
              Refunds will typically be issued using the same method of payment
              used for the original reservation. Please allow sufficient time
              for the refund to reflect in your account.
            </li>
            <li>
              <span className="text-neutal-900 font-semibold">
                Refund Exceptions:
              </span>{" "}
              In certain cases, refunds may be delayed or subject to additional
              processing time due to external factors such as bank processing
              times, currency conversion, or other unforeseen circumstances.
            </li>
          </ol>

          <h3>Contacting Us</h3>

          <p>
            If you have any questions or concerns about our refund policy,
            please don't hesitate to contact us using the information provided
            below:
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

export default RefundPolicy;
