import React from "react";
import ShowPaymentInfo from "../user/ShowPaymentInfo";

export const orderStatusValues = [
  { name: "Not Processed", value: "Not processed" },
  { name: "Processing", value: "Processing" },
  { name: "Dispatched", value: "Dispatched" },
  { name: "Cancelled", value: "Cancelled" },
  { name: "Completed", value: "Completed" },
];
const Order = ({ orders, handleStatusChange }) => (
  <>
    {orders?.map((order, i) => (
      <div key={i} className="row pb-5">
        <ShowPaymentInfo order={order} check={true} />
        <div className="row">
          <div className="col-md-4">Delivery Status</div>
          <div className="col-md-7" style={{ cursor: "pointer" }}>
            <select
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
              className="form-control pointer"
              defaultValue={order.orderStatus}
              name="status"
            >
              {orderStatusValues?.map((v, i) => (
                <option value={v.value}>{v.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    ))}
  </>
);

export default Order;
