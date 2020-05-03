import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
// import { ViewContainer } from 'Components';
import { NavigationType, LeaseDetailType } from 'types';
import { getLeaseList, setLeaseDetailId } from '@redux/actions/lease';
import { useDispatch, useSelector } from 'react-redux';
// import HistoryItem from 'Components/HistoryItem';
import LeaseHistoryItem from './LeaseHistoryItem';

type PropsType = {
  navigation: NavigationType,
};

const LeaseHistoryScreen = ({ navigation }: PropsType) => {
  const [refreshing, setRefreshing] = useState(false);
  const leaseList = useSelector(state => state.lease.data.leases);
  const dispatch = useDispatch();

  useEffect(() => {
    getLeaseList(dispatch)();
  }, []);

  const onGetDetail = id => {
    navigation.navigate('LeaseHistoryItemDetailScreen', { selectedId: id });
  };
  // eslint-disable-next-line react/prop-types
  const handleRenderItem = ({ item }) => (
    <LeaseHistoryItem leaseDetail={item} onGetDetail={onGetDetail} />
  );

  const handleKeyExtractor = (item, index) => index.toString();
  return (
    <FlatList
      refreshing={refreshing}
      onRefresh={() =>
        getLeaseList(dispatch)({
          onSuccess() {
            setRefreshing(false);
          },
          onFailure() {
            setRefreshing(false);
          },
        })
      }
      data={leaseList}
      renderItem={handleRenderItem}
      keyExtractor={handleKeyExtractor}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default LeaseHistoryScreen;
