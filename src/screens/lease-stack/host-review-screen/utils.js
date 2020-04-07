import moment from 'moment';
import { formatDate } from 'Utils/date';

export function getData(lease, user) {
  return [
    {
      id: 'name',
      label: 'Car name',
      content: `${lease.infoFromVin[1].value} ${lease.infoFromVin[3].value} ${lease.infoFromVin[4].value}`,
    },
    {
      id: 'status',
      label: 'Car status',
      content: `${lease.usingYears} years, ${lease.odometer} kilometers`,
    },
    {
      id: 'from',
      label: 'From date',
      content: formatDate(lease.startDate),
    },
    {
      id: 'to',
      label: 'To date',
      content: formatDate(lease.endDate),
    },
    {
      id: 'duration',
      label: 'Duration',
      content: `${moment(lease.endDate).diff(lease.startDate, 'days')} days`,
    },
    {
      id: 'customer',
      label: 'Customer name',
      content: user.username,
    },
    {
      id: 'phone',
      label: 'Phone',
      content: user.phone,
    },
    {
      id: 'location',
      label: 'Hub location',
      content: lease.selectedHub.address,
    },
    {
      id: 'number',
      label: 'Card number',
      content: lease.cardNumber,
    },
    {
      id: 'revenue',
      label: `You can earn up to`,
      content:
        Number(lease.carModel.price) *
        moment(lease.endDate).diff(lease.startDate, 'days'),
    },
  ];
}
