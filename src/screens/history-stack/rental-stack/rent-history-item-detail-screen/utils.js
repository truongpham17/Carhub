import moment from 'moment';
import { substractDate } from 'Utils/date';
import { changeTransactionStatus } from 'Utils/database';
import {
  WAITING_FOR_SCAN,
  COMPLETED,
  WAITING_FOR_CONFIRM,
  WAITING_FOR_USER_CONFIRM,
  CANCEL,
  TRANSACTION_ERROR,
  USER_CANCEL,
} from 'Constants/status';
import firebase from 'react-native-firebase';
import {
  getRentalList,
  setPopUpData,
  cancelPopup,
  confirmTransaction,
  getCar,
} from '@redux/actions';

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
  let typeOfDate = '';
  if (rentDetail.status === 'CURRENT') {
    typeOfDate = 'Days left';
  } else if (rentDetail.status === 'OVERDUE') {
    typeOfDate = 'Days overdue';
  }
  const startDateFormat = moment(rentDetail.startDate).format('D MMMM, YYYY');
  const duration = substractDate(rentDetail.startDate, rentDetail.endDate);
  const daysdiff = Math.abs(substractDate(new Date(), rentDetail.endDate));

  const attrs = [
    { value: rentDetail.carModel.name, label: 'Car name' },
    {
      value: rentDetail.car ? rentDetail.car.licensePlates : 'Not specified',
      label: 'License Plate',
    },
    { value: startDateFormat, label: 'Date Of Hire' },
    { value: `${duration} days`, label: 'Duration' },
    { value: `${rentDetail.price} $`, label: 'Price Per Day' },
    { value: `${rentDetail.totalCost} $`, label: 'Total' },
    { value: rentDetail.pickupHub.name, label: 'Store' },
    { value: rentDetail.status, label: 'Status' },
  ];
  if (typeOfDate) {
    attrs.splice(6, 1, { value: daysdiff, label: typeOfDate });
  }
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
    expired: Date.now() + 1 * 60000,
  };
}

export function listenFirebaseStatus({ rental, onCloseModal, dispatch }) {
  changeTransactionStatus(rental._id, WAITING_FOR_SCAN);
  firebase
    .database()
    .ref(`scanQRCode/${rental._id}`)
    .on('value', async snapShot => {
      const val = snapShot.val();

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
        case WAITING_FOR_USER_CONFIRM: {
          onCloseModal();
          const { car } = val;
          const carDetail = await getCar(car);
          if (carDetail) {
            setPopUpData(dispatch)({
              title: 'Confirm take car?',
              description: `Are you sure to take the ${carDetail.carModel.name} with license plates: ${carDetail.licensePlates}?`,
              modalVisible: true,
              onDecline() {
                cancelPopup(dispatch);
                changeTransactionStatus(rental._id, USER_CANCEL);
              },
              onConfirm() {
                cancelPopup(dispatch);
                confirmTransaction(dispatch)(
                  { id: rental._id, type: 'rental', car: carDetail._id },
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
            changeTransactionStatus(rental._id, CANCEL);
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
