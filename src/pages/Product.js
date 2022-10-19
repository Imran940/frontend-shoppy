import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AdminProductCard from "../components/Cards/AdminProductCard";
import SingleProduct from "../components/Home/SingleProduct";
import {
  getProduct,
  getRelatedProducts,
  getSubsByCid,
  updateStarChange,
} from "../functions/product";
import { addToWishList } from "../functions/user";
let newStar;
let productId;
function Product({ match }) {
  const { slug } = match.params;
  //const [name, setName] = useState("");
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [subs, setSubs] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const [star, setStar] = useState(0);
  let token = user && user.token;

  useEffect(() => {
    getProduct(slug) // get a product by slug
      .then((resp) => {
        console.log(resp);
        setProduct(resp.data);
        getSubsByCid(token, resp.data.category._id).then((resp) => {
          // get subs category based on category
          setSubs(resp.data);
        });
        //checking for ratings
        let existingRatingUser = resp.data.ratings.find(
          (r) => r.postedBy.toString() == user._id.toString()
        );
        existingRatingUser && setStar(existingRatingUser.star);
        //getReltaedProducts
        getRelatedProducts(resp.data && resp.data._id)
          .then((resp) => {
            console.log(resp);
            setRelated(resp.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [slug]);

  const handleStarRatingChange = (changedStar, id) => {
    console.log({ changedStar, id });
    setStar(changedStar);
    newStar = changedStar;
    productId = id;
    console.log({ newStar, productId });
  };

  const handleStarSubmit = () => {
    console.log(productId);
    updateStarChange(token, newStar, productId)
      .then((resp) => {
        console.log(resp);
        toast.success("thanks for a rating...");
        let newProduct = product;
        let existingRatingUser = newProduct.ratings.find(
          (r) => r.postedBy.toString() == user._id.toString()
        );
        if (existingRatingUser) {
          let ratingIndex = newProduct.ratings.findIndex(
            (r) => r.postedBy.toString() == user._id.toString()
          );
          existingRatingUser.star = newStar;
          newProduct.ratings[ratingIndex] = existingRatingUser;

          console.log(newProduct);
          setProduct({ ...newProduct });
        } else {
          setProduct(resp.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleAddToWishList = (productId) => {
    try {
      addToWishList(token, productId).then((resp) => {
        console.log(resp);
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          subs={subs}
          handleStarRatingChange={handleStarRatingChange}
          handleStarSubmit={handleStarSubmit}
          star={star}
          handleAddToWishList={handleAddToWishList}
        />
      </div>
      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>

      <div className="row pb-5">
        {related.length ? (
          related.map((r) => (
            <div key={r._id} className="col-md-4">
              <AdminProductCard product={r} check="subscriber" />
            </div>
          ))
        ) : (
          <div className="text-center col">No Products found</div>
        )}
      </div>
    </div>
  );
}

export default Product;
