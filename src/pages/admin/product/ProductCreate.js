import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Select } from "antd";
import { createProduct, getSubsByCid } from "../../../functions/product";
import { getAllCategories } from "../../../functions/category";
import ProductForm from "../../../components/form/proudctForm";
import ImageUploadForm from "../../../components/form/ImageUploadForm";
import { LoadingOutlined } from "@ant-design/icons";
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
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus", "Roadster"],
  brand: "",
  color: "",
  selectedSubs: [],
};
function ProductCreate({ history }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  let token = user.token;
  useEffect(() => {
    getAllCategories().then((resp) => {
      setFormData((oldData) => ({ ...oldData, categories: resp.data }));
    });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let values = formData;
    console.log(values);
    values.subs = [];
    if (values.category == "" || values.category == "please select category") {
      toast.warning("please select the category");
    } else {
      createProduct(token, values)
        .then((resp) => {
          console.log(resp);
          toast.success("product created");
          history.push("/admin/products");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleChange = (e) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name == "category") {
      getSubsByCid(token, e.target.value).then((resp) => {
        console.log(resp);
        setFormData((oldFormData) => ({
          ...oldFormData,
          subs: resp.data,
          selectedSubs: [],
        }));
      });
    }
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
            <h4>Product Create</h4>
          )}
          <ImageUploadForm
            formData={formData}
            setFormData={setFormData}
            setLoading={setLoading}
          />
          <ProductForm
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

export default ProductCreate;
