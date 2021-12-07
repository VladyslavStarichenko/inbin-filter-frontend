// Modules
import axios from '../axios';

const endpoints = Object.freeze({
  login: (data) => axios.post('/auth/login', data),
  signup: (data) => axios.post('/auth/signUp', data),
  getProfile: (data) => axios.get('/auth/me'),
  registerResident: (id, data) => axios.post(`/auth/registerResident/id=${id}`, data),
});

export default endpoints;
