import firebase from 'react-native-firebase';

export function changeTransactionStatus(id, status) {
  firebase
    .database()
    .ref(`scanQRCode/${id}`)
    .set({
      _id: id,
      status,
    });
}

export function changeSharingStatus(id, status) {
  firebase
    .database()
    .ref(`sharing/${id}`)
    .set({ status });
}
