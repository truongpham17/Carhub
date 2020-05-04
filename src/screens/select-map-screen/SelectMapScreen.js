import React, { useState, useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getHubList } from '@redux/actions/hub';
import { NavigationType, GeoLocationType, HubType } from 'types';
import { Button, MapAutoCompleteSearch } from 'Components';
import LottieView from 'lottie-react-native';
import { position } from 'Assets/animation';
import { dimension } from 'Constants';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import { connect } from 'react-redux';
import { MarkerIcon } from 'Assets/svgs';
import { GOOGLE_KEY } from 'Constants/key';

type PropTypes = {
  navigation: NavigationType,
  getHubList: () => void,
  hubList: [HubType],
  getCarList: () => void,
};

const CurrentCircle = () => (
  <View
    style={{
      width: 48,
      height: 48,
    }}
  >
    <LottieView autoPlay source={position} />
  </View>
);

const SelectMapScreen = ({
  navigation,
  getHubList,
  hubList,
  getCarList,
}: PropTypes) => {
  const [currentPosition, setCurretPosition] = useState({
    latitude: 10.866093,
    longitude: 106.781972,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [selectedHub, setSelectedHub] = useState(null);

  const { callback, type = 'location' } = navigation.state.params;

  const [region, setRegion] = useState({
    latitude: 10.866093,
    longitude: 106.781972,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [selectPosition, setSelectPosition] = useState({
    lat: 10.866093,
    lng: 106.781972,
  });

  useEffect(() => {
    const { location } = navigation.state.params;
    if (location) {
      setRegion({ ...region, latitude: location.lat, longitude: location.lng });
    }
  }, []);

  const renderSelectMarker = () => {
    if (!selectPosition) return null;

    const { lat, lng } = selectPosition;

    // setRegion({
    //   latitude: lat,
    //   longitude: lng,
    //   latitudeDelta: 0.0622,
    //   longitudeDelta: 0.0221,
    // });

    const selectHub = hubList.find(
      item => item.geometry.lat === lat && item.geometry.lng === lng
    );
    if (selectHub) return null;
    return (
      <Marker
        coordinate={{ latitude: lat, longitude: lng }}
        // title={""}
        // description={hub.description}
      >
        <MarkerIcon width={32} height={32} />
      </Marker>
    );
  };

  const onPressMap = data => {
    const { coordinate } = data;
    setSelectPosition({ lat: coordinate.latitude, lng: coordinate.longitude });
    setRegion({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: 0.0622,
      longitudeDelta: 0.0221,
    });
  };

  useEffect(() => {
    getHubList();

    // getCurrentPosition(
    //   (data: GeoLocationType) => {
    //     setCurretPosition(position => ({
    //       ...position,
    //       latitude: data.geometry.lat,
    //       longitude: data.geometry.lng,
    //     }));
    //   },

    //   error => console.log(error)
    // );
  }, []);

  const onBackPress = () => {
    navigation.pop();
  };

  const onSelectLocation = (location: GeoLocationType) => {
    const { lat, lng } = location.geometry;

    setSelectPosition({ lat, lng });

    setRegion(position => ({
      ...position,
      latitude: lat,
      longitude: lng,
    }));
  };

  const onSearch = () => {
    switch (type) {
      case 'location': {
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${selectPosition.lat},${selectPosition.lng}&key=${GOOGLE_KEY}`
        ).then(response => {
          response.json().then(data => {
            console.log(data);
            callback({
              geometry: selectPosition,
              address: data.results[0].formatted_address,
            });
          });
        });
        return;
      }
      case 'hub': {
        if (selectedHub) {
          callback(selectedHub);
        }
        return;
      }
      case 'none': {
        navigation.pop();
        return;
      }
      default:
        return null;
    }
  };

  const getSubmitLabel = () => {
    switch (type) {
      case 'location':
        return 'Select location';
      case 'hub':
        return 'Select hub';
      case 'none':
        return 'Return';
      default:
        return 'Select';
    }
  };

  const onSelectedHub = (hub: HubType) => {
    setSelectedHub(hub);
    setRegion({
      latitude: hub.geometry.lat,
      longitude: hub.geometry.lng,
      latitudeDelta: 0.0622,
      longitudeDelta: 0.0221,
    });
  };

  const renderHubMarker = (hub: HubType) => {
    const coordinate = {
      latitude: hub.geometry.lat,
      longitude: hub.geometry.lng,
    };

    return (
      <Marker
        coordinate={coordinate}
        title={hub.name}
        description={hub.description}
        onPress={() => onSelectedHub(hub)}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          position: 'absolute',
          top: scaleVer(12),
          alignSelf: 'center',
          zIndex: 2,
          width: dimension.SCREEN_WIDTH - 64,
          backgroundColor: 'transparent',
        }}
      >
        <MapAutoCompleteSearch
          openMapOption={false}
          onSelectLocation={onSelectLocation}
          listViewDisplayed={false}
        />
      </SafeAreaView>

      <MapView
        initialRegion={currentPosition}
        style={{
          flex: 1,
        }}
        onPress={data => onPressMap(data.nativeEvent)}
        region={region}
      >
        {hubList.map(renderHubMarker)}

        <Marker
          coordinate={{ latitude: 10.866093, longitude: 106.781972 }}
          // title={hub.name}
          // description={hub.description}
        >
          <CurrentCircle />
        </Marker>
        {renderSelectMarker()}
      </MapView>
      <View
        style={{
          position: 'absolute',
          bottom: scaleVer(16),
          left: 0,
          right: 0,
          paddingHorizontal: scaleHor(24),
        }}
      >
        <Button label={getSubmitLabel()} onPress={onSearch} />
      </View>
    </View>
  );
};

export default connect(
  state => ({
    hubList: state.hub.data,
    loading: state.hub.loading,
  }),
  {
    getHubList,
  }
)(SelectMapScreen);
