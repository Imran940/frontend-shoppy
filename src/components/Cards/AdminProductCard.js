import React, { useState, useEffect } from "react";
import { Card, Tooltip } from "antd";
import laptop from "../../images/laptop.jpg";
import {
  EditOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import ShowAverageRating from "../Home/ShowAverageRating";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { saveCart } from "../../functions/user";
const { Meta } = Card;
function AdminProductCard({ product, handleDeleteProduct, check }) {
  const { title, description, images, slug, ratings, price, _id, quantity } =
    product;
  const { cart, user } = useSelector((state) => ({ ...state }));
  const [tooltip, setTooltip] = useState(
    `${quantity >= 1 ? "Click to add" : "Out of stock"}`
  );
  let dispatch = useDispatch();
  useEffect(() => {
    cart?.map((c, i) => {
      if (c._id == _id) {
        setTooltip("Added");
      }
    });
  }, []);

  let history = useHistory();
  const handleCartClick = () => {
    let cart = [];
    if (typeof window !== "undefined" && quantity >= 1) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.push({
        ...product,
        count: 1,
      });
      let unique = _.uniqWith(cart, _.isEqual);
      localStorage.setItem("cart", JSON.stringify(unique));
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      if (tooltip != "Added") {
        dispatch({
          type: "SHOW_DRAWER",
          payload: true,
        });
      }
      //storing in db
      saveCart(cart, user?.token);
      setTooltip("Added");
    }
  };
  return (
    <div>
      <div className="mb-2">
        {ratings && ratings.length > 0 ? (
          <div className="text-center">
            <ShowAverageRating ratings={ratings} />
          </div>
        ) : (
          <div className="text-center h5">No rating yet</div>
        )}
      </div>

      <Card
        cover={
          <img
            src={images && images.length > 0 ? images[0].url : laptop}
            style={{ height: "150px", objectFit: "contain" }}
          />
        }
        actions={
          check == "subscriber"
            ? [
                <>
                  <EyeOutlined
                    className="text-warning"
                    onClick={() => history.push(`/product/${slug}`)}
                  />
                  <br /> View Product
                </>,
                <Tooltip title={tooltip}>
                  <a onClick={handleCartClick} disabled={quantity < 1}>
                    <ShoppingCartOutlined className="text-success" />
                    <br />
                    {quantity < 1 ? "Out of stock" : "Add To Cart"}
                  </a>
                </Tooltip>,
              ]
            : [
                <EditOutlined
                  onClick={() => history.push(`/admin/product/${slug}`)}
                  className="text-warning"
                />,
                <DeleteOutlined
                  onClick={() => handleDeleteProduct(slug)}
                  className="text-danger"
                />,
              ]
        }
      >
        <Meta
          title={`${title} - ${price}`}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </div>
  );
}

export default AdminProductCard;
