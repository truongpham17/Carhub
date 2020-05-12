import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  ViewContainer,
  ModalContainer,
  Button,
  ProgressStep,
} from 'Components';
import { RentDetailType, NavigationType } from 'types';

import { Slider } from 'react-native-elements';
import colors from 'Constants/colors';
import { textStyle } from 'Constants/textStyles';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { RECOMMEND_PRICE_FOR_SHARING } from 'Constants/policy';
import { shadowStyle } from 'Constants';
import { setSharingData } from '@redux/actions';

type PropTypes = {
  navigation: NavigationType,
};

const SelectPriceScreen = ({ navigation }: PropTypes) => {
  const dispatch = useDispatch();

  const rentDetail: RentDetailType = useSelector(state =>
    state.rental.data.rentals.find(item => item._id === state.rental.selectedId)
  );

  const [price, setPrice] = useState(
    rentDetail.price * RECOMMEND_PRICE_FOR_SHARING
  );

  const onBackPress = () => {
    navigation.pop();
  };

  const handleNextStep = () => {
    setSharingData(dispatch)({ price });
    navigation.navigate('SelectShareAddressScreen');
  };

  return (
    <ViewContainer haveBackHeader title="Sharing" onBackPress={onBackPress}>
      <View style={{ flex: 1 }}>
        <ProgressStep
          labels={['Time', 'Price', 'Address', 'Complete']}
          currentStep={1}
          style={{ marginBottom: scaleVer(4) }}
          titleStyle={{ paddingStart: scaleHor(12), paddingEnd: 0 }}
          headerStyle={{ paddingHorizontal: scaleHor(12) }}
        />

        <Text style={[textStyle.widgetItem, { marginTop: scaleVer(32) }]}>
          Please select price for your sharing
        </Text>
        <Text style={[textStyle.bodyText, { marginTop: scaleVer(12) }]}>
          Remember the lower price, the easier your sharing will be taken. With
          this car, we recommend your sharing price is 60% of your rental fee.
          Be sure because you can not change your price after.
        </Text>
        <View style={styles.priceContainer}>
          <View style={styles.title}>
            <Text style={textStyle.bodyTextBold}>Sharing price</Text>
            <Text style={textStyle.widgetItem}>$ {price}</Text>
          </View>
          <Slider
            value={price}
            onValueChange={setPrice}
            minimumValue={1}
            maximumValue={Number(rentDetail.price)}
            step={1}
            thumbTintColor={colors.secondary}
            minimumTrackTintColor={colors.secondary}
            maximumTrackTintColor={colors.white}
            trackStyle={styles.trackStyle}
          />
        </View>
      </View>

      <Button
        label="Next step"
        style={{ marginBottom: scaleVer(12) }}
        onPress={handleNextStep}
      />
    </ViewContainer>
  );
};

export default SelectPriceScreen;
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.white,
    paddingVertical: scaleVer(16),
    paddingHorizontal: scaleHor(16),
    height: scaleVer(256),
    width: scaleHor(256),
    borderRadius: 15,
  },
  itemContainer: {
    flex: 1,
  },
  priceContainer: {
    ...shadowStyle.ELEVATION_3,
    backgroundColor: colors.white,
    paddingVertical: scaleVer(32),
    paddingHorizontal: scaleHor(12),
    marginTop: scaleVer(32),
  },
  title: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  trackStyle: {
    borderWidth: 1,
    borderColor: '#9A9FA3',
    borderRadius: 3,
    height: scaleVer(6),
  },
});
