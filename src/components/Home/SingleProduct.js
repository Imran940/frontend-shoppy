import React, { useEffect, useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import laptop from "../../images/laptop.jpg";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import ShowAverageRating from "./ShowAverageRating";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";

const { TabPane } = Tabs;
const { Meta } = Card;
function SingleProduct({
  product,
  handleStarRatingChange,
  subs,
  star,
  handleStarSubmit,
}) {
  const {
    _id,
    title,
    description,
    images,
    slug,
    price,
    quantity,
    category,
    selectedSubs,
    shipping,
    color,
    brand,
    sold,
    ratings,
  } = product;
  let dispatch = useDispatch();
  const [tooltip, setTooltip] = useState("Click to add");
  const { cart } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    cart?.map((c, i) => {
      if (c._id == _id) {
        setTooltip("Added");
      }
    });
  }, [cart]);

  const handleCartClick = () => {
    let cart = [];
    if (typeof window !== "undefined") {
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
      setTooltip("Added");
    }
  };
  return (
    <>
      <div className="col-md-7">
        {images && images.length > 0 ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images.map((i) => (
              <img src={i.url} key={i.public_id} />
            ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                src={laptop}
                className="p-1"
                style={{ height: "450px", objectFit: "contain" }}
              />
            }
          />
        )}
        <Tabs type="card">
          <TabPane tab="description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="more" key="2">
            Call us to get more information on {title} product on 9082074682
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-3" style={{ color: "white" }}>
          {title}
        </h1>
        {ratings && ratings.length > 0 ? (
          <div className="text-center">
            <ShowAverageRating ratings={ratings} />
          </div>
        ) : (
          <div className="text-center h5">No rating yet</div>
        )}

        <Card
          actions={[
            <Tooltip title={tooltip}>
              <a onClick={handleCartClick}>
                <ShoppingCartOutlined className="text-success" />
                <br />
                Add To Cart
              </a>
            </Tooltip>,
            <>
              <Link to="/">
                <HeartOutlined className="text-info" />
                <br /> Add to Wishlist
              </Link>
            </>,
            <>
              <RatingModal handleStarSubmit={handleStarSubmit}>
                <StarRating
                  name={_id}
                  numberOfStars={5}
                  rating={star}
                  changeRating={handleStarRatingChange}
                  isSelectable={true}
                  starRatedColor="red"
                />
              </RatingModal>
            </>,
          ]}
        >
          <ul className="list-group">
            <li className="list-group-item">
              Price{" "}
              <span className="label lable-default lable-pill pull-xs-right">
                {" "}
                {price}
              </span>
            </li>
            <li className="list-group-item">
              Category{" "}
              <Link
                to={`/category/${category?.slug}`}
                className="label lable-default lable-pill pull-xs-right"
              >
                {" "}
                {category?.name}
              </Link>
            </li>
            <li className="list-group-item">
              Sub-Category{" "}
              {subs?.map((s, i) => (
                <Link
                  key={i}
                  to={`/subs/${s?.slug}`}
                  className="label lable-default lable-pill pull-xs-right"
                >
                  {" "}
                  {s?.name}
                </Link>
              ))}
            </li>
            <li className="list-group-item">
              Shipping{" "}
              <span className="label lable-default lable-pill pull-xs-right">
                {" "}
                {shipping}
              </span>
            </li>
            <li className="list-group-item">
              Color{" "}
              <span className="label lable-default lable-pill pull-xs-right">
                {" "}
                {color}
              </span>
            </li>
            <li className="list-group-item">
              Brand{" "}
              <span className="label lable-default lable-pill pull-xs-right">
                {" "}
                {brand}
              </span>
            </li>
            <li className="list-group-item">
              Available{" "}
              <span className="label lable-default lable-pill pull-xs-right">
                {" "}
                {quantity}
              </span>
            </li>
            <li className="list-group-item">
              Sold{" "}
              <span className="label lable-default lable-pill pull-xs-right">
                {" "}
                {sold}
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </>
  );
}

export default SingleProduct;
