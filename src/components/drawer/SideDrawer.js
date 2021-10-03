import React from "react";
import { Button, Drawer } from "antd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import laptop from "../../images/laptop.jpg";
function SideDrawer() {
  let dispatch = useDispatch();
  const { cart, drawer } = useSelector((state) => ({ ...state }));
  return (
    <Drawer
      visible={drawer}
      onClose={() => {
        dispatch({
          type: "SHOW_DRAWER",
          payload: false,
        });
      }}
      title={<div className="text-center">Cart Items</div>}
      closable={false}
    >
      {cart?.map((p) => (
        <div key={p._id} className="row">
          <div className="col">
            {p.images[0] ? (
              <>
                <img
                  src={p.images[0].url}
                  style={{ width: "200px", height: "100", objectFit: "cover" }}
                />
                <p className="text-center bg-secondary text-light">
                  {p.title} x {p.count}
                </p>
              </>
            ) : (
              <>
                <img
                  src={laptop}
                  style={{ width: "200px", height: "100", objectFit: "cover" }}
                />
                <p className="text-center bg-secondary text-light">
                  {p.title} x {p.count}
                </p>
              </>
            )}
          </div>
        </div>
      ))}
      <Link to="/cart">
        <Button
          onClick={() => {
            dispatch({
              type: "SHOW_DRAWER",
              payload: false,
            });
          }}
          className="text-center btn btn-primary btn-raised btn-block"
        >
          GO TO CART
        </Button>
      </Link>
    </Drawer>
  );
}

export default SideDrawer;
