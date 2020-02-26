import { combineReducers } from 'redux';
import user from './user';
import testReducer from './testReducer';
import userTest from './userTest';

export default combineReducers({
  user,
  testReducer,
  userTest,
});
