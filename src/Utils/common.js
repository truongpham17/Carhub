import moment from 'moment';

const defaultFunction = () => {};
const subtractDate = (fromDate, toDate) => {
  const momentFromDate = moment(fromDate);
  const momentToDate = moment(toDate);
  const duration = momentToDate.diff(momentFromDate, 'days');
  return duration;
};
export { defaultFunction, subtractDate };
