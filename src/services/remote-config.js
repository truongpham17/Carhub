import firebase from 'react-native-firebase';
import config from 'Constants/remote-config';

console.log('1312312312312');
try {
  // firebase.config().enableDeveloperMode();

  // Set default values
  // firebase.config().setDefaults({
  //   hasExperimentalFeature: false,
  // });

  firebase
    .config()
    .fetch()
    .then(() => firebase.config().activateFetched())
    .then(activated => {
      if (!activated) console.log('Fetched data not activated');
      return firebase.config().getValue('share_default_rate');
    })
    .then(snapshot => {
      const share_default_rate = snapshot.val();

      if (share_default_rate) {
        config.share_default_rate = share_default_rate;
      }

      // continue booting app
    })
    .catch(console.error);

  firebase
    .config()
    .fetch()
    .then(() => firebase.config().activateFetched())
    .then(activated => {
      if (!activated) console.log('Fetched data not activated');
      return firebase.config().getValue('share_deposit');
    })
    .then(snapshot => {
      const share_deposit = snapshot.val();

      if (share_deposit) {
        config.share_deposit = share_deposit;
      }

      // continue booting app
    })
    .catch(console.error);

  firebase
    .config()
    .fetch()
    .then(() => firebase.config().activateFetched())
    .then(activated => {
      if (!activated) console.log('Fetched data not activated');
      return firebase.config().getValue('rent_deposit');
    })
    .then(snapshot => {
      const rent_deposit = snapshot.val();

      if (rent_deposit) {
        config.rent_deposit = rent_deposit;
      }

      // continue booting app
    })
    .catch(console.error);

  firebase
    .config()
    .fetch()
    .then(() => firebase.config().activateFetched())
    .then(activated => {
      if (!activated) console.log('Fetched data not activated');
      return firebase.config().getValue('lease_rate');
    })
    .then(snapshot => {
      const lease_rate = snapshot.val();

      if (lease_rate) {
        config.lease_rate = lease_rate;
      }

      // continue booting app
    })
    .catch(console.error);
} catch (error) {
  console.log(error);
  console.log('err');
}
