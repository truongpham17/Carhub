import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { textStyle } from 'Constants/textStyles';

import { Icon } from 'react-native-elements';
import { scaleVer } from 'Constants/dimensions';
import colors from 'Constants/colors';
import ItemContainer from './ItemContainer';

type PropTypes = {
  description: string,
};

const Description = ({ description }: PropTypes) => (
  <ItemContainer title="Description">
    <Text style={textStyle.bodyText}>{description}</Text>
  </ItemContainer>
);

export default Description;
