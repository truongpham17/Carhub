import { ADD_BOOK } from '@redux/actions/book';

const INITIAL_STATE = {
  bookList: [
    { name: 'Truong', author: 'Truong' },
    { name: 'A', author: 'Truong' },
    { name: 'B', author: 'Truong' },
  ],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_BOOK: {
      return {
        ...state,
        bookList: [...state.bookList, action.payload],
      };
    }
    default:
      return { ...state };
  }
};
