import React from 'react';
import { FlatList } from 'react-native';
import { ViewContainer } from 'Components';
import { NavigationType, RentDetailType } from 'types';
import { connect } from 'react-redux';
import HistoryItem from 'Components/HistoryItem';
// import RentHistoryItem from './RentHistoryItem';

type PropsType = {
  rentList: [RentDetailType],
  navigation: NavigationType,
};

const LeaseHistoryScreen = ({ rentList, navigation }: PropsType) => {
  const onGetDetail = id => {
    console.log('Get id = ', id);
    navigation.navigate('RentHistoryItemDetailScreen');
  };
  // eslint-disable-next-line react/prop-types
  // const handleRenderItem = ({ item }) => (
  //   <RentHistoryItem rentDetail={item} onGetDetail={onGetDetail} />
  // );
  const data = ['1', '2', '3', '4'];

  const handleRenderItem = () => <HistoryItem />;

  const handleKeyExtractor = (item, index) => index.toString();
  return (
    <FlatList
      data={data}
      renderItem={handleRenderItem}
      keyExtractor={handleKeyExtractor}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default connect(state => ({
  rentList: [],
}))(LeaseHistoryScreen);
// export default RentHistoryScreen;
