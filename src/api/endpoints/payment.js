// Modules
import axios from '../axios';

const endpoints = Object.freeze({
  chargeCard: (data) => axios.post('/payment/charge', '', {
    headers: {
      token: data.token.id,
      amount: data.amount,
    },
  }),
});

export default endpoints;
