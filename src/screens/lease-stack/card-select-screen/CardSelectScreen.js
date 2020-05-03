import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ViewContainer, ProgressStep, Button } from 'Components';

import { useDispatch, useSelector } from 'react-redux';

import { NavigationType, UserType } from 'types';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import { textStyleObject, textStyle } from 'Constants/textStyles';
import { shadowStyle } from 'Constants';
import colors from 'Constants/colors';
import {
  setPopUpData,
  cancelPopup,
  updateUser,
  setLeaseInfo,
} from '@redux/actions';
import ProgressLeaseStep from '../ProgressLeaseStep';

type PropTypes = {
  navigation: NavigationType,
};

type CardData = {
  email: String,
  _id: String,
};
type CardItemTypes = {
  data: CardData,
  onSelectItem: (_id: String) => void,
  selectedId: String,
};

const CardItem = ({ data, onSelectItem, selectedId }: CardItemTypes) => (
  <TouchableOpacity
    style={[styles.cardItem, data._id === selectedId ? styles.activeItem : {}]}
    onPress={() => onSelectItem(data)}
  >
    <Text style={textStyle.bodyText}>{data.email}</Text>
  </TouchableOpacity>
);

const CardSelectScreen = ({ navigation }: PropTypes) => {
  const dispatch = useDispatch();
  const [cardNumber, setCardNumber] = useState({});

  const user: UserType = useSelector(state => state.user);
  const onBackPress = () => {
    navigation.pop();
  };

  const handleNextStep = () => {
    if (!cardNumber.email) {
      return setPopUpData(dispatch)({
        popupType: 'confirm',
        acceptOnly: true,
        title: 'Please select card',
      });
    }
    setLeaseInfo(dispatch)({ cardNumber: cardNumber.email });
    navigation.navigate('HostReviewScreen');
  };

  const showCardInput = () => {
    setPopUpData(dispatch)({
      popupType: 'prompt',
      title: 'Add new paypal account',
      description: 'Email or Phone number',
      onConfirm(value) {
        cancelPopup(dispatch);
        onAddNewCard(value);
      },
    });
  };

  const onAddNewCard = email => {
    updateUser(dispatch)({
      id: user._id,
      paypalCard: [...user.paypalCard, { email }],
    });
  };

  return (
    <ViewContainer
      haveBackHeader
      title="Host"
      onBackPress={onBackPress}
      loading={user.loading}
    >
      <ProgressLeaseStep step={2} />

      <Text style={styles.title}>Payment information</Text>

      <Text style={[styles.label, { marginTop: scaleVer(24) }]}>
        Select your Paypal account
      </Text>
      {(user.paypalCard || []).map(item => (
        <CardItem
          data={item}
          onSelectItem={value => setCardNumber(value)}
          selectedId={cardNumber._id}
        />
      ))}
      <View
        style={{
          flex: 1,
          marginBottom: scaleVer(12),
          justifyContent: 'flex-end',
        }}
      >
        <Button
          label="Add new paypal account"
          style={{ marginBottom: scaleVer(8) }}
          colorStart={colors.secondaryLight}
          colorEnd={colors.secondary}
          onPress={showCardInput}
        />
        <Button label="Next step" onPress={handleNextStep} />
      </View>
    </ViewContainer>
  );
};

export default CardSelectScreen;
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    ...textStyleObject.widgetItem,
    marginTop: scaleVer(16),
  },
  cardItem: {
    alignSelf: 'stretch',
    height: 48,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...shadowStyle.ELEVATION_2,
    backgroundColor: colors.white,
    marginTop: scaleVer(8),
    paddingHorizontal: scaleHor(8),
    borderRadius: 4,
  },
  label: {
    ...textStyleObject.label,
    color: colors.dark20,
    marginBottom: scaleVer(4),
  },
  activeItem: {
    borderWidth: 1,
    borderColor: colors.success,
  },
});
