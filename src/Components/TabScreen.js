import React, { useState, useRef, useEffect } from 'react';
import { View } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import ButtonGroup from './ButtonGroup';

type PropTypes = {
  screens: [React.ReactNode],
  labels: [String],
  dots?: [boolean],
};

const TabScreen = ({ screens, labels, dots = new Array(5) }: PropTypes) => {
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
    <>
      <ButtonGroup
        activeIndex={activeIndex}
        labels={labels}
        onItemPress={onTabPress}
        dots={dots}
      />
      <ViewPager
        style={{
          flex: 1,
          marginHorizontal: -scaleHor(24),
          marginTop: scaleVer(24),
        }}
        initialPage={0}
        onPageSelected={handlePageSelected}
        ref={ref => (viewPagerRef.current = ref)}
      >
        {screens.map((screen, index) => (
          <View
            key={index.toString()}
            style={{ paddingHorizontal: scaleHor(24) }}
          >
            {screen}
          </View>
        ))}
      </ViewPager>
    </>
  );
};

export default TabScreen;
