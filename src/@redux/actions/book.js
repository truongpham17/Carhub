export const ADD_BOOK = 'add_book';

export function addBook(data) {
  return {
    type: ADD_BOOK,
    payload: data,
  };
}
