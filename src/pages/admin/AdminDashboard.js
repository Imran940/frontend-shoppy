import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Order, { orderStatusValues } from "../../components/admin/Order";
import AdminNav from "../../components/nav/AdminNav";
import { changeOrderStatus, getAllOrders } from "../../functions/admin";
import { Table, Select, Button, Input } from "antd";
import moment from "moment";
const { Option } = Select;
const { Search } = Input;
let orderStatusChangedCheck;
function AdminDashboard() {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderStatusValue, setOrderStatusValue] = useState("");

  useEffect(() => {
    setLoading(true);
    getAllOrders(user?.token).then((resp) => {
      console.log(resp);
      let filteredOrders = resp.data.map((o) => ({
        date: o.createdAt,
        orderIdByStripe: o.paymentIntent.id,
        orderIdByMongo: o._id,
        productsName: o.products,
        amount: o.paymentIntent.amount / 100,
        paymentType: o.paymentIntent.payment_method_types[0],
        paymentStatus: o.paymentIntent.status,
        orderStatus: o.orderStatus,
      }));
      setOrders(filteredOrders);
      setLoading(false);
    });
  }, []);
  const handleStatusChange = (orderId, orderStatus, statusChanged = false) => {
    console.log({ orderId, orderStatus, statusChanged });
    if (statusChanged) {
      changeOrderStatus(orderId, orderStatus, user?.token).then((resp) => {
        console.log(resp);
        toast.success("status updated..");
        let orderIndex = orders.findIndex((o) => o.orderIdByMongo == orderId);
        let newOrders = orders;
        newOrders[orderIndex].orderStatus = orderStatus;
        console.log({ newOrders });
        // order.orderStatus = orderStatus;
        setOrders(() => [...newOrders]);
        orderStatusChangedCheck = false;
      });
    }
  };
  const getColumns = () => {
    const columns = [
      {
        title: "Date",
        dataIndex: "",
        key: "time",
        sorter: (a, b) => {
          const aDate = new Date(a.date);
          const bDate = new Date(b.date);
          if (aDate < bDate) return -1;
          if (aDate > bDate) return 1;
          return 0;
        },
        onFilter: (value, record) =>
          moment(moment(record.date).format("YYYY-MM-DD")).isBetween(
            value[0],
            value[1],
            null,
            "[]"
          ),
        render: (item) => {
          const momentTime = moment(item.date);
          const fullDate = momentTime.format("ddd, MMM Do");
          const fromTime = momentTime.format("h:mm A");
          return (
            <b style={{ whiteSpace: "nowrap" }}>{`${fullDate}, ${fromTime}`}</b>
          );
        },
      },
      {
        title: "Order Id",
        dataIndex: "",
        key: "orderId",
        render: (item) => {
          return <p>{item.orderIdByStripe}</p>;
        },
      },
      {
        title: "Product",
        dataIndex: "",
        key: "product",
        render: (item) => {
          return (
            <p>
              {item.productsName.length > 0
                ? item.productsName.map((p) => p.product.title)
                : "No products found"}
            </p>
          );
        },
      },
      {
        title: "Amount",
        key: "amount",
        render: (item) => {
          return <p>{item.amount}</p>;
        },
      },
      {
        title: "Payment Method",
        key: "payment_method",
        render: (item) => {
          return <p>{item.paymentType}</p>;
        },
      },
      {
        title: "Payment Status",
        key: "payment_status",
        render: (item) => {
          return (
            <p
              style={{
                background:
                  item.paymentStatus == "succeeded" ? "#34eb4f" : "#eb4f34",
                padding: "8px",
                borderRadius: "5px",
                textTransform: "capitalize",
                fontFamily: "sans-serif",
              }}
            >
              {item.paymentStatus}
            </p>
          );
        },
      },
      {
        title: "Order Status",
        key: "order_status",
        filters: orderStatusValues.map((o) => {
          return { text: o.name, value: o.value };
        }),
        onFilter: (value, record) => record.orderStatus == value,
        render: (item) => {
          return (
            <p
              style={{
                background: getBgColorForOrder(item.orderStatus),
                padding: "8px",
                borderRadius: "5px",
                textTransform: "capitalize",
                fontFamily: "sans-serif",
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              {item.orderStatus}
            </p>
          );
        },
      },
      {
        title: "Action",
        key: "action",
        render: (item) => {
          return (
            <div style={{ display: "flex" }}>
              <Select
                defaultValue={item.orderStatus}
                onChange={(e) => {
                  setOrderStatusValue(e);
                  if (e != item.orderStatus) {
                    orderStatusChangedCheck = true;
                    console.log(orderStatusChangedCheck);
                  } else {
                    orderStatusChangedCheck = false;
                    console.log(orderStatusChangedCheck);
                  }
                }}
              >
                {orderStatusValues.map((o, i) => (
                  <Option key={i} value={o.value}>
                    {o.name}
                  </Option>
                ))}
              </Select>
              <Button
                onClick={() =>
                  handleStatusChange(
                    item.orderIdByMongo,
                    orderStatusValue,
                    orderStatusChangedCheck
                  )
                }
                style={{ background: "#3464eb", color: "white" }}
              >
                Ok
              </Button>
            </div>
          );
        },
      },
    ];
    return columns;
  };

  const getBgColorForOrder = (orderStatus) => {
    if (orderStatus == "Not processed") {
      return "#9c9695";
    } else if (orderStatus == "Processing") {
      return "#7ffabd";
    } else if (orderStatus == "Dispatched") {
      return "#fa9e3c";
    } else if (orderStatus == "Cancelled") {
      return "#ff4433";
    } else {
      return "#3aff33";
    }
  };

  const handleSearch = (value) => {
    let filterOrders = orders;
    filterOrders = filterOrders.filter((fo) =>
      fo.productsName.find((p) =>
        p.product.title.toLowerCase().includes(value.toLowerCase())
      )
    );
    console.log({ filterOrders });
    setFilteredOrders(() => [...filterOrders]);
  };
  return (
    <div className="container-fluid mt-2">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-9">
          <h4>Admin Dashboard</h4>
          <h5
            className="text-center"
            style={{
              background: "#3464eb",
              color: "white",
              height: "2.5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading ? <span> Orders are loading...</span> : "All Orders"}
          </h5>
          <div style={{ width: "30%", marginBottom: "5px" }}>
            <Search
              onChange={(e) => {
                if (e.target.value == "") {
                  setFilteredOrders([]);
                }
              }}
              placeholder="search by text"
              onSearch={handleSearch}
            />
          </div>
          <div>
            <Table
              columns={getColumns()}
              dataSource={filteredOrders.length > 0 ? filteredOrders : orders}
              pagination={{ position: "botton", pageSize: 10 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
