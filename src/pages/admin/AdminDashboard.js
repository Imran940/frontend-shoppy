import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Order from "../../components/admin/Order";
import AdminNav from "../../components/nav/AdminNav";
import { changeOrderStatus, getAllOrders } from "../../functions/admin";

function AdminDashboard() {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getAllOrders(user?.token).then((resp) => {
      console.log(resp);
      setOrders(resp.data);
      setLoading(false);
    });
  }, []);
  const handleStatusChange = (orderId, orderStatus) => {
    changeOrderStatus(orderId, orderStatus, user?.token).then((resp) => {
      console.log(resp);
      toast.success("status updated..");
    });
  };
  return (
    <div className="container-fluid mt-2">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-8">
          <h4>Admin Dashboard</h4>
          <h5
            className="text-center"
            style={{ borderBottom: "1.5px solid black" }}
          >
            {loading ? (
              <span className="text-danger"> Orders are loading...</span>
            ) : (
              "All orders"
            )}
          </h5>
          <div className="container-fluid">
            <Order orders={orders} handleStatusChange={handleStatusChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
