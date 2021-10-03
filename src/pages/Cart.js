import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProductCardInCheckout from "../components/Cards/ProductCardInCheckout";
import { saveCart } from "../functions/user";

function Cart() {
  const { user, cart } = useSelector((state) => ({ ...state }));
  let history = useHistory();
  const getTotalAmount = () => {
    return cart.reduce(
      (initialValue, nextValue) =>
        initialValue + nextValue.price * nextValue.count,

      0
    );
  };
  // const storeProductDb = () => {
  //   saveCart(cart, user?.token).then((resp) => {
  //     history.push("/checkout");
  //   });
  // };
  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      {cart?.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );
  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart/{cart.length} Product</h4>
          {!cart.length ? (
            <p>
              No products in cart <Link to="/shop">Continue Shopping..</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summery</h4>
          <hr />
          <p>Products</p>
          {cart?.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count}=₹{c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total:<b> ₹{getTotalAmount()}</b>
          <hr />
          {user ? (
            <button
              className="btn btn-sm btn-primary btn-raised mt-2"
              onClick={() => history.push("/checkout")}
              disabled={cart?.length == 0}
            >
              Proceed to Checkout
            </button>
          ) : (
            <button
              className="btn btn-sm btn-primary mt-2"
              onClick={() => {
                let from = "/cart";
                window.localStorage.setItem("from", from);
                history.push("/login");
              }}
            >
              Login to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
