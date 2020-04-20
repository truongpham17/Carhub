import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  ViewContainer,
  ModalContainer,
  Button,
  ProgressStep,
  InputForm,
} from 'Components';
import { RentDetailType, NavigationType } from 'types';

import { Slider } from 'react-native-elements';
import colors from 'Constants/colors';
import { textStyle } from 'Constants/textStyles';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { RECOMMEND_PRICE_FOR_SHARING } from 'Constants/policy';
import { shadowStyle } from 'Constants';
import { formatDate } from 'Utils/date';
import { setSharingData } from '@redux/actions';

type PropTypes = {
  navigation: NavigationType,
};

const SelectTimeScreen = ({ navigation }: PropTypes) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());

  const rentDetail: RentDetailType = useSelector(state =>
    state.rental.data.rentals.find(item => item._id === state.rental.selectedId)
  );

  const onBackPress = () => {
    navigation.pop();
  };

  const handleNextStep = () => {
    setSharingData(dispatch)({ time: date });
    navigation.navigate('SelectPriceScreen');
  };

  return (
    <ViewContainer haveBackHeader title="Select time" onBackPress={onBackPress}>
      <View style={{ flex: 1 }}>
        <ProgressStep
          labels={['Time', 'Price', 'Address', 'Complete']}
          currentStep={0}
          style={{ marginBottom: scaleVer(4) }}
          titleStyle={{ paddingStart: scaleHor(12), paddingEnd: 0 }}
          headerStyle={{ paddingHorizontal: scaleHor(12) }}
        />

        <Text style={[textStyle.widgetItem, { marginVertical: scaleVer(32) }]}>
          Please select the starting time to share your car
        </Text>

        <InputForm
          type="calendar"
          value={formatDate(date)}
          onChangeText={setDate}
        />
      </View>

      <Button
        label="Next step"
        style={{ marginBottom: scaleVer(12) }}
        onPress={handleNextStep}
      />
    </ViewContainer>
  );
};

export default SelectTimeScreen;
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
