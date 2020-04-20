import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { NavigationType, RentDetailType } from 'types';
import { getRentalList, setRentDetailId } from '@redux/actions/rental';
import { connect, useDispatch } from 'react-redux';

import RentHistoryItem from './RentHistoryItem';

type PropsType = {
  rentList: [RentDetailType],
  navigation: NavigationType,
};

const RentHistoryScreen = ({ rentList, navigation }: PropsType) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getRentalList(dispatch)();
  }, []);

  const onGetDetail = id => {
    setRentDetailId(dispatch)(id);
    navigation.navigate('RentHistoryItemDetailScreen');
  };
  // eslint-disable-next-line react/prop-types
  const handleRenderItem = ({ item }) => (
    <RentHistoryItem rentDetail={item} onGetDetail={onGetDetail} />
  );

  const handleKeyExtractor = (item, index) => index.toString();
  return (
    <FlatList
      data={rentList.sort((a, b) => a.startDate - b.startDate)}
      renderItem={handleRenderItem}
      keyExtractor={handleKeyExtractor}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={() => {
        setRefreshing(true);
        getRentalList(dispatch)({
          onSuccess() {
            setRefreshing(false);
          },
          onFailure() {
            setRefreshing(false);
          },
        });
      }}
    />
  );
};

export default connect(state => ({
  rentList: state.rental.data.rentals,
}))(RentHistoryScreen);
