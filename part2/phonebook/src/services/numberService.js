import axios from "axios";

export const addPerson = (newName, newNumber) => {
  const request = axios.post("http://localhost:3001/persons", {
    name: newName,
    number: newNumber
  });
  return request.then(res => res.data);
};

export const getPhonebook = (newName, newNumber) => {
  const request = axios.get("http://localhost:3001/persons");
  return request.then(res => res.data);
};
