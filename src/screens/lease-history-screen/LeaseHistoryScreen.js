import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
// import { ViewContainer } from 'Components';
import { NavigationType, LeaseDetailType } from 'types';
import { getLeaseList, setLeaseDetailId } from '@redux/actions/lease';
import { connect } from 'react-redux';
// import HistoryItem from 'Components/HistoryItem';
import LeaseHistoryItem from './LeaseHistoryItem';

type PropsType = {
  leaseList: [LeaseDetailType],
  navigation: NavigationType,
  getLeaseList: () => void,
  setLeaseDetailId: () => void,
};

const LeaseHistoryScreen = ({
  leaseList,
  navigation,
  getLeaseList,
  setLeaseDetailId,
}: PropsType) => {
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    if (refreshing) {
      getLeaseList();
      setRefreshing(false);
    }
  }, [refreshing]);
    getLeaseList();
  }, []);

  // useEffect(() => {
  //   if (refreshing) {
  //     getLeaseList();
  //     setRefreshing(false);
  //     // console.log(leaseList);
  //   }
  // }, [refreshing]);

  const onGetDetail = id => {
    setLeaseDetailId(id);
    navigation.navigate('LeaseHistoryItemDetailScreen');
    // setRefreshing(true);
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
        getLeaseList({
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

export default connect(
  state => ({
    leaseList: state.lease.data.leases,
  }),
  { getLeaseList, setLeaseDetailId }
)(LeaseHistoryScreen);
