import moment from 'moment';

export function formatDate(date: Date, showHour?: boolean) {
  if (!showHour) {
    return moment(date).format('MMM DD YYYY');
  }
  return moment(date).format('hh:mm a, MMM DD YYYY');
}
export function substractDate(fromDate, toDate) {
  return moment(toDate).diff(fromDate, 'days');
}

export function formatPrice(price) {
  return `$ ${price}`;
}

export function formatDayLabel(day) {
  if (day <= 1) {
    return `${day} day`;
  }
  return `${day} days`;
}