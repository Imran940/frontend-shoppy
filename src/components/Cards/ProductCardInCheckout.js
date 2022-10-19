import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalImage from "react-modal-image";
import laptop from "../../images/laptop.jpg";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { saveCart } from "../../functions/user";
function ProductCardInCheckout({ p }) {
  let dispatch = useDispatch();
  const { title, price, brand, color, images, count, shipping, _id, quantity } =
    p;
  const { cart } = useSelector((state) => ({ ...state }));
  const colors = ["Black", "White", "Brown", "Silver", "Blue"];
  const { user } = useSelector((state) => ({ ...state }));
  const handleColorChange = (e) => {
    let newColor = e.target.value;
    console.log(newColor);
    let newCart = [];
    if (localStorage.getItem("cart")) {
      newCart = JSON.parse(localStorage.getItem("cart"));
    }
    newCart.map((p, i) => {
      if (p._id == _id) {
        newCart[i].color = newColor;
      }
    });

    console.log({ newCart });
    localStorage.setItem("cart", JSON.stringify(newCart));
    dispatch({
      type: "ADD_TO_CART",
      payload: newCart,
    });
  };
  const hanldeCountChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;
    if (quantity < count) {
      toast.error(`Maximum available quantity: ${quantity}`);
      return;
    }
    let newCart = [];
    if (localStorage.getItem("cart")) {
      newCart = JSON.parse(localStorage.getItem("cart"));
    }
    newCart.map((p, i) => {
      if (p._id == _id) {
        newCart[i].count = count;
      }
    });

    console.log({ newCart });
    localStorage.setItem("cart", JSON.stringify(newCart));
    dispatch({
      type: "ADD_TO_CART",
      payload: newCart,
    });
  };

  const handleRemove = () => {
    console.log("handle remove clicked");
    let newCart = [];
    if (localStorage.getItem("cart")) {
      newCart = JSON.parse(localStorage.getItem("cart"));
    }
    newCart.map((p, i) => {
      if (p._id == _id) {
        newCart.splice(i, 1);
      }
    });

    console.log({ newCart });
    localStorage.setItem("cart", JSON.stringify(newCart));
    dispatch({
      type: "ADD_TO_CART",
      payload: newCart,
    });
    if (newCart && newCart.length > 0) {
      saveCart(newCart, user?.token);
    }
  };
  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "100px", height: "auto" }}>
            {images.length > 0 ? (
              <ModalImage small={images[0].url} large={images[0].url} />
            ) : (
              <ModalImage small={laptop} large={laptop} />
            )}
          </div>
        </td>
        <td className="text-center" style={{ lineHeight: "60px" }}>
          {title}
        </td>
        <td className="text-center" style={{ lineHeight: "60px" }}>
          {price}
        </td>
        <td className="text-center" style={{ lineHeight: "60px" }}>
          {brand}
        </td>
        <td>
          <select
            onChange={handleColorChange}
            name="color"
            className="form-control"
            value={color}
          >
            {color ? (
              <option value={color}>{color}</option>
            ) : (
              <option>Select</option>
            )}
            {colors
              .filter((c) => c !== color)
              .map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td className="text-center" style={{ width: "90px" }}>
          <input
            type="number"
            className="form-control"
            value={count}
            onChange={hanldeCountChange}
          />
        </td>
        <td className="text-center">
          {" "}
          {shipping == "Yes" ? (
            <CheckCircleOutlined
              className="text-success h3"
              style={{ lineHeight: "60px" }}
            />
          ) : (
            <CloseCircleOutlined
              className="text-danger h3"
              style={{ lineHeight: "60px" }}
            />
          )}{" "}
        </td>
        <td className="text-center">
          <CloseCircleOutlined
            className="text-danger h3"
            style={{ lineHeight: "60px", cursor: "pointer" }}
            onClick={handleRemove}
          />
        </td>
      </tr>
    </tbody>
  );
}

export default ProductCardInCheckout;
