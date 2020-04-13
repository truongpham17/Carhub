import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { textStyle } from 'Constants/textStyles';
import { Rating, Icon } from 'react-native-elements';
import { getSvg } from 'Assets/svgs';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import colors from 'Constants/colors';
import { NavigationType, CarType, UserType } from 'types';
import { shadowStyle } from 'Constants';
import { connect } from 'react-redux';
import { choosePreviousCar } from '@redux/actions/lease';

type PropTypes = {
  data: CarType,
  navigation: NavigationType,
  choosePreviousCar: () => void,
};

const CarItem = ({ data, choosePreviousCar }: PropTypes) => {
  const handleCarDetail = () => {
    choosePreviousCar(
      {
        vin: data.VIN,
        usingYears: data.usingYears,
        odometer: data.odometer,
      },
      {
        onSuccess: () => data.navigation.navigate('HostScreen'),
        onFailure: () => {
          Alert.alert(
            'Can not choose this car',
            'Something went wrong',
            [{ text: 'OK', onPress: () => console.log('OK') }],
            { cancelable: false }
          );
        },
      }
    );
  };
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: data.carModel.images[0]
            ? data.carModel.images[0]
            : data.images[0],
        }}
        resizeMode="cover"
        style={styles.image}
      />
      <TouchableOpacity
        style={styles.contentContainer}
        onPress={handleCarDetail}
      >
        <View style={styles.title}>
          <View>
            <Text style={textStyle.widgetItem}>{data.carModel.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    // height: scaleVer(300),
    backgroundColor: colors.white,
    ...shadowStyle.ELEVATION_3,
    marginBottom: scaleVer(24),
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
});

export default connect(
  state => ({
    loading: state.lease.loading,
    user: state.user,
    vin: state.lease.vin,
  }),
  { choosePreviousCar }
)(CarItem);
