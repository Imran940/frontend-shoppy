import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { getAllCategories } from "../../../functions/category";
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { createSub, deleteSub, getAllSubs } from "../../../functions/sub";
import SubForm from "../../../components/form/Sub";

function SubCreate() {
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [oldSubs, setOldSubs] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  let token = user.token;
  useEffect(() => {
    getAllCategories()
      .then((resp) => {
        setCategories(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getAllSubs()
      .then((resp) => {
        console.log(resp);
        setSubs(resp.data);
        setOldSubs(resp.data);
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
    createSub(token, data)
      .then((resp) => {
        console.log(resp);
        setName("");
        toast.success("Sub-category Created..");
        setSubs((oldsub) => [...oldsub, resp.data]);
        setOldSubs((oldSub) => [...oldSub, resp.data]);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  const handleDelete = (slug) => {
    if (window.confirm(`Are you sure do you want to delete ${slug}..?`)) {
      deleteSub(token, slug)
        .then((resp) => {
          console.log(resp);
          let oldSub = subs;
          let index = oldSub.findIndex((o) => o.slug == slug);
          oldSub.splice(index, 1);
          setSubs(() => [...oldSub]);
          toast.success(`${slug} is deleted`);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    }
  };
  const handleFilterChange = (e) => {
    let Value = e.target.value;
    let filterSubs = subs.filter((c) =>
      c.name.toLowerCase().includes(Value.toLowerCase())
    );
    setSubs(filterSubs);
    if (e.target.value == "") {
      setSubs(() => [...oldSubs]);
    }
  };
  return (
    <div className="container-fluid mt-2">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-6">
          <h4>Sub Create</h4>
          <SubForm
            handleSubmit={handleSubmit}
            handleFilterChange={handleFilterChange}
            name={name}
            setName={setName}
            setParentId={setParentId}
            categories={categories}
            check={true}
          />
          <hr />
          {subs.map((c) => (
            <div className="alert alert-secondary">
              {c.name}
              <span
                className="btn btn-sm float-right"
                onClick={() => handleDelete(c.slug)}
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/sub/${c.slug}`}>
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

export default SubCreate;
