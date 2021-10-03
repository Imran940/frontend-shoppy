import axios from "axios";
export const getAllSubs = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subs`);

export const getASub = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);

export const createSub = async (token, data) =>
  await axios.post(
    `${process.env.REACT_APP_API}/sub`,
    { name: data.name, parent: data.parentId },
    {
      headers: {
        authtoken: token,
      },
    }
  );

export const updateSub = async (token, slug, data) =>
  await axios.put(
    `${process.env.REACT_APP_API}/sub/${slug}`,
    { name: data.name, parent: data.parentId },
    {
      headers: {
        authtoken: token,
      },
    }
  );

export const deleteSub = async (token, slug) =>
  await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
    headers: {
      authtoken: token,
    },
  });
