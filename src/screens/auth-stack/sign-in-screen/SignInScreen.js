import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { ViewContainer, InputForm, Button, ProgressStep } from 'Components';
import { textStyle, textStyleObject } from 'Constants/textStyles';
import { signIn, updateUser } from '@redux/actions/user';

import { NavigationType } from 'types';
import { connect, useDispatch } from 'react-redux';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import { changeTransactionStatus } from 'Utils/database';
import { appIcon } from 'Assets/images';
import colors from 'Constants/colors';
import { shadowStyle } from 'Constants';
import { setPopUpData } from '@redux/actions';

type PropTypes = {
  navigation: NavigationType,
  signIn: ({ username: string, password: string }) => void,
  loading: Boolean,
};

const SignInScreen = ({ navigation, loading, signIn }: PropTypes) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onChangeUserName = username => {
    setUsername(username);
  };

  const onChangePassword = password => {
    setPassword(password);
  };

  const handleUserLogin = () => {
    // console.log('come here');
    signIn(
      { username, password },
      // { username: 'customer1', password: '123456' },
      {
        onSuccess() {
          navigation.navigate('MainApp');
        },
        onFailure() {
          setPopUpData(dispatch)({
            popupType: 'error',
            title: 'Fail to login',
            description: 'Wrong user name or password!',
          });
        },
      }
    );
  };

  return (
    <ViewContainer
      style={{ backgroundColor: '#F2F2F2' }}
      safeArea={false}
      // loading={loading}
    >
      <Image style={styles.icon} source={appIcon} resizeMode="center" />
      {/* <View style={{ flex: 1 }}> */}
      <Text style={styles.title}>Sign in</Text>
      <View style={styles.badge}>
        <InputForm
          label="Username"
          onChangeText={onChangeUserName}
          value={username}
          containerStyle={{ marginBottom: scaleVer(16) }}
          textInputStyle={styles.textInput}
          placeholder="Username"
        />
        <InputForm
          label="Password"
          onChangeText={onChangePassword}
          value={password}
          placeholder="Password"
          secureTextEntry
          textInputStyle={styles.textInput}
        />
      </View>

      <Button
        label="Sign in"
        onPress={handleUserLogin}
        containerStyle={{ marginTop: scaleVer(64) }}
      />
      <TouchableOpacity
        style={{ padding: 4 }}
        onPress={() => navigation.navigate('SignUpScreen')}
      >
        <Text style={styles.signUpLabel}>Create new account</Text>
      </TouchableOpacity>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: scaleHor(60),
    height: scaleHor(60),
    alignSelf: 'center',
    marginTop: scaleVer(48),
  },
  badge: {
    backgroundColor: colors.white,
    ...shadowStyle.ELEVATION_3,
    padding: 16,
    borderRadius: 8,
    marginTop: scaleVer(32),
  },
  textInput: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: colors.dark80,
  },
  title: {
    ...textStyleObject.sectionHeadingBold,
    marginBottom: scaleVer(24),
    color: colors.primary,
    textAlign: 'center',
  },
  signUpLabel: {
    ...textStyleObject.bodyText,
    marginTop: scaleVer(12),
    textAlign: 'center',
    color: colors.primary,
  },
});

export default connect(state => ({ loading: state.user.loading }), {
  signIn,
})(SignInScreen);
