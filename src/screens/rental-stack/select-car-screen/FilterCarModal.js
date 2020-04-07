import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ModalContainer } from 'Components';
import colors from 'Constants/colors';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { textStyle } from 'Constants/textStyles';

type PropsType = {
  onClose: () => void,
};

const FilterCarModal = ({ onClose }: PropsType) => (
  <ModalContainer onClose={onClose} position="flex-end" modalVisible>
    <View style={styles.container}>
      <View style={{ width: '100%' }}>
        <View style={styles.titleContainer}>
          <Text style={textStyle.widgetTitle}>Filter</Text>
          <TouchableOpacity onPress={onClose}>
            <Text>X</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View>
          <Text style={textStyle.bodyTextBold}>CAR SIZE</Text>
        </View>
        <View></View>
      </View>
    </View>
  </ModalContainer>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: '90%',
    height: scaleVer(512),
    borderRadius: 15,
    paddingVertical: scaleVer(16),
    paddingHorizontal: scaleHor(16),
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default FilterCarModal;
