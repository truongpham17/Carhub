import React from 'react';
import { View, StyleSheet } from 'react-native';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import { ProgressStep } from 'Components';

type PropTypes = {
  step: number,
};

const ProgressLeaseStep = ({ step }: PropTypes) => (
  <ProgressStep
    labels={['Car info', 'Hub Info', 'Select card', 'Review']}
    currentStep={step}
    style={{ marginBottom: scaleVer(4) }}
    titleStyle={{ paddingStart: scaleHor(12), paddingEnd: 0 }}
    headerStyle={{ paddingHorizontal: scaleHor(12) }}
  />
);

const styles = StyleSheet.create({});

export default ProgressLeaseStep;
