import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
// import { ViewContainer } from 'Components';
import { NavigationType, RentDetailType } from 'types';
import { getRentalsList, setRentDetailId } from '@redux/actions/getRentalsList';
import { connect } from 'react-redux';

// import HistoryItem from 'Components/HistoryItem';
import RentHistoryItem from './RentHistoryItem';

type PropsType = {
  rentList: [RentDetailType],
  navigation: NavigationType,
  getRentalsList: () => void,
  setRentDetailId: () => void,
};

const RentHistoryScreen = ({
  rentList,
  navigation,
  getRentalsList,
  setRentDetailId,
}: PropsType) => {
  const [refreshing, setRefreshing] = useState(true);
  useEffect(() => {
    if (refreshing) {
      getRentalsList();
      setRefreshing(false);
    }
  }, [refreshing]);

  const onGetDetail = id => {
    setRentDetailId(id);
    navigation.navigate('RentHistoryItemDetailScreen', { itemID: id });
  };
  // eslint-disable-next-line react/prop-types
  const handleRenderItem = ({ item }) => (
    <RentHistoryItem rentDetail={item} onGetDetail={onGetDetail} />
  );
  // const data = ['1', '2', '3', '4'];

  // const handleRenderItem = () => <HistoryItem />;

  const handleKeyExtractor = (item, index) => index.toString();
  return (
    <FlatList
      data={rentList}
      renderItem={handleRenderItem}
      keyExtractor={handleKeyExtractor}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={() => setRefreshing(true)}
    />
  );
};

export default connect(
  state => ({
    rentList: state.rentalsList.data.rentals,
  }),
  { getRentalsList, setRentDetailId }
)(RentHistoryScreen);
