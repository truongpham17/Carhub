import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { textStyleObject } from 'Constants/textStyles';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import { Calendar } from 'Assets/svgs';
import { defaultFunction } from 'Utils/common';

import RNPickerSelect from 'react-native-picker-select';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { pure } from 'recompose';
import colors from 'Constants/colors';
import { formatDate } from 'Utils/date';

type PropTypes = {
  label: string,
  value: string,
  onChangeText: string => void,
  multiline: boolean,
  containerStyle: StyleProp<ViewStyle>,
  textInputStyle: StyleProp<ViewStyle>,
  placeholder?: string,
  type: 'textinput' | 'calendar' | 'dropdown',
  dropDownList?: [{ value: string, key: number }],
  selectedItem: string,
  autoFocus?: boolean,
  error?: string,
  onTextFocus: () => void,
  keyboardType: 'default' | 'numeric',
  secureTextEntry: boolean,
};

const InputForm = ({
  label,
  value,
  onChangeText,
  multiline,
  containerStyle,
  textInputStyle,
  placeholder,
  type = 'textinput',
  dropDownList = [],
  autoFocus = false,
  error,
  keyboardType,
  onTextFocus = defaultFunction,
  secureTextEntry,
}: PropTypes) => {
  const [inputHover, setInputHover] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const handleTextInputFocus = () => {
    setInputHover(true);

    onTextFocus();
  };
  const handleTextInputBlur = () => {
    setInputHover(false);
  };
  const renderContent = () => {
    switch (type) {
      case 'textinput':
        return (
          <TextInput
            value={value}
            onChangeText={onChangeText}
            style={[
              styles.textInput,
              textInputStyle,
              multiline ? { paddingTop: scaleVer(8) } : {},
              error ? styles.error : {},
              inputHover ? { borderColor: colors.primary } : {},
            ]}
            multiline={multiline}
            placeholder={placeholder}
            autoFocus={autoFocus}
            onFocus={handleTextInputFocus}
            onBlur={handleTextInputBlur}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
          />
        );
      case 'calendar':
        return (
          <>
            <TouchableOpacity
              style={styles.contentContainer}
              onPress={() => setDatePickerVisible(visible => !visible)}
            >
              <Text style={styles.text}>{formatDate(value)}</Text>
              <Calendar />
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={datePickerVisible}
              mode="date"
              onConfirm={date => {
                setDatePickerVisible(false);
                onChangeText(date);
              }}
              date={new Date(value) || new Date()}
              onCancel={() => setDatePickerVisible(false)}
            />
          </>
        );
      case 'dropdown':
        return (
          <RNPickerSelect
            onValueChange={onChangeText}
            items={dropDownList}
            style={{
              inputIOS: styles.contentContainer,
              inputAndroid: styles.contentContainer,
            }}
            placeholder={{ label: placeholder }}
          />
        );
      default:
        return null;
    }
  };
  return (
    <View style={[containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      {renderContent()}
    </View>
  );
};
export default pure(InputForm);

const styles = StyleSheet.create({
  container: {},
  textInput: {
    paddingHorizontal: scaleHor(8),
    height: scaleHor(44),
    borderRadius: 4,
    borderWidth: 1,
    ...textStyleObject.bodyText,
    color: colors.dark20,
    borderColor: colors.dark60,
    backgroundColor: colors.white,
  },
  label: {
    ...textStyleObject.label,
    color: colors.dark20,
    marginBottom: scaleVer(4),
  },
  contentContainer: {
    paddingHorizontal: scaleHor(8),
    height: scaleHor(44),
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.dark60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropDownItem: {
    paddingHorizontal: scaleHor(16),
    height: scaleHor(44),

    borderColor: colors.dark60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  dropDownList: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderStartWidth: 1,
    borderEndWidth: 1,
    borderColor: colors.dark60,
    height: scaleHor(160),
  },
  text: {
    ...textStyleObject.bodyText,
    color: colors.dark20,
  },
  selectedText: {
    ...textStyleObject.bodyText,
    color: colors.white,
  },
  selectedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginHorizontal: -scaleHor(16),
    paddingHorizontal: scaleHor(16),
  },
  error: {
    borderColor: colors.primary,
  },
});
