import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const createContact = newContact => {
  const request = axios.post(baseUrl, newContact);
  return request.then(response => response.data);
};

const deleteContact = id => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data);
};

const updateContact = (id, newContact) => {
  const request = axios.put(`${baseUrl}/${id}`, newContact);
  return request.then(response => response.data);
};
export default {
  getAll,
  createContact,
  deleteContact,
  updateContact,
};
