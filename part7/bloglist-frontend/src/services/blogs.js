import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const create = async (newObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const update = async (newObject, id) => {
  const config = { headers: { Authorization: token } };
  const url = `${baseUrl}/${id}`;
  const response = await axios.put(url, newObject, config);
  return response.data;
};

const addComment = async (comment, id) => {
  const url = `${baseUrl}/${id}/comments`;
  const response = await axios.post(url, comment);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = { headers: { Authorization: token } };
  const url = `${baseUrl}/${id}`;
  const response = await axios.delete(url, config);
  return response.data;
};

export default { getAll, create, update, setToken, deleteBlog, addComment };
