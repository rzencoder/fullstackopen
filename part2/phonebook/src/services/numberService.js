import axios from "axios";
const baseUrl = "/api/persons";

export const addPerson = data => {
  const request = axios.post(baseUrl, data);
  return request.then(res => res.data);
};

export const getPhonebook = () => {
  const request = axios.get(baseUrl);
  return request.then(res => res.data);
};

export const deletePerson = person => {
  const request = axios.delete(`${baseUrl}/${person.id}`);
  return request.then(res => res.data);
};

export const replaceNumber = (id, data) => {
  const request = axios.put(`${baseUrl}/${id}`, data);
  return request.then(res => res.data);
};
