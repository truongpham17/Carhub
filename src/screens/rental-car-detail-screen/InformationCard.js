import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { textStyle } from 'Constants/textStyles';
import { scaleVer } from 'Constants/dimensions';
import Separator from 'Components/Separator';
import colors from 'Constants/colors';
import { dimension } from 'Constants';

type PropsType = {
  title: String,
  children: NodeList,
  showSeparator?: Boolean,
  detail: [string],
  onPress: () => void,
};

const InformationCard = ({
  title,
  children,
  showSeparator = false,
  detail,
  onPress,
}: PropsType) => (
  <View>
    <View>
      <Text style={[textStyle.widgetItem, { marginVertical: scaleVer(10) }]}>
        {title.toUpperCase()}
      </Text>
    </View>
    <View style={{ marginTop: scaleVer(12) }}>
      <View style={[styles.dateItem, { alignItems: 'flex-start' }]}>
        {detail.map(item => (
          <Text style={[textStyle.bodyText]}>{item}</Text>
        ))}
      </View>
      <View style={[styles.dateItem, { alignItems: 'flex-end' }]}>
        <TouchableOpacity onPress={() => {}}>
          <Text
            style={[
              textStyle.bodyTextBold,
              { color: colors.success, justifyContent: 'center' },
            ]}
          >
            CHANGE
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    {showSeparator && <Separator />}
  </View>
);

export default InformationCard;

const styles = StyleSheet.create({
  imageContainer: {
    height: scaleVer(250),
    borderRadius: 8,
    marginBottom: scaleVer(20),
    width: dimension.SCREEN_WIDTH,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: scaleVer(5),
  },
  dateItem: {
    flex: 1,
    justifyContent: 'center',
  },
  libertyItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
  },
  libertyContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginVertical: scaleVer(28),
  },
});
