import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import {
  ViewContainer,
  InputForm,
  Button,
  DatePicker,
  ListItem,
} from 'Components';
import { textStyle } from 'Constants/textStyles';
import { NavigationType } from 'types';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { shadowStyle } from 'Constants';
import colors from 'Constants/colors';

type PropTypes = () => {
  navigation: NavigationType,
  review: [{ label: String, content: String }],
};

const HostReviewScreen = ({ navigation, review }: PropTypes) => {
  const onPressBack = () => {
    navigation.pop();
  };
  const handleNextStep = () => {};
  return (
    <ViewContainer
      scrollable
      haveBackHeader
      title="Host"
      onBackPress={onPressBack}
    >
      {review.map((item, index) => (
        <ListItem
          type="detail"
          label={item.label}
          detail={item.content}
          showSeparator={index !== review.length - 1}
          key={item.label}
          pressable={false}
        />
      ))}
      <Button
        style={{ marginVertical: scaleVer(32) }}
        label="Submit"
        onPress={handleNextStep}
      />
    </ViewContainer>
  );
};

export default connect(state => ({ review: state.leaseRequest.review }))(
  HostReviewScreen
);
