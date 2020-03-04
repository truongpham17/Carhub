import { combineReducers } from 'redux';
import user from './user';
import testReducer from './testReducer';
import userTest from './userTest';
import rentDetail from './rentDetail';
import rentHistory from './rentHistory';
import book from './book';

export default combineReducers({
  user,
  testReducer,
  userTest,
  rentDetail,
  rentHistory,
  book,
});
