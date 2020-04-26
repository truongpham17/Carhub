import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { ViewContainer } from 'Components';
import {
  NavigationType,
  HubType,
  CarModel,
  GeoLocationType,
  SharingType,
} from 'types';

import { getSharing } from '@redux/actions/sharing';

import { searchCarList, setSelectedCar } from '@redux/actions/car';

import { useDispatch, useSelector } from 'react-redux';
import SelectCarItem from './SelectCarItem';
import Header from './Header';
import { formatData } from './utils';
import SharingExplainModel from './ShareExplainModal';

type RentalSearchType = {
  startLocation: GeoLocationType,
  endLocation: GeoLocationType,
};

type PropTypes = {
  navigation: NavigationType,
  geometry: {
    lat: Number,
    lng: Number,
  },
  loading: Boolean,
};

const SelectCarScreen = ({ navigation }: PropTypes) => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const carModels: [{ hub: HubType, carModel: CarModel }] = useSelector(
    state => state.car.carModels
  );
  const loading = useSelector(state => state.car.loading);
  const rentalSearch: RentalSearchType = useSelector(
    state => state.car.rentalSearch
  );

  const sharingList: [SharingType] = useSelector(state => state.sharing.data);

  useEffect(() => {
    loadCarList();
  }, []);

  const loadCarList = () => {
    setRefresh(true);
    getSharing(dispatch)({
      ...rentalSearch,
    });

    searchCarList(dispatch)({
      startLocation: rentalSearch.startLocation,
      endLocation: rentalSearch.endLocation,
      startDate: rentalSearch.startDate,
      endDate: rentalSearch.endDate,
    });
    setRefresh(false);
  };

  const onBackPress = () => {
    navigation.pop();
  };

  const handleCarPress = _id => {
    const selectedCarModel = carModels.find(item => item.carModel._id === _id);
    if (selectedCarModel) {
      setSelectedCar(dispatch)(_id);
      navigation.navigate('RentalCarDetailScreen');
    } else {
      const selectedSharing = sharingList.find(item => item._id === _id);
      if (selectedSharing) {
        navigation.navigate('ViewSharingInformation', { selectedId: _id });
      }
    }
  };

  const renderItem = ({ item, index }) => (
    <SelectCarItem
      {...item}
      onItemPress={handleCarPress}
      onPressInfo={_id => {
        setSelectedId(_id);
        setModalVisible(true);
      }}
    />
  );

  const keyExtractor = (item, index) => item._id;

  return (
    <ViewContainer
      haveBackHeader
      title="Search Car"
      onBackPress={onBackPress}
      loading={loading}
      style={{ paddingHorizontal: 0 }}
    >
      <Header />
      <FlatList
        refreshing={refresh}
        onRefresh={loadCarList}
        data={formatData(carModels, sharingList)}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
      />
      <SharingExplainModel
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSeeDetail={() => {
          setModalVisible(false);
          handleCarPress(selectedId);
        }}
      />
    </ViewContainer>
  );
};

export default SelectCarScreen;
