import React, { useState } from 'react';
import { Text, Alert, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  ViewContainer,
  InputForm,
  Button,
  DatePicker,
  ProgressStep,
} from 'Components';
import { textStyle, textStyleObject } from 'Constants/textStyles';
import { NavigationType, UserType } from 'types';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import { checkCarModelAvailable, setLeaseInfo } from '@redux/actions/lease';
import moment from 'moment';
import { shadowStyle } from 'Constants';
import colors from 'Constants/colors';
import { setPopUpData } from '@redux/actions';
import { formatDate, substractDate } from 'Utils/date';
import ProgressLeaseStep from '../ProgressLeaseStep';

type PropTypes = () => {
  navigation: NavigationType,
  loading: Boolean,
  infoFromVin: [],
};

const HostHubScreen = ({ loading, navigation, infoFromVin }: PropTypes) => {
  const dispatch = useDispatch();

  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(
    moment(today)
      .add(30, 'day')
      .toDate()
  );
  const [selectedHub, setSelectedHub] = useState('');

  const onPressBack = () => {
    navigation.pop();
  };
  const handleNextStep = () => {
    let a = null;
    // return navigation.navigate('CardSelectScreen');
    if (!selectedHub) {
      a = 'Please choose a hub';
    } else if (startDate >= endDate || substractDate(startDate, endDate) < 3) {
      a = 'The selected date is wrong';
    } else if (formatDate(startDate) < formatDate(Date.now())) {
      a = 'Start date is invalid';
    } else {
      setLeaseInfo(dispatch)({ startDate, endDate, selectedHub });
      navigation.navigate('CardSelectScreen');
    }
    if (a) {
      setPopUpData(dispatch)({
        title: a,
        acceptOnly: true,
      });
    }
  };
  const handleChangeDate = (type, date) => {
    if (type === 'start') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };
  const handleChangeAddress = selectedHub => {
    setSelectedHub(selectedHub);
  };

  return (
    <ViewContainer
      haveBackHeader
      title="Host"
      onBackPress={onPressBack}
      loading={loading}
    >
      <ProgressLeaseStep step={1} />
      <Text style={styles.title}>Input lease information</Text>
      <InputForm
        label="Choose hub (*)"
        placeholder="Choose hub"
        value={selectedHub.address}
        onChangeText={handleChangeAddress}
        containerStyle={{
          marginVertical: scaleVer(32),
        }}
        onTextFocus={() =>
          navigation.navigate('SelectMapScreen', {
            callback(hub) {
              setSelectedHub(hub);
              navigation.pop(1);
            },
            type: 'hub',
          })
        }
      />
      <Text style={styles.label}>Select lease duration</Text>
      <DatePicker
        startDate={startDate}
        endDate={endDate}
        onChangeDate={handleChangeDate}
        showLabel={false}
      />
      <View
        style={{
          flex: 1,
          marginBottom: scaleVer(12),
          justifyContent: 'flex-end',
        }}
      >
        <Button label="Next step" onPress={handleNextStep} />
      </View>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    ...textStyleObject.widgetItem,
    marginTop: scaleVer(16),
  },
  label: {
    ...textStyleObject.label,
    color: colors.dark20,
    marginBottom: scaleVer(4),
  },
});

export default connect(state => ({
  loading: state.lease.loading,
  infoFromVin: state.lease.infoFromVin,
}))(HostHubScreen);
