import { combineReducers } from 'redux';
import user from './user';
import testReducer from './testReducer';
import userTest from './userTest';
import leaseRequest from './leaseRequest';
import rentHistory from './rentHistory';
import rentalsList from './rentalsList';
import hub from './hub';
import car from './car';
import payment from './payment';

export default combineReducers({
  user,
  testReducer,
  userTest,
  leaseRequest,
  rentHistory,
  rentalsList,
  hub,
  car,
  payment,
});
