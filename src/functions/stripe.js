import axios from "axios";
export const createPayment = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/createPayment`,
    {},
    {
      headers: {
        authtoken: token,
      },
    }
  );
};
