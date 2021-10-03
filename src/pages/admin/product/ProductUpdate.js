import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Select } from "antd";
import {
  createProduct,
  getProduct,
  getSubsByCid,
  updateProduct,
} from "../../../functions/product";
import { getAllCategories } from "../../../functions/category";
import ProductForm from "../../../components/form/proudctForm";
import ImageUploadForm from "../../../components/form/ImageUploadForm";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import ProductUpdateForm from "../../../components/form/ProductUpdateForm";
const { Option } = Select;
const initialFormData = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
  brand: "",
  color: "",
  selectedSubs: [],
};
function ProductUpdate({ history }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  let token = user.token;
  let { slug } = useParams();
  useEffect(() => {
    //To get all categories
    getAllCategories().then((resp) => {
      setFormData((oldData) => ({ ...oldData, categories: resp.data }));
    });

    //To get all subsCategories

    getProduct(slug)
      .then((resp) => {
        console.log(resp);
        setFormData((oldFormData) => ({ ...oldFormData, ...resp.data[0] }));
        getSubsCategoryByCid(token, resp.data[0].category._id, false); // pre-populate sub-categories
      })
      .catch((err) => console.log(err));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(token, slug, formData)
      .then((resp) => {
        toast.success(`${slug} is updated successfully`);
        history.push("/admin/products");
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name == "category") {
      getSubsCategoryByCid(token, e.target.value, true); // removing all values from sub-cateogires arr..
    }
    console.log(formData);
  };

  const getSubsCategoryByCid = (token, cid, catChange) => {
    getSubsByCid(token, cid).then((resp) => {
      console.log(resp);
      setFormData((oldFormData) => ({
        ...oldFormData,
        subs: resp.data,
        selectedSubs: catChange == true ? [] : oldFormData.selectedSubs,
      }));
    });
  };
  return (
    <div className="container-fluid mt-2">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product Update</h4>
          )}
          <ImageUploadForm
            formData={formData}
            setFormData={setFormData}
            setLoading={setLoading}
          />
          <ProductUpdateForm
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductUpdate;
