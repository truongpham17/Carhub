import React, { useRef } from 'react';
import { StyleSheet, Image, FlatList } from 'react-native';
import { RentailCarDetailType, NavigationType } from 'types';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import { dimension } from 'Constants';

type PropsType = {
  rentalDetail: RentailCarDetailType,
  navigation: NavigationType,
  images: [String],
};

const ImageSlider = ({ images }: PropsType) => {
  const flatlistRef = useRef(null);
  const getItemLayout = useRef((data, index) => ({
    length: dimension.SCREEN_WIDTH,
    offset: dimension.SCREEN_WIDTH * index,
    index,
  }));
  const viewabilityConfig = useRef({
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 20,
  });

  const handleItemChanged = useRef(({ changed }) => {
    if (changed[0].isViewable) {
      itemIndex.current = changed[0].index;
    }
  });

  const itemIndex = useRef(0);

  const moveToIndex = index => {
    flatlistRef.current.scrollToIndex({ index });
    // setIndex(index);
  };

  return (
    <FlatList
      style={{ marginHorizontal: -scaleHor(24) }}
      horizontal
      ref={ref => (flatlistRef.current = ref)}
      showsHorizontalScrollIndicator={false}
      onViewableItemsChanged={handleItemChanged.current}
      data={images}
      renderItem={({ item }) => (
        <Image
          source={{
            uri: item,
          }}
          resizeMode="stretch"
          style={styles.imageContainer}
        />
      )}
      keyExtractor={(item, index) => `${index}`}
      centerContent
      getItemLayout={getItemLayout.current}
      viewabilityConfig={viewabilityConfig.current}
      onScrollEndDrag={() => {
        moveToIndex(itemIndex.current);
      }}
    />
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  imageContainer: {
    height: scaleVer(250),
    borderRadius: 8,
    marginBottom: scaleVer(20),
    width: dimension.SCREEN_WIDTH,
  },
});
