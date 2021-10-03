import axios from "axios";
export const createProduct = async (token, data) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, data, {
    headers: {
      authtoken: token,
    },
  });

export const getSubsByCid = async (token, cid) =>
  await axios.get(`${process.env.REACT_APP_API}/category/subs/${cid}`, {
    headers: {
      authtoken: token,
    },
  });

export const uploadImages = async (token, image) =>
  await axios.post(
    `${process.env.REACT_APP_API}/uploadimages`,
    { image },
    {
      headers: {
        authtoken: token,
      },
    }
  );

export const removeImages = async (token, public_id) =>
  await axios.post(
    `${process.env.REACT_APP_API}/removeimages`,
    { public_id },
    {
      headers: {
        authtoken: token,
      },
    }
  );

export const getProductByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

export const removeProduct = async (token, slug) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken: token,
    },
  });

export const getProduct = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

export const updateProduct = async (token, slug, data) =>
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, data, {
    headers: {
      authtoken: token,
    },
  });

export const getProductsByCondition = async (sort, order, page) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    page,
  });

export const getTotalProductCount = async () =>
  await axios.get(`${process.env.REACT_APP_API}/product/total`);

export const updateStarChange = async (token, star, productId) =>
  await axios.put(
    `${process.env.REACT_APP_API}/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken: token,
      },
    }
  );

export const getRelatedProducts = async (productId) =>
  await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);

export const fetchProductsByFilter = async (arg) =>
  await axios.post(`${process.env.REACT_APP_API}/product/filter`, arg);
