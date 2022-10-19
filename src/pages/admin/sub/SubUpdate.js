import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { getAllCategories } from "../../../functions/category";
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  createSub,
  deleteSub,
  getAllSubs,
  getASub,
  updateSub,
} from "../../../functions/sub";
import SubForm from "../../../components/form/Sub";

function SubUpdate({ match, history }) {
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [categories, setCategories] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  let token = user.token;
  let slug = match.params.slug;
  useEffect(() => {
    getAllCategories()
      .then((resp) => {
        setCategories(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getASub(slug)
      .then((resp) => {
        console.log(resp);
        setName(resp.data.name);
        setParentId(resp.data.parent);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      parentId,
    };
    console.log(data);
    updateSub(token, slug, data)
      .then((resp) => {
        console.log(resp);
        setName("");
        toast.success("Sub-category Updated..");
        history.push("/admin/sub");
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
          <h4>Sub-Category Update</h4>
          <SubForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            parentId={parentId}
            setParentId={setParentId}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
}

export default SubUpdate;
