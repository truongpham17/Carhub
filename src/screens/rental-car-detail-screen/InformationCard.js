import React from 'react';
import { View, Text } from 'react-native';
import { textStyle } from 'Constants/textStyles';
import { scaleVer } from 'Constants/dimensions';
import Separator from 'Components/Separator';

type PropsType = {
  title: String,
  children: NodeList,
  showSeparator?: Boolean,
};

const InformationCard = ({
  title,
  children,
  showSeparator = false,
}: PropsType) => (
  <View>
    <View>
      <Text style={[textStyle.widgetItem, { marginVertical: scaleVer(10) }]}>
        {title.toUpperCase()}
      </Text>
    </View>
    <View style={{ marginTop: scaleVer(10) }}>{children}</View>
    {showSeparator && <Separator />}
  </View>
);

export default InformationCard;
