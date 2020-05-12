import moment from 'moment';
import {
  formatDate,
  substractDate,
  formatDayLabel,
  formatPrice,
} from 'Utils/date';
import { setPopUpData } from '@redux/actions';
import remoteConfig from 'Constants/remote-config';

export function getData(lease, user, dispatch) {
  const daydiff = substractDate(lease.startDate, lease.endDate);
  return [
    {
      key: 'customer',
      label: 'Customer',
      detail: user.fullName,
      headGroup: true,
      headTitle: 'Customer Information',
      headerStyle: { marginTop: 0 },
    },
    {
      key: 'phone',
      label: 'Phone',
      detail: user.phone,
    },
    {
      key: 'name',
      label: 'Car name',
      detail: `${lease.infoFromVin[1].value} ${lease.infoFromVin[3].value} ${lease.infoFromVin[4].value}`,
      headGroup: true,
      headTitle: 'Lease Information',
    },
    {
      key: 'status',
      label: 'Car status',
      detail: `${lease.usingYear} years, ${lease.odometer} kilometers`,
    },
    {
      key: 'from',
      label: 'From date',
      detail: formatDate(lease.startDate),
    },
    {
      key: 'to',
      label: 'To date',
      detail: formatDate(lease.endDate),
    },
    {
      key: 'duration',
      label: 'Duration',
      detail: formatDayLabel(daydiff),
    },

    {
      key: 'location',
      label: 'Hub location',
      detail: lease.selectedHub.address,
    },
    {
      key: 'number',
      label: 'Paypal account',
      detail: lease.cardNumber,
      pressable: true,
      nextIcon: 'question',
      onItemPress() {
        setPopUpData(dispatch)({
          popupType: 'confirm',
          acceptOnly: true,
          title: 'Paypal email/phone',
          description: `After finish the leasing period, we will send your profit to this account. Please make sure that it is correctly.`,
        });
      },
      headGroup: true,
      headTitle: 'Profit Information',
    },
    {
      key: 'revenue',
      label: `You can earn up to`,
      detail: formatPrice(
        Number(lease.carModel.price * remoteConfig.lease_rate) * daydiff
      ),
      pressable: true,
      nextIcon: 'question',
      onItemPress() {
        setPopUpData(dispatch)({
          popupType: 'confirm',
          acceptOnly: true,
          title: 'How to calculate your profit',
          description: `The profit you can earn depends on how much days your car has been rented.\nWe cannot promise that your car would be rented.\nYour leasing is duration is 30 days, and the renting fee each day is $ ${
            lease.carModel.price
          }, it means you can earn up to ${formatPrice(
            Number(lease.carModel.price * remoteConfig.lease_rate) * daydiff
          )}.`,
        });
      },
    },
  ];
}
