// Modules
import axios from 'axios';

const houseComplex = '/house-complex/';

const endpoints = Object.freeze({
  getHouseComplex: () => axios.get(houseComplex),
  registerComplex: (data) => axios.post(houseComplex, data),
});

export default endpoints;
