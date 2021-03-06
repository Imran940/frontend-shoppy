import axios from "axios";
export const getAllOrders = async (token) => {
  return await axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
    headers: {
      authtoken: token,
    },
  });
};

export const changeOrderStatus = async (orderId, orderStatus, token) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken: token,
      },
    }
  );
};
