import { Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { requestPermission } from './permission';

export async function getCurrentPosition(callback, error) {
  if (Platform.OS === 'android') {
    const permission = await requestPermission(
      'ACCESS_FINE_LOCATION',
      'Carhub need your location',
      'Please acccept get location for best service'
    );
    if (!permission) {
      return false;
    }
  }

  Geolocation.requestAuthorization();

  Geolocation.getCurrentPosition(
    position => {
      const initialPosition = JSON.stringify(position);
      console.log(initialPosition);
      const { coords } = position;
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${coords.latitude},${coords.longitude}&key=AIzaSyAUkXe8bNKtkVADuufFsYQZGrTpxWQCW4Y`
      ).then(response => {
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
      error(error);
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
}
