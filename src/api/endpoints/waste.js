// Modules
import axios from '../axios';

const wasteBaseURL = '/house-complex/flat/residents/waste';

const endpoints = Object.freeze({
  commitWaste: (data) => axios.post(`${wasteBaseURL}`, data),
  getMyBill: () => axios.get(`${wasteBaseURL}/myBill`),
  getAllWastesByFlat: (flatAddress) => (
    axios.get(`${wasteBaseURL}/litterType/statistics/flat/${flatAddress}`)),
  getAllWastesByResident: (residentId) => (
    axios.get(`${wasteBaseURL}/litterType/statistics/resident/${residentId}`)),
  getMyWastes: ({ pageNumber, pageSize }) => (
    axios.get(`${wasteBaseURL}/myWastes/pageNumber=${pageNumber}/pageSize=${pageSize}`)),
  getAllWastesByResidentPaginated: ({ pageNumber, pageSize, residentId }) => (
    axios.get(`${wasteBaseURL}/userWastes/pageNumber=${pageNumber}/pageSize=${pageSize}/${residentId}`)),
});

export default endpoints;
