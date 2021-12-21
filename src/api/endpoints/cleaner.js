// Modules
import axios from '../axios';

const endpoints = Object.freeze({
  getFlats: () => axios.get('/cleaners/cleanersBin'),
  cleanBin: (binId) => axios.post(`/cleaners/clean/${binId}`),
});

export default endpoints;
