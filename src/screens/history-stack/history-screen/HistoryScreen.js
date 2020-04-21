import React from 'react';
import { ViewContainer, TabScreen } from 'Components';
import { connect, useSelector } from 'react-redux';
import { NavigationType } from 'types';
import RentHistoryScreen from '../rental-stack/rent-history-screen/RentHistoryScreen';
import LeaseHistoryScreen from '../lease-stack/lease-history-screen/LeaseHistoryScreen';

type PropTypes = {
  navigation: NavigationType,
  rentLoading: Boolean,
  leaseLoading: Boolean,
};

const HistoryScreen = ({ navigation }: PropTypes) => {
  const rentalLoading = useSelector(state => state.rental.loading);

  const onBackPress = () => {
    navigation.pop();
  };

  return (
    <ViewContainer
      haveBackHeader
      haveBack={false}
      title="History"
      onBackPress={onBackPress}
      loading={rentalLoading}
    >
      <TabScreen
        labels={['Rent', 'Lease']}
        screens={[
          <RentHistoryScreen navigation={navigation} />,
          <LeaseHistoryScreen navigation={navigation} />,
        ]}
      />
    </ViewContainer>
  );
};

export default connect(state => ({
  rentLoading: state.rental.loading,
  leaseLoading: state.lease.loading,
}))(HistoryScreen);
