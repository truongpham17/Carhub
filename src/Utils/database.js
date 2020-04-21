import firebase from 'react-native-firebase';

export function changeTransactionStatus(id, status, car) {
  firebase
    .database()
    .ref(`scanQRCode/${id}`)
    .set({
      _id: id,
      status,
      car,
    });
}

export function changeSharingStatus(id, status) {
  firebase
    .database()
    .ref(`sharing/${id}`)
    .set({ status });
}
