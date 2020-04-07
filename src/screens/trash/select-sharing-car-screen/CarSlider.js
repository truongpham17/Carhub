import React, { useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { SharingType } from 'types';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import colors from 'Constants/colors';
import { dimension } from 'Constants';
import { textStyle } from 'Constants/textStyles';
import { substractDate } from 'Utils/date';
import moment from 'moment';

type PropsType = {
  sharing: [SharingType],
  selectCar: SharingType,
  itemIndex: {},
  carRef: {},
  moveToIndex: () => void,
  goToNextStep: () => void,
};

const CarSlider = ({
  sharing,
  itemIndex,
  carRef,
  moveToIndex,
  goToNextStep,
}: PropsType) => {
  // const CarRef = useRef(null);

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

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={goToNextStep}>
      <View style={styles.sliderItem}>
        <View style={[styles.itemContainer]}>
          <View>
            <Image
              source={{ uri: item.rental.carModel.images[0] }}
              resizeMode="stretch"
              style={styles.image}
            />
          </View>
          <View>
            <Text style={textStyle.label}>{item.rental.carModel.name}</Text>
            <Text style={textStyle.labelRegular}>
              {moment(item.rental.startDate).format('MMM Do')} -{' '}
              {moment(item.rental.endDate).format('MMM Do')}
            </Text>
            <Text style={textStyle.labelRegular}>{item.price} $</Text>
            <Text style={textStyle.labelRegular}>
              {Math.abs(substractDate(new Date(), item.rental.endDate))} days
            </Text>
            <Text style={textStyle.labelRegular}>{item.location || ''}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  const renderKey = (item, index) => index.toString();
  return (
    <View style={styles.container}>
      <FlatList
        data={sharing}
        ref={ref => (carRef.current = ref)}
        keyExtractor={renderKey}
        renderItem={renderItem}
        horizontal
        centerContent
        onViewableItemsChanged={handleItemChanged.current}
        onScrollEndDrag={() => {
          moveToIndex(itemIndex.current);
        }}
        getItemLayout={getItemLayout.current}
        viewabilityConfig={viewabilityConfig.current}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    height: scaleVer(128),
  },
  sliderItem: {
    alignSelf: 'stretch',
    width: dimension.SCREEN_WIDTH,
    // paddingVertical: scaleVer(16),
    // paddingHorizontal: scaleHor(8),
    alignItems: 'center',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: colors.white,
    width: '90%',
    paddingHorizontal: scaleHor(10),
    paddingVertical: scaleVer(10),
    borderRadius: 15,
  },
  image: {
    width: scaleHor(128),
    height: scaleVer(84),
    marginRight: scaleHor(18),
  },
});

export default CarSlider;
