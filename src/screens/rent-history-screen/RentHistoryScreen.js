import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
// import { ViewContainer } from 'Components';
import { NavigationType, RentDetailType } from 'types';
import { getRentalList, setRentDetailId } from '@redux/actions/rental';
import { connect, useDispatch } from 'react-redux';

// import HistoryItem from 'Components/HistoryItem';
import RentHistoryItem from './RentHistoryItem';

type PropsType = {
  rentList: [RentDetailType],
  navigation: NavigationType,
  setRentDetailId: () => void,
};

const RentHistoryScreen = ({
  rentList,
  navigation,
  setRentDetailId,
}: PropsType) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(true);
  useEffect(() => {
    if (refreshing) {
      getRentalList(dispatch)();
      setRefreshing(false);
    }
  }, [refreshing]);

  const onGetDetail = id => {
    setRentDetailId(id);
    navigation.navigate('RentHistoryItemDetailScreen', { popToHistoryScreen });
  };
  // eslint-disable-next-line react/prop-types
  const handleRenderItem = ({ item }) => (
    <RentHistoryItem rentDetail={item} onGetDetail={onGetDetail} />
  );

  const popToHistoryScreen = () => {
    navigation.popToTop();
    setRefreshing(true);
  };
  // const data = ['1', '2', '3', '4'];

  // const handleRenderItem = () => <HistoryItem />;

  const handleKeyExtractor = (item, index) => index.toString();
  return (
    <FlatList
      data={rentList.sort((a, b) => a.startDate - b.startDate)}
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
    rentList: state.rental.data.rentals,
  }),
  { setRentDetailId }
)(RentHistoryScreen);
