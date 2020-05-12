import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { textStyle } from 'Constants/textStyles';
import { Rating, Icon } from 'react-native-elements';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import colors from 'Constants/colors';
import { shadowStyle } from 'Constants';
import DiscountFlag from './DiscountFlag';

type PropTypes = {
  image: string,
  name: string,
  type: string,
  rating: number,
  configs: [
    {
      icon: string,
      type: string,
      value: string,
    }
  ],
  _id: String,
  onItemPress: () => void,
  distance: Number,
  rentalType: 'SHARING' | 'HUB',
  onPressInfo: () => void,
  discount?: number,
  quantity: number,
};

const ConfigItem = ({ icon, value, special }) => (
  <View style={styles.item}>
    <Icon
      type="feather"
      name={icon}
      containerStyle={{ marginEnd: scaleHor(8) }}
    />
    <Text style={[textStyle.bodyText]}>{value}</Text>
  </View>
);

const SelectCarItem = ({
  image,
  name,
  type,
  rating,
  configs,
  onItemPress,
  _id,
  distance,
  rentalType,
  onPressInfo,
  discount,
  quantity,
}: PropTypes) => (
  <View style={styles.container}>
    <View style={{ overflow: 'hidden' }}>
      {rentalType === 'SHARING' && (
        <>
          <Icon
            type="simple-line-icon"
            name="exclamation"
            color={colors.primary}
            size={16}
            containerStyle={styles.exclamation}
            onPress={() => onPressInfo(_id)}
          />
          <DiscountFlag discount={discount} />
        </>
      )}

      <Image
        source={{ uri: image }}
        resizeMode="contain"
        style={styles.image}
      />
      <TouchableOpacity
        style={styles.contentContainer}
        onPress={() => onItemPress(_id)}
      >
        <View style={styles.title}>
          <View>
            <Text style={textStyle.widgetItem}>{name}</Text>
            <Text style={textStyle.label}>{type}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <View style={styles.rating}>
              {/* <Text style={textStyle.widgetItem}>{rating}</Text> */}
              <Text style={textStyle.widgetItem}>
                {quantity} <Text style={textStyle.bodyText}>car left</Text>
              </Text>
              {/* <Rating
                imageSize={20}
                readonly
                startingValue={rating}
                style={{ paddingStart: scaleHor(8) }}
              /> */}
            </View>
            <Text style={textStyle.bodyText}>
              Distance:{' '}
              <Text style={textStyle.bodyTextBold}>
                {Math.round(distance * 100) / 100} Km
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.config}>
          {configs.map(item => (
            <ConfigItem {...item} />
          ))}
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    // height: scaleVer(300),
    backgroundColor: colors.white,
    ...shadowStyle.ELEVATION_3,
    marginBottom: scaleVer(24),
    marginHorizontal: scaleHor(24),
    marginTop: scaleHor(12),
  },
  image: {
    // flex: 1,
    borderRadius: 8,
    width: '100%',
    height: 180,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleVer(12),
  },
  contentContainer: {
    paddingVertical: scaleVer(12),
    paddingHorizontal: scaleVer(12),
  },
  rating: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  config: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexGrow: 2,
  },
  item: {
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  exclamation: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 2,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});

export default SelectCarItem;
