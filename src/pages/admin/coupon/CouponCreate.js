import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
} from "../../../functions/coupon";
import { toast } from "react-toastify";
import { DatePicker } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

function CouponCreate() {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(null);
  const [expiry, setExpiry] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  let token = user.token;
  useEffect(() => {
    getAllCoupons(token).then((resp) => {
      setCoupons(resp.data);
    });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, discount, expiry: expiry._d });
    createCoupon(token, { name, discount, expiry: expiry._d })
      .then((resp) => {
        console.log(resp);
        setName("");
        setDiscount(0);
        setExpiry(null);
        toast.success(`${name} Coupon Created..`);
        setCoupons((coupon) => [...coupon, resp.data]);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  const handleDelete = (couponName) => {
    if (window.confirm(`Are you sure do you want to delete ${couponName}..?`)) {
      deleteCoupon(token, couponName)
        .then((resp) => {
          console.log(resp);
          let oldCoupons = coupons;
          let index = oldCoupons.findIndex((o) => o.name == couponName);
          oldCoupons.splice(index, 1);
          console.log(oldCoupons);
          setCoupons(() => [...oldCoupons]);
          toast.success(`${couponName} is deleted`);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    }
  };
  const showCouponForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Discount(%)</label>
        <input
          type="number"
          className="form-control"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Expiry</label>
        <DatePicker
          className="form-control"
          value={expiry}
          onChange={(data) => setExpiry(data)}
          required
        />
      </div>
      <button className="btn btn-outline-primary">Save</button>
    </form>
  );
  return (
    <div className="container-fluid mt-2">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-6">
          <h4>Coupon Create</h4>
          {showCouponForm()}
          <hr />
          <h4>Coupons ({coupons?.length})</h4>

          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Discount</th>
                <th scope="col">Expiry</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons?.map((c, i) => (
                <tr key={i}>
                  <td>{c.name}</td>
                  <td>{c.discount}</td>
                  <td>{moment(c.expiry).format("DD-MM-YYYY")}</td>
                  <td className="text-center">
                    <DeleteOutlined
                      onClick={() => handleDelete(c.name)}
                      className="text-danger h5"
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CouponCreate;
