import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ViewContainer, InputForm, Button, ProgressStep } from 'Components';
import { textStyle } from 'Constants/textStyles';
import { signIn } from '@redux/actions/user';

import { NavigationType } from 'types';
import { connect } from 'react-redux';
import { scaleVer } from 'Constants/dimensions';
import Axios from 'axios';

type PropTypes = {
  navigation: NavigationType,
  signIn: ({ username: string, password: string }) => void,
  loading: Boolean,
};

const SignInScreen = ({ navigation, loading, signIn }: PropTypes) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const result = await Axios({
      url: `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/1GNALDEK9FZ108495?format=json`,
    });

    console.log(result.data);
    const valueData = [];
    const codes = [24, 26, 27, 28, 29, 39, 75];

    codes.forEach(code => {
      const item = result.data.Results.find(data => data.VariableId === code);
      if (item) {
        valueData.push({ key: item.Variable, value: item.Value });
      }
    });

    console.log(valueData);
  };

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
      {/* <View style={{ flex: 1 }}> */}
      <Text
        style={[
          textStyle.sectionHeading,
          { textAlign: 'center', marginBottom: scaleVer(48) },
        ]}
      >
        Sign in
      </Text>
      <InputForm
        label="Username"
        onChangeText={onChangeUserName}
        value={username}
        containerStyle={{ marginBottom: scaleVer(16) }}
      />
      <InputForm
        label="Password"
        onChangeText={onChangePassword}
        value={password}
      />
      {/* </View> */}

      <Button
        label="Sign in"
        onPress={handleUserLogin}
        style={{ marginTop: scaleVer(32) }}
      />
    </ViewContainer>
  );
};

export default connect(state => ({ loading: state.user.loading }), {
  signIn,
})(SignInScreen);
