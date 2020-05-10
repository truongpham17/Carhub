import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { requestPermission } from './permission';

export async function getCurrentPosition(callback, error) {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  }
  Geolocation.requestAuthorization();

  console.log('come herre!!!');

  Geolocation.getCurrentPosition(
    position => {
      const initialPosition = JSON.stringify(position);
      console.log(initialPosition);
      const { coords } = position;
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${coords.latitude},${coords.longitude}&key=AIzaSyAUkXe8bNKtkVADuufFsYQZGrTpxWQCW4Y`
      ).then(response => {
        console.log(3, response);

        response.json().then(json => {
          callback({
            geometry: {
              ...json.results[0].geometry.location,
            },
            address: json.results[0].formatted_address,
          });
        });
      });
    },
    error => {
      // error(error);
      console.log(error);
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
}
