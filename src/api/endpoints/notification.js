// Modules
import axios from '../axios';

const endpoints = Object.freeze({
  createNotifications: (flatId) => axios.post(`/notifications/${flatId}`),
  getMyNotification: () => axios.get('/notifications/myNotifications'),
});

export default endpoints;
