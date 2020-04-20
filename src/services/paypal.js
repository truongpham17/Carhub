import { requestOneTimePayment } from 'react-native-paypal';
import { INITIAL_CALLBACK } from 'Constants/api';

export function paypalService({ token, amount }, callback = INITIAL_CALLBACK) {
  requestOneTimePayment(token, {
    amount,
    currency: 'USD',
    localeCode: 'en_GB',
    shippingAddressRequired: false,
    userAction: 'commit', // display 'Pay Now' on the PayPal review page
    intent: 'authorize',
  })
    .then(result => {
      console.log(result);
      callback.onSuccess(result);
    })
    .catch(error => {
      callback.onFailure();
    });
}
