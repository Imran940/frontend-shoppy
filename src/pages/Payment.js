import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/StripeCheckout";

//load stripe

const promise = loadStripe(
  "pk_test_51HpHgmBUIeJ17LCULQNFlXaal44cnyzuuAd34ZCejgcRJRaisDmkoL3y64vgIj4tuBhnm9sjSku6WFx3PsLw3Mco000eXwermi"
);
function Payment() {
  return (
    <div className="container p-5 text-center">
      <h4>complete your purchase</h4>
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  );
}

export default Payment;
