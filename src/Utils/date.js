import moment from 'moment';

export function formatDate(date: Date) {
  return moment(date).format('MMM DD YYYY');
}
export function substractDate(fromDate, toDate) {
  return moment(toDate).diff(fromDate, 'days');
}
