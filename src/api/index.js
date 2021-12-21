// Endpoints
import auth from './endpoints/auth';
import bin from './endpoints/bin';
import flat from './endpoints/flat';
import houseComplex from './endpoints/house-complex';
import resident from './endpoints/resident';
import waste from './endpoints/waste';
import payment from './endpoints/payment';
import cleaner from './endpoints/cleaner';
import notification from './endpoints/notification';

const allEndPoints = {
  auth,
  bin,
  cleaner,
  flat,
  houseComplex,
  resident,
  waste,
  payment,
  notification,
};

export default allEndPoints;
