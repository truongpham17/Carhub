import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { NavigationType, SharingType } from 'types';
import { CarIcon, CarIconSelected } from 'Assets/svgs';
import { GOOGLE_KEY } from 'Constants/api';
import { MapAutoCompleteSearch } from 'Components';
import { connect } from 'react-redux';
import { getSharing } from '@redux/actions/sharing';
import { textStyle } from 'Constants/textStyles';
import { scaleVer } from 'Constants/dimensions';
import { dimension } from 'Constants';
import CarSlider from './CarSlider';

type PropsType = {
  navigation: NavigationType,
  isLoading: Boolean,
  sharing: [SharingType],
  getSharing: () => void,
};

const INIT_LAT_DELTA = 0.0922;
const INIT_LNG_DELTA = 0.0421;

const SelectSharingCarScreen = ({
  navigation,
  isLoading,
  sharing,
  getSharing,
}: PropsType) => {
  const [region, setRegion] = useState({
    latitude: 10.805915,
    longitude: 106.790102,
    latitudeDelta: INIT_LAT_DELTA,
    longitudeDelta: INIT_LNG_DELTA,
  });
  const [selectCar, setSelectCar] = useState(sharing[0]);

  // const map = useRef(null);
  const itemIndex = useRef(0);
  const carRef = useRef(null);

  useEffect(() => {
    getSharing();
  }, []);

  const changeRegion = location => {
    setRegion(location);
  };

  const onSelectCar = (sharingCar: SharingType, isEnableRef = true) => {
    setSelectCar(sharingCar);
    setRegion({
      latitude: sharingCar.geometry.lat,
      longitude: sharingCar.geometry.lng,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    });
    if (carRef && isEnableRef) {
      moveToIndex(sharing.findIndex(item => item._id === sharingCar._id));
      // console.log(sharing);
      // console.log(sharingCar);
    }
  };

  const moveToIndex = index => {
    carRef.current.scrollToIndex({ index });
    onSelectCar(sharing[index], false);
  };

  const onSelectLocation = () => {};

  const renderCarMarker = (sharingCar: SharingType) => {
    const coordinate = {
      latitude: sharingCar.geometry.lat,
      longitude: sharingCar.geometry.lng,
    };
    // console.log(sharingCar.geometry.lat);

    return (
      <Marker
        coordinate={coordinate}
        // title={sharingCar.rental.carModel.name}
        onPress={() => onSelectCar(sharingCar)}
      >
        <View style={{ alignItems: 'center' }}>
          <Text style={textStyle.label}>{sharingCar.rental.carModel.name}</Text>
          <CarIcon width={50} height={50} />
        </View>
      </Marker>
    );
  };

  if (isLoading)
    return (
      <View
        style={[
          styles.flex,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ActivityIndicator />
      </View>
    );
  return (
    <View style={styles.flex}>
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
      <MapView region={region} changeRegion={changeRegion} style={styles.flex}>
        {sharing.map(renderCarMarker)}
      </MapView>
      <View>
        <CarSlider
          itemIndex={itemIndex}
          carRef={carRef}
          sharing={sharing}
          selectCar={selectCar}
          onSelectCar={onSelectCar}
          moveToIndex={moveToIndex}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    width: '100%',
  },
});

export default connect(
  state => ({
    sharing: state.sharing.data,
    isLoading: state.sharing.isLoading,
  }),
  { getSharing }
)(SelectSharingCarScreen);
