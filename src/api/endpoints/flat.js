// Modules
import axios from 'axios';

const houseComplex = '/house-complex/flat';

const endpoints = Object.freeze({
  addNewFlat: (data) => axios.post(`${houseComplex}`, data),
  getFlatById: (flatId) => axios.get(`${houseComplex}/id/${flatId}`),
  getAllFlats: ({ pageNumber, pageSize, sortBy }) => (
    axios.get(`${houseComplex}/pageNumber=${pageNumber}/pageSize${pageSize}/sortBy=${sortBy}`)),
  updateFlatAddress: ({ flatId, newAddress }) => axios.put(`${houseComplex}/update/${flatId}/${newAddress}`),
});

export default endpoints;
