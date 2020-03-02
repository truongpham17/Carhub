import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { ViewContainer, Button } from 'Components';
import { RentailCarDetailType, NavigationType } from 'types';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import { textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';
import Separator from 'Components/Separator';
import { dimension } from 'Constants';
import AddressInformation from './AddressInformation';
import InformationCard from './InformationCard';

type PropsType = {
  rentalDetail: RentailCarDetailType,
  navigation: NavigationType,
};

const ImageSlider = ({ rentalDetail, navigation }: PropsType) => {
  const flatlistRef = useRef(null);

  const itemIndex = useRef(0);

  const handleItemChanged = ({ changed }) => {
    if (changed[0].isViewable) {
      itemIndex.current = changed[0].index;
    }
  };

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
      onViewableItemsChanged={handleItemChanged}
      data={[1, 2, 3]}
      renderItem={() => (
        <Image
          source={{
            uri:
              'https://www.kindpng.com/picc/m/184-1840091_mclaren-logo-clipart-png-transparent-png.png',
          }}
          resizeMode="stretch"
          style={styles.imageContainer}
        />
      )}
      keyExtractor={(item, index) => `${index}`}
      centerContent
      getItemLayout={(data, index) => ({
        length: dimension.SCREEN_WIDTH,
        offset: dimension.SCREEN_WIDTH * index,
        index,
      })}
      viewabilityConfig={{
        waitForInteraction: true,
        viewAreaCoveragePercentThreshold: 20,
      }}
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
