import axios from "axios";
export const getAllCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/categories`);

export const getACategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);

export const createCategory = async (token, name) =>
  await axios.post(
    `${process.env.REACT_APP_API}/category`,
    { name },
    {
      headers: {
        authtoken: token,
      },
    }
  );

export const updateCategory = async (token, slug, name) =>
  await axios.put(
    `${process.env.REACT_APP_API}/category/${slug}`,
    { name },
    {
      headers: {
        authtoken: token,
      },
    }
  );

export const deleteCategory = async (token, slug) =>
  await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken: token,
    },
  });
