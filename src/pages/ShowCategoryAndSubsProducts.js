import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AdminProductCard from "../components/Cards/AdminProductCard";
import { getACategory } from "../functions/category";
import { removeProduct } from "../functions/product";
import { useParams } from "react-router-dom";
import { getASub } from "../functions/sub";

function ShowCategoryAndSubsProducts({ match, check }) {
  let slug = useParams().slug;
  console.log(slug);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  let token = user?.token;
  console.log(check);
  useEffect(() => {
    setLoading(true);
    if (check == "category") {
      getACategory(slug).then((resp) => {
        setProducts(resp.data.products);
        setLoading(false);
      });
    } else {
      getASub(slug)
        .then((resp) => {
          console.log(resp);
          setProducts(resp.data.products);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);
  const handleDeleteProduct = (slug) => {
    if (window.confirm(`Are sure that you want to delete ${slug} product`)) {
      removeProduct(token, slug)
        .then((resp) => {
          console.log(resp);
          toast.success(`${slug} deleted successfully`);
          let oldProducts = products;
          let newProdut = oldProducts.filter((p) => p.slug !== slug);
          setProducts(newProdut);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="container">
      {loading ? (
        <h3 className="text-danger text-center p-3 mt-5 mb-5 jumbotron">
          Loading...
        </h3>
      ) : (
        <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
          All Products ({products?.length})
        </h4>
      )}

      <div className="row">
        {products?.map((p, i) => (
          <div className="col-md-4">
            <AdminProductCard
              product={p}
              check={user && user.role ? user.role : "subscriber"}
              handleDeleteProduct={user?.role == "admin" && handleDeleteProduct}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowCategoryAndSubsProducts;
