import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AdminProductCard from "../../../components/Cards/AdminProductCard";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductByCount, removeProduct } from "../../../functions/product";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  let token = user.token;
  useEffect(() => {
    setLoading(true);
    getProductByCount(100)
      .then((resp) => {
        setProducts(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h3 className="text-danger">Loading...</h3>
          ) : (
            <h3>All Products</h3>
          )}
          <div className="row">
            {products.map((p, i) => (
              <div key={i} className="col-md-4 p-2">
                <AdminProductCard
                  product={p}
                  handleDeleteProduct={handleDeleteProduct}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
