import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ViewContainer, Button } from 'Components';

import { connect } from 'react-redux';

import { NavigationType } from 'types';
import { textStyle } from 'Constants/textStyles';
import { SecurityDraw } from 'Assets/svgs';
import { scaleVer } from 'Constants/dimensions';

type PropTypes = {
  navigation: NavigationType,
};

const InfoExplainScreen = ({ navigation }: PropTypes) => {
  const onBackPress = () => {
    navigation.pop();
  };

  return (
    <ViewContainer>
      <Text
        style={[textStyle.sectionHeadingBold, { marginVertical: scaleVer(32) }]}
      >
        Your Information
      </Text>

      <Text style={textStyle.bodyText}>
        Since this is your first trip, you’ll need to provide your photo,
        driver’s license, and contact to setup your account
      </Text>
      <View style={{ alignItems: 'center', flex: 1 }}>
        <SecurityDraw />
      </View>

      <Text style={[textStyle.bodyText, { textAlign: 'center' }]}>
        Your information is stored securely
      </Text>
      <Button label="Continue" style={{ marginVertical: scaleVer(16) }} />
    </ViewContainer>
  );
};

export default connect(state => ({}), {})(InfoExplainScreen);
const styles = StyleSheet.create({});
