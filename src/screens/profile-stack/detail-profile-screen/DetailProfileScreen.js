import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ViewContainer, Avatar, InputForm, Button } from 'Components';

import { useDispatch, useSelector } from 'react-redux';

import { NavigationType } from 'types';
// import { setUserData } from '@redux/actions';
import { selectImage } from 'Utils/images';
import { scaleVer } from 'Constants/dimensions';
import { updateUser } from '@redux/actions';
import { DEFAULT_AVATAR } from 'Constants/app';
import { getData } from './utils';
import CardForm from './CardForm';

type PropTypes = {
  navigation: NavigationType,
};
const updateFields = [
  'avatar',
  'email',
  'birthday',
  'gender',
  'fullName',
  'paypalCard',
];

const ProfileDetailScreen = ({ navigation }: PropTypes) => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  const [cardData, setCardData] = useState(user.paypalCard || []);

  const [editData, setEditData] = useState(user);

  const onBackPress = () => {
    navigation.pop();
  };

  const handleAvatarPress = () => {
    selectImage(({ uri }) => {
      setEditData(info => ({
        ...info,
        avatar: uri,
      }));
    });
  };

  const handleEditTextInput = (type, value) => {
    setEditData(info => ({
      ...info,
      [type]: value,
    }));
  };

  const onSubmitEditProfile = () => {
    const updateData = {
      ...editData,
      paypalCard: cardData.map(item => ({ email: item.email })),
    };
    // if (editData.avatar.url !== user.avatar.url) {
    //   const arr = updateData.avatar.url.split('/');
    //   const name = arr[arr.length - 1];
    //   const file = { uri: updateData.avatar.url, name, type: 'image/jpeg' };
    //   updateData.avatar = new ReactNativeFile(file);
    // } else {
    //   delete updateData.avatar;
    // }
    const updateDataEdited = {};
    // only update data has been edited
    updateFields.forEach(item => {
      if (updateData[item] !== user[item]) {
        updateDataEdited[item] = updateData[item];
      }
    });

    // remove all undefined and null properties
    Object.keys(updateDataEdited).forEach(
      key => !updateDataEdited[key] && delete updateDataEdited[key]
    );

    console.log(updateDataEdited);

    // console.log(updateDataEdited);

    // only update date if at least one attribute has been editted
    if (JSON.stringify(updateDataEdited) !== '{}') {
      updateUser(dispatch)(
        { id: user._id, ...updateDataEdited },
        {
          onSuccess() {
            navigation.pop();
          },
          onFailure() {},
        }
      );
    } else {
      navigation.pop();
    }
  };

  const data = getData(editData);

  return (
    <ViewContainer
      haveBackHeader
      title="Edit Profile"
      onBackPress={onBackPress}
      scrollable
      loading={user.loading}
      style={{ alignItems: 'center' }}
    >
      <Avatar
        uri={getUserAvatar(editData)}
        editable
        onAvatarPress={handleAvatarPress}
        pressable
      />
      <View style={{ alignSelf: 'stretch' }}>
        {data.map(item => (
          <InputForm
            {...item}
            key={item.key}
            onChangeText={text => handleEditTextInput(item.key, text)}
          />
        ))}
        <CardForm
          data={cardData}
          onChange={(_id, email) =>
            setCardData(cardData =>
              cardData.map(item =>
                item._id === _id ? { ...item, email } : item
              )
            )
          }
          onRemove={_id =>
            setCardData(cardData => cardData.filter(item => item._id !== _id))
          }
          onAddNew={email =>
            setCardData(cardData => [...cardData, { _id: Date.now(), email }])
          }
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button label="LƯU THAY ĐỔI" onPress={onSubmitEditProfile} />
      </View>
    </ViewContainer>
  );
};

export default ProfileDetailScreen;
const styles = StyleSheet.create({
  container: {},
  textContainer: {
    marginTop: scaleVer(12),
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    marginVertical: scaleVer(12),
  },
});

const defaultCardData = [
  {
    email: 'Truongpmse.edu.vn',
    _id: '1',
  },
  {
    email: 'Truongpmse.edu.vn',
    _id: '2',
  },
];

function getUserAvatar(user) {
  if (user.avatar && user.avatar) {
    return user.avatar;
  }
  return DEFAULT_AVATAR;
}
