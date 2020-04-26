import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { textStyle, textStyleObject } from 'Constants/textStyles';
import { shadowStyle } from 'Constants';
import colors from 'Constants/colors';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import { useDispatch } from 'react-redux';
import { setPopUpData, cancelPopup } from '@redux/actions';

type CardData = {
  email: String,
  _id: String,
};

type CardItemTypes = {
  data: CardData,
  onPressEdit: (data: CardData) => void,
  onPressRemove: String => void,
};

type PropTypes = {
  data: [CardData],
  onChange: (_id: String, email: String) => void,
  onRemove: String => void,
  onAddNew: String => void,
};

const CarItem = ({ data, onPressEdit, onPressRemove }: CardItemTypes) => (
  <View style={styles.cardItem}>
    <Text style={textStyle.bodyText}>{data.email}</Text>
    <View style={styles.action}>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => onPressRemove(data._id)}
      >
        <Text style={[textStyle.bodyText, { color: colors.white }]}>
          Remove
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => onPressEdit(data)}
      >
        <Text style={[textStyle.bodyText, { color: colors.white }]}>Edit</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const CardForm = ({ data = [], onChange, onRemove, onAddNew }: PropTypes) => {
  const dispatch = useDispatch();
  return (
    <View style={{ marginTop: scaleVer(12) }}>
      <Text style={styles.label}>Paypal</Text>
      {data.map(item => (
        <CarItem
          key={item._id}
          data={item}
          onPressEdit={(data: CardData) =>
            setPopUpData(dispatch)({
              popupType: 'prompt',
              title: 'Edit Paypal Information',
              description: 'Email or Phone number',
              defaultValue: data.email,
              onConfirm(value) {
                cancelPopup(dispatch);
                onChange(data._id, value);
              },
            })
          }
          onPressRemove={_id =>
            setPopUpData(dispatch)({
              popupType: 'confirm',
              title: 'Remove this paypal email?',
              onConfirm() {
                cancelPopup(dispatch);
                onRemove(_id);
              },
            })
          }
        />
      ))}
      <TouchableOpacity
        style={styles.add}
        onPress={() =>
          setPopUpData(dispatch)({
            popupType: 'prompt',
            title: 'Add new paypal account',
            description: 'Email or Phone number',
            onConfirm(value) {
              cancelPopup(dispatch);
              onAddNew(value);
            },
          })
        }
      >
        <Text>Add new paypal account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardItem: {
    alignSelf: 'stretch',
    height: 72,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...shadowStyle.ELEVATION_2,
    backgroundColor: colors.white,
    marginBottom: scaleVer(8),
    paddingHorizontal: scaleHor(8),
  },
  editButton: {
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.success,
    padding: 8,
  },
  label: {
    ...textStyleObject.label,
    color: colors.dark20,
    marginBottom: scaleVer(4),
  },
  action: {
    flexDirection: 'row',
  },
  removeButton: {
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.errorLight,
    padding: 8,
    marginEnd: scaleHor(8),
  },
  add: {
    height: 32,
    backgroundColor: colors.dark80,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaleVer(12),
    borderRadius: 4,
  },
});

export default CardForm;
