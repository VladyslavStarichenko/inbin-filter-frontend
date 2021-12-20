// Modules
import axios from '../axios';

const houseComplex = '/house-complex/flat/residents';

const endpoints = Object.freeze({
  getResidentById: (residentId) => axios.get(`${houseComplex}/id/${residentId}`),
  getResidentAccount: () => axios.get(`${houseComplex}/myAccount/`),
  getAllFlatResidents: ({ pageNumber, pageSize, id }) => (
    axios.get(`${houseComplex}/pageNumber=${pageNumber}/pageSize=${pageSize}/flatId=${id}`)),
  getAllFlatDebtors: ({ pageNumber, pageSize, id }) => (
    axios.get(`${houseComplex}/debtors/pageNumber=${pageNumber}/pageSize=${pageSize}/flatId=${id}`)),
});

export default endpoints;
