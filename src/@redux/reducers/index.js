import { combineReducers } from 'redux';
import user from './user';
import testReducer from './testReducer';
import userTest from './userTest';
import leaseRequest from './leaseRequest';
import rentalsList from './rentalsList';
import hub from './hub';
import car from './car';
import payment from './payment';
import rentItemDetail from './rentItemDetail';

export default combineReducers({
  user,
  testReducer,
  userTest,
  leaseRequest,
  rentalsList,
  hub,
  car,
  payment,
  rentItemDetail,
});
