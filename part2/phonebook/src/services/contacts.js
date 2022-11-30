import axios from "axios";

const baseUrl = `http://localhost:3001/persons`;

const getAll = () => {
  return axios.get(baseUrl);
};

const createContact = contactObj => {
  const request = axios.post(baseUrl, contactObj);
  return request.then(response => response.data);
};

const deleteContact = id => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data);
};

const updateContact = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
};
export default {
  getAll,
  createContact,
  deleteContact,
  updateContact,
};
