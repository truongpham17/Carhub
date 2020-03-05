import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from 'react-native';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import colors from 'Constants/colors';
import { shadowStyle } from 'Constants';
import { textStyle } from 'Constants/textStyles';
// import { NavigationType } from 'types';

const HistoryItem = () => {
  const handleGoToDetail = () => {};
  return (
    <TouchableWithoutFeedback onPress={handleGoToDetail}>
      <View style={styles.container}>
        <View style={[styles.itemContainer, styles.firstItem]}>
          <View style={styles.inforContainer}>
            <Text style={textStyle.widgetItem}>Camry 2019</Text>
            <Text
              style={[
                textStyle.label,
                { marginBottom: scaleHor(10), color: colors.dark40 },
              ]}
            >
              Exclusive car
            </Text>
            <Text style={[textStyle.bodyText, { color: colors.success }]}>
              Mar 20 - Apr 20
            </Text>
          </View>
          <View style={styles.statusContainer}>
            <Text style={[textStyle.bodyTextBold, { color: colors.primary }]}>
              Waiting
            </Text>
          </View>
        </View>
        <View style={[styles.itemContainer, styles.secondItem]}>
          <Image
            source={{
              uri:
                'https://www.kindpng.com/picc/m/184-1840091_mclaren-logo-clipart-png-transparent-png.png',
            }}
            resizeMode="center"
            style={styles.imgContainer}
          />
          <View style={styles.dayCount}>
            <Text style={[textStyle.bodyText, { color: colors.white }]}>
              3 days left
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: scaleHor(180),
    backgroundColor: colors.white,
    borderRadius: 10,
    ...shadowStyle.ELEVATION_3,
    borderColor: colors.dark90,
    borderWidth: 1,
    marginBottom: scaleHor(10),
  },
  imgContainer: {
    height: scaleHor(80),
    alignSelf: 'stretch',
    width: scaleVer(180),
  },
  itemContainer: {
    flex: 1,
    alignSelf: 'stretch',
    paddingHorizontal: scaleHor(16),
  },
  firstItem: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingTop: scaleVer(10),
  },
  secondItem: {
    flexDirection: 'row-reverse',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
    paddingBottom: scaleVer(10),
  },
  dayCount: {
    alignSelf: 'flex-end',
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 5,
  },
  inforContainer: {},
  statusContainer: {},
});

export default HistoryItem;
