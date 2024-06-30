import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const create = (newPerson) => {
  const req = axios.post(baseUrl, newPerson);
  return req.then((res) => res.data);
};

const update = (id, newPerson) => {
  const req = axios.put(`${baseUrl}/${id}`, newPerson);
  return req.then((res) => res.data);
};

const deletePerson = (id) => {
  axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, update, deletePerson };
