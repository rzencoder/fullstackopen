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

export default { getAll, create, update, setToken };
