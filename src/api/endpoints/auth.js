// Module
import axios from '../axios';

const endpoints = {
  login: (data) => axios.post('/auth/login', data),
  signup: (data) => axios.post('/auth/signup', data),
  getProfile: (data) => axios.get('/auth/me'),
};

export default endpoints;