import React from 'react';
import { FlatList } from 'react-native';
import { ViewContainer } from 'Components';
import { NavigationType, RentDetailType } from 'types';
import { connect } from 'react-redux';
// import HistoryItem from 'Components/HistoryItem';
import RentHistoryItem from './RentHistoryItem';

type PropsType = {
  rentList: [RentDetailType],
  navigation: NavigationType,
};

const RentHistoryScreen = ({ rentList, navigation }: PropsType) => {
  const onGetDetail = id => {
    console.log('Get id = ', id);
    navigation.navigate('RentHistoryItemDetailScreen');
  };
  // eslint-disable-next-line react/prop-types
  const handleRenderItem = ({ item }) => (
    <RentHistoryItem rentDetail={item} onGetDetail={onGetDetail} />
  );
  // const data = ['1', '2', '3', '4'];

  // const handleRenderItem = () => <HistoryItem />;

  const handleKeyExtractor = (item, index) => index.toString();
  return (
    <ViewContainer>
      <FlatList
        data={rentList}
        renderItem={handleRenderItem}
        keyExtractor={handleKeyExtractor}
      />
    </ViewContainer>
  );
};

export default connect(state => ({
  rentList: state.rentHistory.data,
}))(RentHistoryScreen);
// export default RentHistoryScreen;
