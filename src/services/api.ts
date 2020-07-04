import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apitotestjs.herokuapp.com/',
});

export default api;
