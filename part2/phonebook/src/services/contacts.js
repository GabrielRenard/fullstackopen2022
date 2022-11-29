import axios from "axios";

const baseUrl = `http://localhost:3001/persons`;

const getAll = () => {
  return axios.get(baseUrl);
};

const createContact = contactObj => {
  return axios.post(baseUrl, contactObj);
};

export default {
  getAll,
  createContact,
};
