import { combineReducers } from 'redux';
import user from './user';
import testReducer from './testReducer';
import userTest from './userTest';
import book from './book';

export default combineReducers({
  user,
  book,
  testReducer,
  userTest,
});
