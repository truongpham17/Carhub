import moment from 'moment';
import { subtractDate } from 'Utils/common';

export function getActionLabel(status) {
  switch (status) {
    case 'UPCOMING':
      return 'GET CAR';
    case 'CURRENT':
    case 'OVERDUE':
      return 'RETURN CAR';
    case 'PAST':
      return 'HIRE THIS CAR';
    case 'SHARING':
      return 'CANCEL SHARING';
    case 'SHARED':
      return 'VIEW SHARING';
    case 'SHARE_REQUEST/ACCEPTED':
      return 'Confirm receive car';
    default:
      return 'RETURN CAR';
  }
}

export function getShowingData(rentDetail) {
  let typeofDate = '';
  if (rentDetail.status === 'CURRENT') {
    typeofDate = 'Days left';
  } else if (rentDetail.status === 'OVERDUE') {
    typeofDate = 'Days overdue';
  }
  const startDateFormat = moment(rentDetail.startDate).format('D MMMM, YYYY');
  const duration = subtractDate(rentDetail.startDate, rentDetail.endDate);
  const daysdiff = Math.abs(subtractDate(new Date(), rentDetail.endDate));

  return [
    { value: rentDetail.carModel.name, label: 'Name' },
    {
      value: rentDetail.car ? rentDetail.car.licensePlates : 'Not specified',
      label: 'License Plate',
    },
    { value: startDateFormat, label: 'Date Of Hire' },
    { value: `${duration} days`, label: 'Duration' },
    { value: `${rentDetail.price} $`, label: 'Price Per Day' },
    { value: `${rentDetail.totalCost} $`, label: 'Total' },
    { value: rentDetail.pickupHub.name, label: 'Store' },
    { value: daysdiff, label: typeofDate },
    { value: rentDetail.status, label: 'Status' },
  ];
}

export function getUpdateRentalData(rentDetail, location, price) {
  return {
    id: rentDetail._id,
    status: 'SHARING',
    geometry: location.geometry,
    price,
    address: location.address,
    log: {
      type: 'CREATE_SHARING',
      title: 'Request sharing car',
    },
  };
}
