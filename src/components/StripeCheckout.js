import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { createPayment } from "../functions/stripe";
import "../stripe.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Card } from "antd";
import { c } from "@ant-design/icons";
import LoadingRedirect from "./routes/LoadingRedirect";
import { createOrder, emptyCart } from "../functions/user";
function StripeCheckout() {
  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const { user, cart } = useSelector((state) => ({ ...state }));
  let token = user?.token;
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  let dispatch = useDispatch();
  useEffect(() => {
    createPayment(user?.token)
      .then((resp) => {
        setClientSecret(resp.data.clientSecret);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleChange = (e) => {
    console.log({ card: e });
    if (e.error) {
      setError(e.error.message);
    }
  };
  const handleSubmit = async (e) => {
    console.log({ submitEvent: e });
    e.preventDefault();
    setProcessing(true);
    console.log(clientSecret);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(payload.error.message);
      setProcessing(false);
    } else {
      console.log(JSON.stringify(payload, null, 4));
      //empty the cart in backend
      emptyCart(token);
      //create order and save in db
      createOrder(payload, token).then((res) => console.log(res));
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      toast.success("payment made successful");
    }
  };
  let amountInfo = JSON.parse(localStorage.getItem("amountInfo"));
  return (
    <>
      {!succeeded && (
        <div>
          {amountInfo ? (
            <p className="alert alert-success">{`Total after discount: ${amountInfo.totalAfterDiscount}`}</p>
          ) : (
            <p className="alert alert-danger">No coupon applied</p>
          )}
        </div>
      )}
      <div className="text-center pb-4">
        <Card
          cover={
            <img
              src={cart && cart.length > 0 && cart[0].images[0].url}
              style={{
                height: "200px",
                objectFit: "contain",
                marginBottom: "-50px",
              }}
            />
          }
          actions={[
            <>
              Total: <b>₹{localStorage.getItem("cartTotal")}</b>
            </>,
            amountInfo ? (
              <>
                Payable Amount: <b>₹{amountInfo.totalAfterDiscount}</b>
              </>
            ) : (
              <>
                Payable Amount: <b>₹{localStorage.getItem("cartTotal")}</b>
              </>
            ),
          ]}
        />
      </div>
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button className="stripe-button">
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment Successful..{""}
          <Link to="user/history">
            See it in your purchase history,
            {succeeded && <LoadingRedirect check="payment" />}{" "}
          </Link>
        </p>
      </form>
    </>
  );
}

export default StripeCheckout;
