import { LeaseDetailType } from 'types';
import { formatDate, substractDate, formatPrice } from 'Utils/date';

import moment from 'moment';
import policy from 'Constants/policy';
import colors from 'Constants/colors';
import {
  setPopUpData,
  confirmTransaction,
  getLeaseList,
  cancelPopup,
} from '@redux/actions';
import firebase from 'react-native-firebase';
import {
  WAITING_FOR_CONFIRM,
  COMPLETED,
  WAITING_FOR_USER_CONFIRM,
  CANCEL,
  USER_CANCEL,
  WAITING_USER_TRANSFER_CAR,
  USER_ACCEPT_TRANSFER_CAR,
  HUB_REJECT_TRASACTION,
  HUB_REJECT_TRASACTION_LEASE,
} from 'Constants/status';
import { changeTransactionStatus } from 'Utils/database';

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
  const duration = substractDate(lease.startDate, lease.endDate);
  const attrs = [
    { value: lease.car.carModel.name, label: 'Car Name' },
    { value: lease.car.licensePlates, label: 'License plates' },
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

  // if (!['PENDING', 'DECLINED', 'ACCEPTED'].includes(status)) {
  //   attrs.splice(1, 0, {
  //     value: lease.car.licensePlates,
  //     label: 'License Plate',
  //   });
  // }

  if (['AVAILABLE', 'HIRING', 'WAIT_TO_RETURN'].includes(status)) {
    attrs.splice(3, 1, {
      label: 'Days left',
      value: substractDate(new Date(), lease.endDate),
    });
  }
  if (status === 'DECLINED') {
    attrs.push({
      label: 'Decline reason',
      value: lease.message,
    });
  }

  if (status === 'WAIT_TO_RETURN') {
    attrs.push({
      label: 'Penalty fee',
      value: formatPrice(10 * substractDate(lease.updatedAt, new Date())),
    });
  }
  return attrs;
}

export function getButtonData(lease: LeaseDetailType) {
  const { status } = lease;
  switch (status) {
    case 'AVAILABLE':
      return { label: 'Request take car' };
    case 'WAIT_TO_RETURN':
      return { label: 'Confirm receive' };
    case 'ACCEPTED':
      if (moment(lease.startDate).diff(new Date(), 'days') === 0) {
        return { label: 'Confirm placing car' };
      }
      return null;
    case 'PENDING':
      return {
        label: 'Cancel request',
        colorStart: colors.errorLight,
        colorEnd: colors.error,
      };
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

export function handleRequestReceive(lease, dispatch) {
  setPopUpData(dispatch)({
    title: 'Request take your car back',
    description: 'Are you sure to request to take your car back?',
    onConfirm() {
      setPopUpData(dispatch)({
        popupType: 'policy',
        title: 'Request take car',
        description: policy.REQUEST_TAKE_CAR,
        onDecline() {
          cancelPopup(dispatch);
          // navigation.pop();
        },
        onConfirm() {
          confirmTransaction(dispatch)(
            { toStatus: 'WAIT_TO_RETURN', id: lease._id, type: 'lease' },
            {
              onSuccess() {
                getLeaseList(dispatch)();
              },
            }
          );
        },
      });
    },
  });
}

export function handleCancelRequest(lease, dispatch) {
  setPopUpData(dispatch)({
    title: 'Cancel request',
    description: 'Are you sure to cancel your request',
    onConfirm() {
      cancelPopup(dispatch);
      confirmTransaction(dispatch)(
        { toStatus: 'CANCEL', id: lease._id, type: 'lease' },
        {
          onSuccess() {
            getLeaseList(dispatch)();
            setPopUpData(dispatch)({
              title: 'Success',
              description:
                'Success cancel your request. Thank you for using our service',
              popupType: 'success',
            });
          },
        }
      );
    },
  });
}

export function listenFirebaseStatus({
  lease,
  dispatch,
  onCloseModal,
}: {
  lease: LeaseDetailType,
}) {
  firebase
    .database()
    .ref(`scanQRCode/${lease._id}`)
    .on('value', snapShot => {
      switch (snapShot.val().status) {
        // employee staring to scan the QR Code
        case WAITING_FOR_CONFIRM:
          onCloseModal();
          setPopUpData(dispatch)({
            title: 'Scanning successfully',
            description: 'Please wait for the staff to confirm your car',
            acceptOnly: true,
          });
          break;
        // employee press confirm to receive car

        // don't know :))
        case WAITING_FOR_USER_CONFIRM: {
          onCloseModal();
          setPopUpData(dispatch)({
            popupType: 'confirm',
            title: 'Confirm take your car',
            description: `Confirm take the ${lease.car.carModel.name} with license plates: ${lease.car.licensePlates}?`,
            onConfirm() {
              confirmTransaction(dispatch)(
                { toStatus: 'PAST', id: lease._id, type: 'lease' },
                {
                  onSuccess() {
                    getLeaseList(dispatch)();
                    changeTransactionStatus(lease._id, COMPLETED);
                    setPopUpData(dispatch)({
                      title: 'Success',
                      description:
                        'Success take your car back. Thank you for using our service',
                      popupType: 'success',
                    });
                  },
                }
              );
            },
            onDecline() {
              changeTransactionStatus(lease._id, USER_CANCEL);
            },
          });
          break;
        }
        // employee
        case HUB_REJECT_TRASACTION_LEASE:
          onCloseModal();
          setPopUpData(dispatch)({
            popupType: 'error',
            title: 'Hub reject receive car',
            description: 'Your car has been rejected to receive',
            onConfirm() {
              getLeaseList(dispatch)();
            },
          });
          break;
        // employee press cancel receive car!
        case CANCEL: {
          onCloseModal();
          let description = '';

          if (lease.status === 'ACCEPTED') {
            description =
              'Your car has been denied. Please try again or cancel your leasing';
          } else if (lease.status === 'WAIT_TO_RETURN') {
            description =
              'Fail to return your car. Please ask the staff for support.';
          }
          setPopUpData(dispatch)({
            popupType: 'error',
            title: 'Transaction denied!',
            description,
          });

          break;
        }
        case COMPLETED: {
          setPopUpData(dispatch)({
            popupType: 'success',
            title: 'Success',
            description:
              'You has been placing your car at the hub successfully! Thank you for using service',
            onConfirm() {
              getLeaseList(dispatch)();
            },
          });

          break;
        }

        case WAITING_USER_TRANSFER_CAR:
          setPopUpData(dispatch)({
            popupType: 'confirm',
            title: 'Confirm placing car',
            description: `Confirm placing the ${lease.car.carModel.name} at hub?`,
            onConfirm() {
              changeTransactionStatus(lease._id, USER_ACCEPT_TRANSFER_CAR);
            },
            onDecline() {
              changeTransactionStatus(lease._id, USER_CANCEL);
            },
          });
          break;

        default: {
          console.log('error');
        }
      }
    });
}
