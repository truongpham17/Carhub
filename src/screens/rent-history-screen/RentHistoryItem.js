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
import { RentDetailType } from 'types';
import { subtractDate } from 'Utils/common';
import moment from 'moment';

type PropTypes = {
  rentDetail: RentDetailType,
  onGetDetail: () => void,
};

const RentHistoryItem = ({ rentDetail, onGetDetail }: PropTypes) => {
  const handleOnClick = () => {
    onGetDetail(rentDetail._id);
  };
  const startDateFormat = moment(rentDetail.startDate).format('MMM Do, YYYY');
  const endDateFormat = moment(rentDetail.endDate).format('MMM Do, YYYY');
  let typeofDate = '';
  if (rentDetail.status === 'CURRENT') {
    typeofDate = 'days left';
  } else if (rentDetail.status === 'OVERDUE') {
    typeofDate = 'days overdue';
  }

  const getStatus = status => {
    const arr = status.split('/');
    if (arr.length > 1) {
      if (arr[1] === 'ACCEPTED') {
        return 'WAITING';
      }
      if (arr[1] === 'CURRENT') {
        return 'CURRENT';
      }
      return 'PENDING';
    }
    return status;
  };

  return (
    <TouchableWithoutFeedback onPress={handleOnClick}>
      <View style={styles.container}>
        <View style={[styles.itemContainer, styles.firstItem]}>
          <View style={styles.inforContainer}>
            <Text style={textStyle.widgetItem}>{rentDetail.carModel.name}</Text>
            <Text
              style={[
                textStyle.label,
                { marginBottom: scaleHor(10), color: colors.dark40 },
              ]}
            >
              {rentDetail.carModel.type}
            </Text>
            <Text style={[textStyle.bodyText, { color: colors.success }]}>
              {startDateFormat} - {endDateFormat}
            </Text>
          </View>
          <View style={styles.statusContainer}>
            <Text style={[textStyle.bodyTextBold, { color: colors.primary }]}>
              {/* {rentDetail.status} */}
              {getStatus(rentDetail.status)}
            </Text>
          </View>
        </View>
        <View style={[styles.itemContainer, styles.secondItem]}>
          <Image
            source={{
              uri: rentDetail.carModel.images[0],
            }}
            resizeMode="center"
            style={styles.imgContainer}
          />
          {rentDetail.status === 'CURRENT' ||
          rentDetail.status === 'OVERDUE' ? (
            <View style={styles.dayCount}>
              <Text style={[textStyle.bodyText, { color: colors.white }]}>
                {Math.abs(subtractDate(new Date(), rentDetail.endDate))}{' '}
                {typeofDate}
              </Text>
            </View>
          ) : (
            <Text></Text>
          )}
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

export default RentHistoryItem;
