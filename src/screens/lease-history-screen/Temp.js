import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { themeType } from 'types/theme';
import ViewPager from '@react-native-community/viewpager';
import { ViewContainer, ButtonGroup, Separator } from 'Component';
import { withTheme } from 'Component/ThemeProvider';
import { popStack, changeTab, pushStack } from 'Utils/Navigation';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import {
  GET_HONORABLE_LIST,
  GET_ROLL_CALLS,
  GET_USER_ID,
} from 'Apollo/graphql/queries';
import { LOAD_LIMIT_COUNT } from 'Constants/app';
import { getDaysInMonth } from 'Utils/Date';
import { textStyle } from 'Constants/textStyles';
import { dimension } from 'Constants';
import { scaleVer } from 'Constants/dimensions';
import Item from './honorable/Item';
import RollCallStatistic from './rollCallStatistic/RollCallStatistic';

type PropTypes = {
  theme: themeType,
  componentId: string,
  date: Date,
};

const RollCallResult = ({ theme, componentId, date }: PropTypes) => {
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
  return (
    <ViewContainer>
      <ButtonGroup
        theme={theme}
        activeIndex={activeIndex}
        labels={['Bảng xếp hạng', 'Thống kê']}
        onItemPress={onTabPress}
      />
      <ViewPager
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={handlePageSelected}
        // scrollEnabled={false}
        ref={ref => (viewPagerRef.current = ref)}
      >
        <View key="1"></View>
        <View key="2" />
      </ViewPager>
    </ViewContainer>
  );
};

export default withTheme(RollCallResult);

const styles = StyleSheet.create({
  container: {},
  separator: {
    height: 1,
    alignSelf: 'stretch',
  },
  lottie: {
    height: scaleVer(400),
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
