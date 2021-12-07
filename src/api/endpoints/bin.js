// Modules
import axios from '../axios';

const endpoints = Object.freeze({
  deleteBinById: (binId) => axios.delete(`/bin/${binId}`),
  createBin: (flatId) => axios.post(`/bin/create/${flatId}`),
  getAllBins: (flatId) => axios.get(`/bin/flatId=${flatId}`),
  getBinById: (binId) => axios.get(`/bin/id/${binId}`),
  updateBin: ({ binId, capacity, litterType, flatId }) => (
    axios.put(`/bin/update/${binId}/capacity${capacity}/${litterType}/flatId${flatId}`)),
});

export default endpoints;
