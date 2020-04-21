import React from 'react';
import { Alert, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ViewContainer, Button, ListItem } from 'Components';
import { NavigationType } from 'types';
import { scaleVer } from 'Constants/dimensions';
import { addLease, setPopUpData } from '@redux/actions';
import firebase from 'react-native-firebase';
import 'react-native-get-random-values';
import { getData } from './utils';

type PropTypes = {
  navigation: NavigationType,
};
const HostReviewScreen = ({ navigation }: PropTypes) => {
  const lease = useSelector(state => state.lease);
  const { loading } = lease;
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onPressBack = () => {
    navigation.pop();
  };
  const handleNextStep = async () => {
    addLease(dispatch)(
      { ...lease, customer: user._id, hub: lease.selectedHub._id },
      {
        onSuccess() {
          setPopUpData(dispatch)({
            popupType: 'success',
            title: 'Success',
            description: 'You has been created lease request successfully',
            onConfirm() {
              navigation.navigate('HostScreen');
              navigation.navigate('HistoryScreen');
            },
            modalVisible: true,
            grandResponder: false,
          });
        },
        onFailure() {},
      }
    );
  };
  const leaseContract = getData(lease, user);
  return (
    <ViewContainer
      haveBackHeader
      title="Host"
      onBackPress={onPressBack}
      loading={loading}
    >
      <FlatList
        data={leaseContract}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ListItem
            type="detail"
            label={item.label}
            detail={item.content}
            showSeparator={index !== leaseContract.length - 1}
            key={item.label}
            pressable={false}
          />
        )}
        keyExtractor={item => item.label}
      />

      <Button
        style={{ marginBottom: scaleVer(12) }}
        label="Submit"
        onPress={handleNextStep}
      />
    </ViewContainer>
  );
};

export default HostReviewScreen;
