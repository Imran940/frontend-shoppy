import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "../../../functions/category";
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/form/Category";

function CategoryCreate() {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [categ, setCateg] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  let token = user.token;
  useEffect(() => {
    getAllCategories()
      .then((resp) => {
        console.log(resp);
        setCategories(resp.data);
        setCateg(resp.data);
        console.log({ categ });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory(token, name)
      .then((resp) => {
        console.log(resp);
        setName("");
        toast.success("Category Created..");
        setCategories((oldCategories) => [...oldCategories, resp.data]);
        setCateg((oldCategories) => [...oldCategories, resp.data]);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  const handleDelete = (slug) => {
    if (window.confirm(`Are you sure do you want to delete ${slug}..?`)) {
      deleteCategory(token, slug)
        .then((resp) => {
          console.log(resp);
          let oldCategories = categories;
          let index = oldCategories.findIndex((o) => o.slug == slug);
          oldCategories.splice(index, 1);
          console.log(oldCategories);
          setCategories(() => [...oldCategories]);
          toast.success(`${slug} is deleted`);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    }
  };
  const handleFilterChange = (e) => {
    setValue(e.target.value);
    let Value = e.target.value;
    let filterCategory = categories.filter((c) =>
      c.name.toLowerCase().includes(Value.toLowerCase())
    );
    setCategories(filterCategory);
    if (e.target.value == "") {
      setCategories(() => [...categ]);
    }
  };
  return (
    <div className="container-fluid mt-2">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-6">
          <h4>Category Create</h4>
          <CategoryForm
            handleSubmit={handleSubmit}
            handleFilterChange={handleFilterChange}
            name={name}
            setName={setName}
            check={true}
          />
          <hr />
          {categories.map((c) => (
            <div className="alert alert-secondary">
              {c.name}
              <span
                className="btn btn-sm float-right"
                onClick={() => handleDelete(c.slug)}
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/category/${c.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-danger" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryCreate;
