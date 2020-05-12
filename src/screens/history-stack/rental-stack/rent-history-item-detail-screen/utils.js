import moment from 'moment';
import { substractDate, formatDate, formatPrice } from 'Utils/date';
import { changeTransactionStatus, changeSharingStatus } from 'Utils/database';
import {
  WAITING_FOR_SCAN,
  COMPLETED,
  WAITING_FOR_CONFIRM,
  WAITING_FOR_USER_CONFIRM,
  CANCEL,
  TRANSACTION_ERROR,
  USER_CANCEL,
  WAITING_FOR_USER_CONFIRM_NEXT,
  HUB_REJECT_TRASACTION,
} from 'Constants/status';
import { RentDetailType, CarType, SharingType } from 'types';
import firebase from 'react-native-firebase';
import {
  getRentalList,
  setPopUpData,
  cancelPopup,
  confirmTransaction,
  getCar,
  confirmSharing,
} from '@redux/actions';

export function getActionLabel(status) {
  switch (status) {
    case 'UPCOMING':
      return 'GET CAR';
    case 'CURRENT':
    case 'OVERDUE':
    case 'SHARE_REQUEST/CURRENT':
      return 'RETURN CAR';
    // case 'PAST':
    //   return 'HIRE THIS CAR';
    case 'SHARING':
      return 'SHARING DETAIL';
    case 'SHARED':
      return 'VIEW SHARING';
    case 'SHARE_REQUEST/ACCEPTED':
      return 'Confirm receive car';

    // case 'SHARE_REQUEST/CANCEL':
    //   return 'f sdfs';
    default:
      return '';
  }
}

