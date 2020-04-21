import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ViewContainer, TabScreen } from 'Components';

import { useDispatch, useSelector } from 'react-redux';

import { NavigationType, SharingType } from 'types';
import { getLastestSharingByRental } from '@redux/actions';
import Information from './Information';
import ListRequest from './list-request/ListRequest';

type PropTypes = {
  navigation: NavigationType,
};

const SharingInformationScreen = ({ navigation }: PropTypes) => {
  const dispatch = useDispatch();
  const rentDetail = useSelector(state =>
    state.rental.data.rentals.find(item => item._id === state.rental.selectedId)
  );

  const newId = navigation.state?.params?.newId;

  const sharingInformation: SharingType = useSelector(
    state => state.sharing.lastestSharing
  );
  const loading = useSelector(state => state.sharing.loading);
  console.log(loading);

  useEffect(() => {
    getLastestSharingByRental(dispatch)(rentDetail._id);
  }, []);

  const onBackPress = () => {
    navigation.pop();
  };

  return (
    <ViewContainer
      haveBackHeader
      title="Sharing detail"
      onBackPress={onBackPress}
      loading={loading}
    >
      <TabScreen
        screens={[
          <Information navigation={navigation} />,
          <ListRequest newId={newId} navigation={navigation} />,
        ]}
        labels={['Information', 'Request list']}
        dots={newId ? [false, true] : [false, false]}
      />
    </ViewContainer>
  );
};

export default SharingInformationScreen;
const styles = StyleSheet.create({});
