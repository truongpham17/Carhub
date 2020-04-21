import React, { useState, useEffect, useRef } from 'react';
import colors from 'Constants/colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { getCurrentPosition } from 'services/maps';
import { GOOGLE_KEY } from 'Constants/key';
import { NavigationType } from 'types';

const SELECT_ON_MAPS = 'Select on Maps';

const CURRENT_LOCATION = 'Current location';

type PropTypes = {
  onSelectLocation: ({ geometry: { lat: String, lng: String } }) => void,
  onRequestMap: () => void,
  openMapOption?: boolean,
  listViewDisplayed: Boolean,
  styles: {},
  placeholder: String,
  navigation?: NavigationType,
};

const MapAutoCompleteSearch = ({
  onRequestMap,
  onSelectLocation,
  openMapOption = true,
  placeholder,
  navigation,
}: PropTypes) => {
  const [currentPosition, setCurretPosition] = useState({
    description: CURRENT_LOCATION,
  });
  const mapRef = useRef();

  useEffect(() => {
    getCurrentPosition(
      data => {
        setCurretPosition({ ...data, description: CURRENT_LOCATION });
      },
      error => console.log(error)
    );
  }, []);

  const onSelect = (data, details) => {
    // console.log(data);
    if (data.description === SELECT_ON_MAPS) {
      if (typeof onRequestMap === 'function') {
        return onRequestMap();
      }
      return navigation.navigate('SelectMapScreen', {
        callback(address) {
          navigation.pop();
          onSelectLocation(address);
          mapRef.current._handleChangeText(address.address);
        },
      });
    }

    if (data.description === CURRENT_LOCATION) {
      onSelectLocation(currentPosition);
    } else {
      onSelectLocation({
        geometry: { ...details.geometry.location },
        address: data.description,
      });
    }
  };

  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder || 'Search'}
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType="search" // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      keyboardAppearance="light" // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
      listViewDisplayed={false} // true/false/undefined
      fetchDetails
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        onSelect(data, details);
      }}
      getDefaultValue={() => ''}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: GOOGLE_KEY,
        language: 'en', // language of the results
        types: 'geocode', // default: 'geocode'
      }}
      ref={ref => (mapRef.current = ref)}
      onChangeText={text => console.log(text)}
      styles={{
        textInputContainer: {
          width: '100%',
        },
        description: {
          fontWeight: 'bold',
        },
        predefinedPlacesDescription: {
          color: colors.primary,
        },
        // ...styles,
      }}
      nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      // GoogleReverseGeocodingQuery={
      //   {
      //     // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      //   }
      // }
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        type: 'cafe',
      }}
      GooglePlacesDetailsQuery={{
        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
        fields: 'geometry',
      }}
      filterReverseGeocodingByTypes={[
        'locality',
        'administrative_area_level_3',
      ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      predefinedPlaces={[
        currentPosition,
        openMapOption ? { description: SELECT_ON_MAPS } : undefined,
      ]}
      debounce={500} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      // renderLeftButton={() => (
      //   // <Image source={require('path/custom/left-icon')} />
      // )}
      // renderRightButton={() => <Text>Custom text after the input</Text>}
      separator={{ height: 1, backgroundColor: colors.dark80 }}
    />
  );
};

export default MapAutoCompleteSearch;
