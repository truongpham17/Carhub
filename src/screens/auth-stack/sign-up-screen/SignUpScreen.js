import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { ViewContainer, InputForm, Button } from 'Components';
import { textStyleObject, textStyle } from 'Constants/textStyles';
import { signIn, signUp } from '@redux/actions/user';

import { NavigationType } from 'types';
import { connect, useDispatch } from 'react-redux';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import { appIcon } from 'Assets/images';
import colors from 'Constants/colors';
import { shadowStyle } from 'Constants';

type PropTypes = {
  navigation: NavigationType,
  signIn: ({ username: string, password: string }) => void,
  loading: Boolean,
};

const SignUpScreen = ({ navigation, loading }: PropTypes) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    fullName: '',
    username: '',
    password: '',
    rePassword: '',
  });
  const [error, setError] = useState('');

  const onChangeData = (type, value) => {
    setUserData(data => ({ ...data, [type]: value }));
  };

  const validate = () => {
    const { username, fullName, password, rePassword } = userData;
    if (!username || !fullName || !password || !rePassword) {
      setError('All inputs are required! Please fill all the information');
      return false;
    }
    if (username.length < 6) {
      setError('Account name length must at least 6 characters');
      return false;
    }
    if (password !== rePassword) {
      setError('Passwords are not matched!');
      return false;
    }
    if (password.length < 6) {
      setError('Password length must at least 6 characters');
      return false;
    }
    setError('');
    return true;
  };

  const handleUserLogin = () => {
    const { username, password, fullName } = userData;
    if (!validate()) return;
    signUp(dispatch)(
      {
        username,
        password,
        fullName,
      },
      {
        onSuccess() {
          navigation.navigate('MainApp');
        },
        onFailure() {},
      }
    );
  };

  return (
    <ViewContainer
      style={{ backgroundColor: '#F2F2F2', flex: 1 }}
      safeArea={false}
      loading={loading}
      scrollable
    >
      <Image style={styles.icon} source={appIcon} resizeMode="center" />
      <Text style={styles.title}>Sign up</Text>
      <View style={styles.badge}>
        <InputForm
          label="Name"
          onChangeText={value => onChangeData('fullName', value)}
          value={userData.fullName}
          containerStyle={{ marginBottom: scaleVer(16) }}
          textInputStyle={styles.textInput}
          placeholder="Name"
        />
        <InputForm
          label="Account name"
          onChangeText={value => onChangeData('username', value)}
          value={userData.username}
          containerStyle={{ marginBottom: scaleVer(16) }}
          textInputStyle={styles.textInput}
          placeholder="Account name"
        />
        <InputForm
          label="Password"
          onChangeText={value => onChangeData('password', value)}
          value={userData.password}
          placeholder="Password"
          secureTextEntry
          containerStyle={{ marginBottom: scaleVer(16) }}
          textInputStyle={styles.textInput}
        />
        <InputForm
          label="Re-Password"
          onChangeText={value => onChangeData('rePassword', value)}
          value={userData.rePassword}
          placeholder="Password"
          secureTextEntry
          textInputStyle={styles.textInput}
        />
      </View>
      <Text
        style={[
          textStyle.bodyTextBold,
          { color: colors.error, textAlign: 'center', marginTop: 8 },
        ]}
      >
        {error}
      </Text>
      <Button
        label="Sign up"
        onPress={handleUserLogin}
        containerStyle={{ marginTop: scaleVer(64) }}
      />
      <TouchableOpacity
        style={{ padding: 4 }}
        onPress={() => navigation.navigate('SignInScreen')}
      >
        <Text style={styles.signUpLabel}>Have an account? Login</Text>
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
})(SignUpScreen);
