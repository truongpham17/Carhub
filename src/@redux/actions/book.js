export const ADD_BOOK = 'add_book';

export function addbook(data) {
  return {
    type: ADD_BOOK,
    payload: data,
  };
}
