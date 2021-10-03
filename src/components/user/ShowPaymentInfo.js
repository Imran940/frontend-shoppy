import React from "react";

function ShowPaymentInfo({ order, check }) {
  return (
    <div>
      <p>
        <span>
          <b>OrderId: </b>
          {order.paymentIntent.id}
        </span>
        {"/"}
        <span>
          <b>Amount: </b>
          {(order.paymentIntent.amount / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "INR",
          })}
        </span>
        {"/"}
        <span>
          <b>Method: </b>
          {order.paymentIntent.payment_method_types[0]}
        </span>
        {"/"}
        <span>
          <b>Payment: </b>
          {order.paymentIntent.status.toUpperCase()}
        </span>
        {"/"}
        <span>
          <b>Ordered on: </b>
          {new Date(order.paymentIntent.created * 1000).toLocaleString()}
        </span>
        <br />
        {check == undefined && (
          <span
            className="badge bg-primary  text-white"
            style={{
              fontSize: "15px",
            }}
          >
            STATUS: {order.orderStatus}
          </span>
        )}
      </p>
    </div>
  );
}

export default ShowPaymentInfo;
