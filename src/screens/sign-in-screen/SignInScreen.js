import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ViewContainer, InputForm, Button } from 'Components';
import { textStyle } from 'Constants/textStyles';
import { signIn } from '@redux/actions/user';

import { NavigationType } from 'types';
import { connect } from 'react-redux';

type PropTypes = {
  navigation: NavigationType,
  signIn: ({ username: string, password: string }) => void,
  loading: Boolean,
};

const SignInScreen = ({ navigation, loading, signIn }: PropTypes) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChangeUserName = username => {
    setUsername(username);
  };

  const onChangePassword = password => {
    setPassword(password);
  };

  const handleUserLogin = () => {
    console.log('come here');
    signIn(
      { username, password },
      {
        onSuccess() {
          navigation.navigate('MainApp');
        },
        onFailure() {
          setError(true);
        },
      }
    );
  };

  return (
    <ViewContainer loading={loading} requestError={error}>
      <Text style={textStyle.sectionHeading}>Sign in</Text>
      <InputForm
        label="Username"
        onChangeText={onChangeUserName}
        value={username}
      />
      <InputForm
        label="Password"
        onChangeText={onChangePassword}
        value={password}
      />

      <Button label="Sign in" onPress={handleUserLogin} />
    </ViewContainer>
  );
};

export default connect(state => ({ loading: state.user.loading }), {
  signIn,
})(SignInScreen);
