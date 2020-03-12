import { combineReducers } from 'redux';
import user from './user';
import testReducer from './testReducer';
import userTest from './userTest';
import rentHistory from './rentHistory';
import rentalsList from './rentalsList';
import hub from './hub';
import car from './car';
import payment from './payment';
import rentItemDetail from './rentItemDetail';
import lease from './lease';

export default combineReducers({
  lease,
  user,
  testReducer,
  userTest,
  rentHistory,
  rentalsList,
  hub,
  car,
  payment,
  rentItemDetail,
});
