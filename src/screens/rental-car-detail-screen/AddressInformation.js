import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { textStyle } from 'Constants/textStyles';
import { scaleVer } from 'Constants/dimensions';
import colors from 'Constants/colors';
import Separator from 'Components/Separator';

type PropsType = {
  buttonTitle: String,
  onPress: () => void,
  title: String,
  text: String,
};

const AddressInformation = ({
  buttonTitle,
  onPress,
  title,
  text,
}: PropsType) => (
  <View style={styles.container}>
    <View>
      <Text style={[textStyle.widgetItem, { marginVertical: scaleVer(10) }]}>
        {title}
      </Text>
    </View>
    <View style={[styles.itemContainer, { justifyContent: 'space-around' }]}>
      <View style={[styles.addItem, { alignItems: 'flex-start' }]}>
        <Text style={textStyle.bodyText}>{text}</Text>
      </View>
      <View style={[styles.addItem, { alignItems: 'flex-end' }]}>
        <TouchableOpacity onPress={onPress}>
          <Text
            style={[
              textStyle.bodyTextBold,
              { color: colors.success, justifyContent: 'center' },
            ]}
          >
            {buttonTitle}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    <Separator />
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: scaleVer(5),
  },
  addItem: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default AddressInformation;
