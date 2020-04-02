import { combineReducers } from 'redux';
import user from './user';
import testReducer from './testReducer';
import userTest from './userTest';
import rentHistory from './rentHistory';
import rental from './rental';
import hub from './hub';
import car from './car';
import payment from './payment';
import rentItemDetail from './rentItemDetail';
import lease from './lease';
import log from './log';
import sharing from './sharing';

export default combineReducers({
  lease,
  user,
  testReducer,
  userTest,
  rentHistory,
  rental,
  hub,
  car,
  payment,
  rentItemDetail,
  sharing,
  log,
});
