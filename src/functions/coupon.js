import axios from "axios";
export const getAllCoupons = async () =>
  await axios.get(`${process.env.REACT_APP_API}/coupons`);

export const createCoupon = async (token, couponObj) =>
  await axios.post(`${process.env.REACT_APP_API}/coupon`, couponObj, {
    headers: {
      authtoken: token,
    },
  });

export const deleteCoupon = async (token, couponId) =>
  await axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`, {
    headers: {
      authtoken: token,
    },
  });
