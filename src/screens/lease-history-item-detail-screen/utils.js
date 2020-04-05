import { LeaseDetailType } from 'types';
import { formatDate } from 'Utils/date';
import { subtractDate } from 'Utils/common';
import moment from 'moment';

function getStatus(status) {
  switch (status) {
    case 'WAIT_TO_RETURN':
      return 'Wait to return';
    default:
      return status;
  }
}

export function getData(lease: LeaseDetailType) {
  const { status } = lease;
  const duration = subtractDate(lease.startDate, lease.endDate);
  const attrs = [
    { value: lease.car.carModel.name, label: 'Car Name' },
    { value: formatDate(lease.startDate), label: 'From date' },
    { value: formatDate(lease.endDate), label: 'To date' },
    { value: `${duration} day(s)`, label: 'Duration' },
    {
      value: lease.price > 0 ? `$ ${lease.price}` : `$ 0`,
      label: 'Price Per Day',
    },
    { value: `$ ${lease.totalEarn}`, label: 'Total earn' },
    // lease.hub.name
    { value: lease.hub.name, label: 'Hub' },
    { value: getStatus(status), label: 'Status' },
  ];

  if (status === 'PENDING' || status === 'PAST') {
    attrs.splice(7, 1);
  }
  if (!['PENDING', 'DECLINED', 'ACCEPTED'].includes(status)) {
    attrs.splice(1, 0, {
      value: lease.car.licensePlates,
      label: 'License Plate',
    });
  }

  if (['AVAILABLE', 'HIRING', 'WAIT_TO_RETURN'].includes(status)) {
    attrs.splice(3, 1, {
      value: 'Days left',
      label: subtractDate(new Date(), lease.endDate),
    });
  }
  return attrs;
}

export function getButtonData(lease: LeaseDetailType) {
  const { status } = lease;

  switch (status) {
    case 'AVAILABLE':
      return 'Request receive';
    case 'WAIT_TO_RETURN':
      return 'Confirm receive';
    case 'ACCEPTED':
      if (moment(lease.startDate).diff(new Date(), 'days') === 0) {
        return 'Confirm placing car';
      }
      return null;
    default:
      return null;
  }
}

export function getTransactionValue(lease: LeaseDetailType) {
  const value = {
    id: lease._id,
    type: 'lease',
    expired: new Date().getTime() + 1 * 60000,
  };
  return value;
}
