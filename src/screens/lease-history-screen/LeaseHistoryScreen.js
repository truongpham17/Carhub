import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
// import { ViewContainer } from 'Components';
import { NavigationType, LeaseDetailType } from 'types';
import { getLeaseList } from '@redux/actions/lease';
import { connect } from 'react-redux';
// import HistoryItem from 'Components/HistoryItem';
import LeaseHistoryItem from './LeaseHistoryItem';

type PropsType = {
  leaseList: [LeaseDetailType],
  navigation: NavigationType,
  getLeaseList: () => void,
};

const LeaseHistoryScreen = ({
  leaseList,
  navigation,
  getLeaseList,
}: PropsType) => {
  const [refreshing, setRefreshing] = useState(true);
  useEffect(() => {
    if (refreshing) {
      getLeaseList();
      setRefreshing(false);
    }
  }, [refreshing]);
  const onGetDetail = id => {
    navigation.navigate('LeaseHistoryItemDetailScreen', { itemID: id });
  };
  // console.log(rentList);
  // eslint-disable-next-line react/prop-types
  const handleRenderItem = ({ item }) => (
    <LeaseHistoryItem leaseDetail={item} onGetDetail={onGetDetail} />
  );
  // const data = ['1', '2', '3', '4'];
  // console.log(rentList);

  // const handleRenderItem = () => <HistoryItem />;

  const handleKeyExtractor = (item, index) => index.toString();
  return (
    <FlatList
      refreshing={refreshing}
      onRefresh={() => setRefreshing(true)}
      data={leaseList}
      renderItem={handleRenderItem}
      keyExtractor={handleKeyExtractor}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default connect(
  state => ({
    leaseList: state.lease.data.leases,
  }),
  { getLeaseList }
)(LeaseHistoryScreen);
// export default RentHistoryScreen;
