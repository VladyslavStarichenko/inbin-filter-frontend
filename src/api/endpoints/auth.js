// Modules
import axios from '../axios';

const endpoints = Object.freeze({
  login: (data) => axios.post('/auth/login', data),
  signup: (data) => axios.post('/auth/signUp', data),
  getProfile: (data) => axios.get('/auth/me'),
  registerResident: (id) => axios.post(`/auth/registerResident/id=${id}`),
});

export default endpoints;
