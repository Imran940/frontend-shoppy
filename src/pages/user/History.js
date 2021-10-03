import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserNav from "../../components/nav/UserNav";
import ShowPaymentInfo from "../../components/user/ShowPaymentInfo";
import { getAllUserOrders, getCart } from "../../functions/user";
function History() {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);
  let token = user?.token;
  let dispatch = useDispatch();
  let cartArr = [];
  useEffect(() => {
    getCart(token).then((resp) => {
      console.log(resp);
      resp.data.products?.map((p, i) => {
        cartArr.push({
          ...p.product,
          count: resp.data.products[i].count,
          price: resp.data.products[i].price,
        });
      });
      console.log(cartArr);
      dispatch({
        type: "ADD_TO_CART",
        payload: cartArr,
      });
      localStorage.setItem("cart", JSON.stringify(cartArr));
    });

    getAllUserOrders(token).then((resp) => {
      console.log(resp);
      setOrders(resp.data);
    });
  }, []);
  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>
      <tbody>
        {order.products?.map((p, i) => (
          <tr>
            <td>{p.product.title}</td>
            <td>{p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.count}</td>
            <td>{p.color}</td>
            <td>
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined className="h4 text-success" />
              ) : (
                <CloseCircleOutlined className="h4 text-danger" />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  const showEachOrders = () =>
    orders?.map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <ShowPaymentInfo order={order} />

        {console.log(order)}
        {showOrderInTable(order)}
      </div>
    ));
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-8 text-center">
          <h4>
            {orders?.length > 0 ? "User purchase history" : "No orders found"}
          </h4>{" "}
          {showEachOrders()}
        </div>
      </div>
    </div>
  );
}

export default History;
