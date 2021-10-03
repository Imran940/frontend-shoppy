import axios from "axios";
export const saveCart = async (cart, token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authtoken: token,
      },
    }
  );
};

export const getCart = async (token) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken: token,
    },
  });
};

export const emptyCart = async (token) => {
  return await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken: token,
    },
  });
};

export const saveUserAddress = async (address, token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: {
        authtoken: token,
      },
    }
  );
};

export const applyCoupon = async (couponName, token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/coupon`,
    { coupon: couponName },
    {
      headers: {
        authtoken: token,
      },
    }
  );
};

export const createOrder = async (stripeResponse, token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { stripeResponse },
    {
      headers: {
        authtoken: token,
      },
    }
  );
};

export const getAllUserOrders = async (token) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/order`, {
    headers: {
      authtoken: token,
    },
  });
};
