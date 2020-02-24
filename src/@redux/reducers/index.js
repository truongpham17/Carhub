import { combineReducers } from 'redux';
import user from './user';
import testReducer from './testReducer';
import testUser from './testUser';
import testapiReducer from './testapiReducer';

export default combineReducers({
  user,
  testReducer,
  testUser,
  testapiReducer,
});
