import axios from "axios";

export const addPerson = data => {
  const request = axios.post("http://localhost:3001/api/persons", data);
  return request.then(res => res.data);
};

export const getPhonebook = () => {
  const request = axios.get("http://localhost:3001/api/persons");
  return request.then(res => res.data);
};

export const deletePerson = person => {
  const request = axios.delete(
    `http://localhost:3001/api/persons/${person.id}`
  );
  return request.then(res => res.data);
};

export const replaceNumber = (id, data) => {
  const request = axios.put(`http://localhost:3001/api/persons/${id}`, data);
  return request.then(res => res.data);
};
