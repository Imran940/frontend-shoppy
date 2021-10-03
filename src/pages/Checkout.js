import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  applyCoupon,
  emptyCart,
  getCart,
  saveUserAddress,
} from "../functions/user";
import { toast } from "react-toastify";
import TextArea from "react-quill";
import "react-quill/dist/quill.snow.css";
function Checkout({ history }) {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const { user } = useSelector((state) => ({ ...state }));
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponErr, setCouponErr] = useState(false);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
  let token = user?.token;
  let dispatch = useDispatch();
  useEffect(() => {
    localStorage.removeItem("amountInfo");
    localStorage.removeItem("cartTotal");
    getCart(token).then((resp) => {
      setProducts(resp.data.products);
      setTotal(resp.data.cartTotal);
      localStorage.setItem("cartTotal", resp.data.cartTotal);
      console.log(resp);
    });
  }, []);
  const hanldeEmptyCart = () => {
    emptyCart(token).then((resp) => {
      console.log(resp);
      setProducts([]);
      setTotal(0);
    });
    //clear from localStorage
    if (localStorage.getItem("cart")) {
      localStorage.removeItem("cart");
    }
    //clear from redux
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: [],
    });
    toast.success("Cart is empty, Continue shopping");
    history.push("/shop");
  };
  const saveAddress = () => {
    console.log(address);
    saveUserAddress(address, token).then((resp) => {
      console.log(resp);
      setAddressSaved(true);
      toast.success("Address saved successfully");
    });
  };

  const handleApplyCoupon = () => {
    applyCoupon(coupon, token)
      .then((resp) => {
        setTotalAfterDiscount(resp.data.totalAfterDiscount);
        console.log(resp.data);
        let amountInfo = {
          cartTotal: resp.data.cartTotal,
          totalAfterDiscount: resp.data.totalAfterDiscount,
        };

        localStorage.setItem("amountInfo", JSON.stringify(amountInfo));
      })
      .catch((err) => {
        setCouponErr(true);
        console.log(err);
      });
  };
  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        <TextArea value={address} theme="snow" onChange={setAddress} />
        <button onClick={saveAddress} className="btn btn-primary m-2">
          Save
        </button>
        <hr />
        <h4>Got Coupon..?</h4>
        <br />
        <>
          <input
            className="form-control pt-2"
            type="text"
            value={coupon}
            onChange={(e) => {
              setCoupon(e.target.value);
              setCouponErr(false);
            }}
          />
          <button onClick={handleApplyCoupon} className="btn btn-primary m-2">
            Apply Coupon
          </button>
        </>
        {couponErr && <p className="bg-danger p-2">Invalid Coupon Code</p>}
      </div>
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <h5>
          {products?.length} {products?.length == 1 ? "Product" : "Products"}{" "}
        </h5>
        <hr />
        <p>
          {products?.map((p, i) => (
            <div key={i}>
              <p>
                {p.product.title} {p.color && `(${p.color})`} x {p.count}={" "}
                {p.product.price * p.count}
              </p>
            </div>
          ))}
        </p>
        <hr />
        <p>
          Cart Total: <b>₹{total}</b>
        </p>
        {totalAfterDiscount && (
          <p className="bg-success p-2">
            Discount Applied: Total Payable- ₹{totalAfterDiscount}
          </p>
        )}
        <hr />
        <div className="row">
          <div className="col-md-6">
            <button
              onClick={() => history.push("/payment")}
              disabled={!addressSaved}
              className="btn btn-primary"
            >
              Place Order
            </button>
          </div>
          <div className="col-md-6">
            <button onClick={hanldeEmptyCart} className="btn btn-primary">
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
