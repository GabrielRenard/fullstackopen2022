import axios from "axios";

const baseUrl = `http://localhost:3001/persons`;

const getAll = () => {
  return axios.get(baseUrl);
};

const createContact = contactObj => {
  return axios.post(baseUrl, contactObj);
};

const deleteContact = id => {
  return axios.delete(`${baseUrl}/${id}`);
};
export default {
  getAll,
  createContact,
  deleteContact,
};
