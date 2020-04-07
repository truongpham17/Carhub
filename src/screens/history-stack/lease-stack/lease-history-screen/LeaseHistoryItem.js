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
import { LeaseDetailType } from 'types';
import moment from 'moment';

type PropTypes = {
  leaseDetail: LeaseDetailType,
  onGetDetail: () => void,
};

const LeaseHistoryItem = ({ leaseDetail, onGetDetail }: PropTypes) => {
  const handleOnClick = () => {
    onGetDetail(leaseDetail._id);
  };
  // console.log(leaseDetail);
  const startDateFormat = moment(leaseDetail.startDate).format('MMM Do, YYYY');
  const endDateFormat = moment(leaseDetail.endDate).format('MMM Do, YYYY');
  const totalEarn = leaseDetail.totalEarn || 0;

  return (
    <TouchableWithoutFeedback onPress={handleOnClick}>
      <View style={styles.container}>
        <View style={[styles.itemContainer, styles.firstItem]}>
          <View style={styles.inforContainer}>
            <Text style={textStyle.widgetItem}>
              {leaseDetail.car.carModel.name}
            </Text>
            <Text
              style={[
                textStyle.label,
                { marginBottom: scaleHor(10), color: colors.dark40 },
              ]}
            >
              {leaseDetail.car.carModel.type}
            </Text>
            <Text style={[textStyle.bodyText, { color: colors.success }]}>
              {startDateFormat} - {endDateFormat}
            </Text>
          </View>
          <View style={styles.statusContainer}>
            <Text style={[textStyle.bodyTextBold, { color: colors.primary }]}>
              {leaseDetail.status}
            </Text>
          </View>
        </View>
        <View style={[styles.itemContainer, styles.secondItem]}>
          <Image
            source={{
              uri: leaseDetail.car.images[0],
            }}
            resizeMode="center"
            style={styles.imgContainer}
          />
          {totalEarn > 0 && (
            <View style={styles.totalEarn}>
              <Text style={[textStyle.bodyText, { color: colors.dark }]}>
                Total Earn:{' '}
                <Text
                  style={[textStyle.bodyText, { colors: colors.successLight }]}
                >
                  $ {leaseDetail.totalEarn}
                </Text>
              </Text>
            </View>
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
  totalEarn: {
    alignSelf: 'flex-end',
    borderRadius: 10,
    padding: 5,
  },
  inforContainer: {},
  statusContainer: {},
});

export default LeaseHistoryItem;