export function getShowingData(rentDetail: RentDetailType) {
  let typeOfDate = '';
  if (rentDetail.status === 'CURRENT') {
    typeOfDate = 'Days left';
  } else if (rentDetail.status === 'OVERDUE') {
    typeOfDate = 'Days overdue';
  }
  // const startDateFormat = moment(rentDetail.startDate).format('D MMMM, YYYY');
  const duration = substractDate(rentDetail.startDate, rentDetail.endDate);
  const daysdiff = Math.abs(substractDate(new Date(), rentDetail.endDate));

  const { sharing } = rentDetail;

  if (sharing) {
    const substract = substractDate(sharing.fromDate, sharing.toDate);
    return [
      {
        key: 'car',
        detail: rentDetail.carModel.name,
        label: 'Car name',
        headGroup: true,
        headTitle: 'Car Information',
        headerStyle: { marginTop: 0 },
      },
      {
        detail: rentDetail.car ? rentDetail.car.licensePlates : 'Not specified',
        label: 'License Plate',
      },

      {
        key: 'rental',
        detail: formatDate(sharing.fromDate),
        label: 'Start date',
        headGroup: true,
        headTitle: 'Sharing Information',
        // headerStyle: { marginTop: 0 },
      },
      {
        key: '23',
        detail: formatDate(sharing.toDate),
        label: 'Start date',
        // headerStyle: { marginTop: 0 },
      },
      { detail: `${formatDate(substract)}`, label: 'Duration', key: 'fds' },
      {
        key: '31231',
        label: 'Total',
        detail: formatPrice(substract * sharing.price),
      },
    ];
  }

  console.log('asfsd', sharing);

  const attrs = [
    {
      key: 'customer',
      detail: rentDetail.carModel.name,
      label: 'Car name',
      headGroup: true,
      headTitle: 'Car Information',
      headerStyle: { marginTop: 0 },
    },
    {
      detail: rentDetail.car ? rentDetail.car.licensePlates : 'Not specified',
      label: 'License Plate',
    },

    {
      key: 'rental',
      detail: formatDate(rentDetail.startDate),
      label: 'Start date',
      headGroup: true,
      headTitle: 'Rental Information',
      // headerStyle: { marginTop: 0 },
    },

    // { detail: formatDate(rentDetail.startDate), label: 'Starting date' },
    { detail: formatDate(rentDetail.endDate), label: 'End date' },
    { detail: `${duration} days`, label: 'Duration' },
    { detail: formatPrice(rentDetail.price), label: 'Price Per Day' },
    { detail: formatPrice(rentDetail.totalCost), label: 'Total' },
    { detail: formatPrice(rentDetail.deposit), label: 'Deposit' },
    { detail: rentDetail.pickupHub.name, label: 'Pick up hub' },
    { detail: rentDetail.pickoffHub.name, label: 'Pick off hub' },
    { detail: rentDetail.status, label: 'Status' },
  ];
  if (typeOfDate) {
    attrs.push({ detail: daysdiff, label: typeOfDate });
    // attrs.splice(6, 1, { detail: daysdiff, label: typeOfDate });
  }
  if (rentDetail.status === 'DECLINED') {
    attrs.push({ detail: rentDetail.message, label: 'Decline reason' });
  }

  // if(rentDetail.status === 'SHARED') {
  //   attrs.push({
  //     value: rentDetail.sh
  //   })
  // }

  return attrs;
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

export function generateQRCodeValue(id) {
  return {
    id,
    type: 'rental',
    expired: Date.now(),
  };
}

export function listenFirebaseStatus({
  rental,
  onCloseModal,
  dispatch,
}: {
  rental: RentDetailType,
}) {
  changeTransactionStatus(rental._id, WAITING_FOR_SCAN);
  return firebase
    .database()
    .ref(`scanQRCode/${rental._id}`)
    .on('value', async snapShot => {
      console.log(snapShot);
      if (!snapShot) return;
      const val = snapShot.val();
      console.log('value from firebaase', val);
      if (!val) return;

      switch (val.status) {
        case WAITING_FOR_CONFIRM: {
          onCloseModal();
          setPopUpData(dispatch)({
            title: 'Scanning successfully',
            description: 'Please wait for the staff to confirm your request',
            acceptOnly: true,
          });
          break;
        }
        case WAITING_FOR_USER_CONFIRM_NEXT:
        case WAITING_FOR_USER_CONFIRM: {
          onCloseModal();
          const { car } = val;
          if (!car || car === 'undefined') {
            return setPopUpData(dispatch)({
              acceptOnly: true,
              title: 'Cannot recognize car!',
            });
          }

          const carDetail: CarType = await getCar(car);

          let description = `Are you sure to take the ${carDetail.carModel.name} with license plates: ${carDetail.licensePlates}?`;
          if (carDetail.carModel._id !== rental.carModel._id) {
            description += `Current price: ${formatPrice(
              rental.carModel.price
            )}`;
            description += `\nNew price: ${formatPrice(
              carDetail.carModel.price
            )}`;
            const increase = carDetail.carModel.price - rental.carModel.price;
            if (increase > 0) {
              description += `\nIncrease fee: +${formatPrice(increase)}`;
            } else {
              description += `\nDecrease fee: -${formatPrice(
                Math.abs(increase)
              )}`;
            }
          }
          if (carDetail) {
            setPopUpData(dispatch)({
              title: 'Confirm take car?',
              description,
              onDecline() {
                setPopUpData(dispatch)({
                  title: 'Are you sure to decline?',
                  description: `For preventing disruptive, we just allow customer to decline 3 times per booking. Otherwise, your booking will be cancelled and not be refunded. You already declined ${rental.numberDeclined} time. Continue to decline this car?`,
                  onConfirm() {
                    cancelPopup(dispatch);
                    changeTransactionStatus(rental._id, USER_CANCEL);
                    confirmTransaction(dispatch)(
                      {
                        id: rental._id,
                        type: 'rental',
                        toStatus: 'USER_DECLINED',
                      },
                      {
                        onSuccess() {
                          getRentalList(dispatch)();
                        },
                      }
                    );
                  },
                  onDecline() {
                    changeTransactionStatus(
                      rental._id,
                      WAITING_FOR_USER_CONFIRM_NEXT,
                      car
                    );
                  },
                });
              },
              onConfirm() {
                cancelPopup(dispatch);
                confirmTransaction(dispatch)(
                  {
                    id: rental._id,
                    type: 'rental',
                    car: carDetail._id,
                    toStatus: 'CURRENT',
                  },
                  {
                    onSuccess() {
                      changeTransactionStatus(rental._id, COMPLETED);
                      getRentalList(dispatch)();
                    },
                    onFailure() {
                      changeTransactionStatus(rental._id, TRANSACTION_ERROR);
                    },
                  }
                );
              },
            });
          } else {
            changeTransactionStatus(rental._id, TRANSACTION_ERROR);
            setPopUpData(dispatch)({
              popupType: 'error',
              title: 'Error',
              description: 'Can not found car. Please try again',
            });
          }
          break;
        }
        case COMPLETED: {
          setPopUpData(dispatch)({
            popupType: 'success',
            title: 'Success',
            description:
              'Return car to hub successfully! Thank you for using our service',
            onConfirm() {
              cancelPopup(dispatch);
              getRentalList(dispatch)();
            },
          });

          break;
        }

        case HUB_REJECT_TRASACTION: {
          setPopUpData(dispatch)({
            title: 'The transaction rejected',
            description:
              'The transaction has been rejected by Hub. Your deposit will be refunded',
            acceptOnly: 'true',
            onConfirm() {
              cancelPopup(dispatch);
              getRentalList(dispatch)();
            },
          });
          break;
        }
        case CANCEL:
          setPopUpData(dispatch)({
            popupType: 'error',
            title: 'Error',
            description: 'Staff denied to take car. Please try again',
          });
          break;
        case TRANSACTION_ERROR:
          setPopUpData(dispatch)({
            popupType: 'error',
            title: 'Error',
            description:
              'There was some problem when execute transaction. Please try again!',
          });
          break;

        default: {
          console.log('error');
        }
      }
    });
}

export function listenSharingStatus({ rentDetail, onCloseModal, dispatch }) {
  return firebase
    .database()
    .ref(`sharing/${rentDetail.shareRequest}`)
    .on('value', snapShot => {
      const val = snapShot.val();
      switch (val.status) {
        case WAITING_FOR_CONFIRM:
          onCloseModal();
          setPopUpData(dispatch)({
            title: 'Wait for user confirm',
            acceptOnly: true,
          });
          break;
        case WAITING_FOR_USER_CONFIRM:
          setPopUpData(dispatch)({
            title: 'Confirm receiving car',
            description: `Confirm receive the ${rentDetail.carModel.name} with license plates: ${rentDetail.car.licensePlates}?`,
            onConfirm() {
              cancelPopup(dispatch);
              confirmSharing(dispatch)(
                {
                  id: rentDetail._id,
                  sharingRequestId: rentDetail.shareRequest,
                },
                {
                  onSuccess() {
                    changeSharingStatus(rentDetail.shareRequest, COMPLETED);
                    getRentalList(dispatch)();
                    setPopUpData(dispatch)({
                      popupType: 'success',
                      title: 'Success',
                      description:
                        'Transfer car successfully. Thank you for using our service',
                    });
                  },
                  onFailure() {
                    changeSharingStatus(
                      rentDetail.shareRequest,
                      TRANSACTION_ERROR
                    );
                    setPopUpData(dispatch)({
                      popupType: 'error',
                      title: 'Error',
                      description:
                        'There was an error while sharing car. Please try again!',
                    });
                  },
                }
              );
            },
            onDecline() {
              cancelPopup(dispatch);
              changeSharingStatus(rentDetail.shareRequest, USER_CANCEL);
            },
          });

          break;
        case CANCEL:
          setPopUpData(dispatch)({
            popupType: 'error',
            title: 'Transaction denined',
            description: 'User cancelled transaction. Please try again!',
          });
          break;
        default:
          console.log('error');
      }
    });
}
