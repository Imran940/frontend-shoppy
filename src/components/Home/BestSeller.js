import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Skeleton, Pagination } from "antd";
import {
  getProductsByCondition,
  getTotalProductCount,
  removeProduct,
} from "../../functions/product";
import AdminProductCard from "../Cards/AdminProductCard";
import LoadingCard from "../Cards/LoadingCard";
import { toast } from "react-toastify";
function BestSeller() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productCounts, setProductCounts] = useState(0);
  const { user } = useSelector((state) => ({ ...state }));
  let token = user?.token;
  useEffect(() => {
    setLoading(true);
    getProductsByCondition("sold", "desc", page)
      .then((resp) => {
        setProducts(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [page]);
  useEffect(() => {
    getTotalProductCount().then((resp) => {
      console.log(resp);
      setProductCounts(resp.data);
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
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((p) => (
              <div key={p._id} className="col-md-4">
                <AdminProductCard
                  product={p}
                  check={user ? user.role : "subscriber"}
                  handleDeleteProduct={handleDeleteProduct}
                />
              </div>
            ))}
          </div>
        )}
        <div className="row">
          <div className="col-md-4 offset-md-4 text-center pt-2 p-3 mb-4">
            <Pagination
              current={page}
              total={(productCounts / 3) * 10}
              onChange={(value) => setPage(value)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default BestSeller;
