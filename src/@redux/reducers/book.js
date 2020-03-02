import { ADD_BOOK } from '@redux/actions/book';

const INITIAL_STATE = {
  bookList: [
    { name: 'Truong', author: 'Truong' },
    { name: 'Cuong', author: 'Cuong' },
    { name: 'Toi thich di dao', author: 'Tri' },
    { name: 'Toi thich an banh', author: 'Dat' },
  ],
};

// action : {type, payload}
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
