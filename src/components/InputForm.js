import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { textStyleObject } from 'Constants/textStyles';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import { Calendar, DownArrow } from 'Assets/svgs';
import { defaultFunction } from 'Utils/common';
import LinearGradient from 'react-native-linear-gradient';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { pure } from 'recompose';
import colors from 'Constants/colors';

type PropTypes = {
  label: string,
  value: string,
  onChangeText: string => void,
  multiline: boolean,
  containerStyle: StyleProp<ViewStyle>,
  textInputStyle: StyleProp<ViewStyle>,
  placeholder?: string,
  type: 'textinput' | 'calendar' | 'dropdown',
  onAction?: () => void,
  dropDownList?: [{ value: string, key: number }],
  showDropList?: boolean,
  onDropItemPress: string => void,
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
  onAction = defaultFunction,
  dropDownList = [],
  onDropItemPress,
  selectedItem,
  autoFocus = false,
  error,
  keyboardType,
  onTextFocus = defaultFunction,
  secureTextEntry,
}: PropTypes) => {
  const [inputHover, setInputHover] = useState(false);
  const [showDropList, setShowDropDownList] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const handleTextInputFocus = () => {
    setInputHover(true);

    onTextFocus();
  };
  const handleTextInputBlur = () => {
    setInputHover(false);
  };
  const renderDropItem = (item, index) => (
    <TouchableOpacity
      style={[
        styles.dropDownItem,
        index === dropDownList.length - 1 ? { borderBottomWidth: 0 } : {},
      ]}
      onPress={() => {
        onChangeText(item);
        setShowDropDownList(false);
      }}
      key={item.key}
    >
      {item.key === selectedItem ? (
        <LinearGradient
          style={styles.selectedContainer}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          colors={[colors.primaryLight, colors.primary]}
          locations={[0, 1]}
        >
          <Text style={styles.selectedText}>{item.value}</Text>
        </LinearGradient>
      ) : (
        <Text style={styles.text}>{item.value}</Text>
      )}
    </TouchableOpacity>
  );
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
          <View>
            <TouchableOpacity
              style={styles.contentContainer}
              onPress={() => setDatePickerVisible(visible => !visible)}
            >
              <Text style={styles.text}>{value}</Text>
              <Calendar />
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={datePickerVisible}
              mode="date"
              onConfirm={date => {
                onChangeText(date);
                setDatePickerVisible(false);
              }}
              date={new Date()}
              onCancel={() => setDatePickerVisible(false)}
            />
          </View>
        );
      case 'dropdown':
        return (
          <TouchableOpacity
            style={{ backgroundColor: 'white' }}
            onPress={() => setShowDropDownList(showDropList => !showDropList)}
          >
            <View
              style={[
                styles.contentContainer,
                showDropList
                  ? { borderBottomStartRadius: 0, borderBottomEndRadius: 0 }
                  : {},
              ]}
            >
              <Text style={styles.text}>{value}</Text>
              <DownArrow />
            </View>
            {showDropList && (
              <View style={styles.dropDownList}>
                <FlatList
                  data={dropDownList}
                  renderItem={({ item, index }) => renderDropItem(item, index)}
                />
                {/* {dropDownList.map((item, index) => renderDropItem(item, index))} */}
              </View>
            )}
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };
  return (
    <View style={[containerStyle, type === 'dropdown' ? { zIndex: 2 } : {}]}>
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
