import { combineReducers } from 'redux';
import user from './user';
import testReducer from './testReducer';
import userTest from './userTest';
import rentDetail from './rentDetail';
import rentHistory from './rentHistory';

export default combineReducers({
  user,
  testReducer,
  userTest,
  rentDetail,
  rentHistory,
});
