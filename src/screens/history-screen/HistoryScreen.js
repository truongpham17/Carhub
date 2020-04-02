import React, { useState, useRef, useEffect } from 'react';
import { View } from 'react-native';
import { ViewContainer, ButtonGroup } from 'Components';
import ViewPager from '@react-native-community/viewpager';
import { connect, useSelector } from 'react-redux';
import getLeaseList from '@redux/actions/lease';
import { NavigationType } from 'types';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import RentHistoryScreen from '../rent-history-screen/RentHistoryScreen';
import LeaseHistoryScreen from '../lease-history-screen/LeaseHistoryScreen';

type PropTypes = {
  navigation: NavigationType,
  rentLoading: Boolean,
  leaseLoading: Boolean,
  getLeaseList: () => void,
};

const HistoryScreen = ({ navigation }: PropTypes) => {
  const rentalLoading = useSelector(state => state.rental.loading);
  const [activeIndex, setActiveIndex] = useState(0);
  const viewPagerRef = useRef(null);

  const onTabPress = index => {
    if (index !== activeIndex) {
      viewPagerRef.current.setPage(index);
      setActiveIndex(index);
    }
  };
  const handlePageSelected = e => {
    const { position } = e.nativeEvent;
    if (position !== activeIndex) {
      setActiveIndex(position);
    }
  };
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
      // loading={rentLoading && leaseLoading}
    >
      <ButtonGroup
        // theme={theme}
        activeIndex={activeIndex}
        labels={['Rent', 'Lease']}
        onItemPress={onTabPress}
      />
      <ViewPager
        style={{
          flex: 1,
          marginHorizontal: -scaleHor(24),
          marginTop: scaleVer(24),
        }}
        initialPage={0}
        onPageSelected={handlePageSelected}
        // scrollEnabled={false}
        ref={ref => (viewPagerRef.current = ref)}
      >
        <View key="1" style={{ paddingHorizontal: scaleHor(24) }}>
          <RentHistoryScreen navigation={navigation} />
        </View>
        <View key="2" style={{ paddingHorizontal: scaleHor(24) }}>
          {/* <RentHistoryScreen navigation={navigation} /> */}
          <LeaseHistoryScreen navigation={navigation} />
        </View>
      </ViewPager>
    </ViewContainer>
  );
};

export default connect(
  state => ({
    rentLoading: state.rental.isLoading,
    leaseLoading: state.lease.loading,
  }),
  {
    getLeaseList,
  }
)(HistoryScreen);
