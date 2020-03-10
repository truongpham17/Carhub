import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { ViewContainer } from 'Components';
import ViewPager from '@react-native-community/viewpager';
import { ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';

import { NavigationType } from 'types';
import RentHistoryScreen from 'screens/rent-history-screen/RentHistoryScreen';

type PropTypes = {
  navigation: NavigationType,
};

const HistoryScreen = ({ navigation }: PropTypes) => {
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
    <ViewContainer haveBackHeader title="History" onBackPress={onBackPress}>
      <ButtonGroup
        // theme={theme}
        // activeIndex={activeIndex}
        selectedIndex={activeIndex}
        // labels={['Rent', 'Lease']}
        buttons={['Rent', 'Lease']}
        // onItemPress={onTabPress}
        onPress={onTabPress}
      />
      <ViewPager
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={handlePageSelected}
        // scrollEnabled={false}
        ref={ref => (viewPagerRef.current = ref)}
      >
        <View key="1">
          <RentHistoryScreen />
        </View>
        <View key="2">
          <RentHistoryScreen />
        </View>
      </ViewPager>
    </ViewContainer>
  );
};

export default connect(state => ({}), {})(HistoryScreen);
const styles = StyleSheet.create({});
