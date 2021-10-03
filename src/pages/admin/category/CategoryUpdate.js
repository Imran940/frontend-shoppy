import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import {
  createCategory,
  updateCategory,
  getACategory,
} from "../../../functions/category";
import { toast } from "react-toastify";
import CategoryForm from "../../../components/form/Category";

function CategoryUpdate({ match, history }) {
  const [name, setName] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  console.log(match);
  let token = user.token;
  let slug = match.params.slug;
  useEffect(() => {
    getACategory(slug)
      .then((resp) => {
        console.log(resp);
        setName(resp.data.category[0].name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    updateCategory(token, slug, name)
      .then((resp) => {
        console.log(resp);
        setName("");
        toast.success("Category Updated..");
        history.push("/admin/category");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  return (
    <div className="container-fluid mt-2">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-6">
          <h4>Category Update</h4>
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
      </div>
    </div>
  );
}

export default CategoryUpdate;
