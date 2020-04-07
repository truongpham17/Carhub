import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ViewContainer, alert } from 'Components';
import colors from 'Constants/colors';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import {
  getRentalRequestBySharing,
  updateRentalRequest,
} from '@redux/actions/sharing';
import { shadowStyle } from 'Constants';
import { connect, useDispatch, useSelector } from 'react-redux';
import { SharingType, RentalRequestType, NavigationType } from 'types';
import { Avatar } from 'react-native-elements';

import { textStyle } from 'Constants/textStyles';
import SharingRequestItem from './SharingRequestItem';

type PropsType = {
  navigation: NavigationType,
  isLoading: Boolean,
  rentalRequestList: [RentalRequestType],
  updateRentalRequest: () => void,
};

const RentSharingRequestScreen = ({
  navigation,
  updateRentalRequest,
}: PropsType) => {
  const [refresh, setRefresh] = useState(false);
  const isLoading = useSelector(state => state.sharing.isLoading);
  const requestList = useSelector(state => state.sharing.rentalRequestList);

  const lastedSharingId = useSelector(
    state => state.sharing.lastestSharing._id
  );

  // for notification
  const { selectedId } = navigation.state.params;

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedId) {
      getRentalRequestBySharing(dispatch)(selectedId);
    } else {
      getRentalRequestBySharing(dispatch)(lastedSharingId);
    }
  }, []);

  // console.log(rentalRequestList);

  // const data = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const onAcceptRequest = id => {
    const isAlreadyAccepted = requestList.findIndex(
      item => item.status === 'ACCEPTED'
    );
    // if (isAlreadyAccepted !== -1) {
    //   alert({
    //     label: 'Action denied',
    //     detail: 'You can only accept one request',
    //   });
    //   return;
    // }

    alert({
      label: 'Accept this rent request?',
      detail: 'Are you sure to accept this rent request.',
      onConfirm() {
        updateRentalRequest(
          { id, status: 'ACCEPTED' },
          {
            onSuccess() {
              onRefresh();
            },
            onFailure() {
              alert({ label: 'Something went wrong!' });
            },
          }
        );
      },
    });
  };

  const onRefresh = () => {
    setRefresh(true);
    getRentalRequestBySharing(dispatch)(lastedSharingId, {
      onSuccess() {
        setRefresh(false);
      },
      onFailure() {
        setRefresh(false);
      },
    });
  };

  const renderItem = ({ item }) => (
    <SharingRequestItem
      data={item}
      onAcceptRequest={onAcceptRequest}
      onConfirm={() => navigation.navigate('ScanScreen')}
    />
  );

  const keyExtractor = (item, index) => index.toString();

  return (
    <ViewContainer
      title="Rental Request"
      haveBackHeader
      onBackPress={() => navigation.pop()}
      isLoading={isLoading}
    >
      <FlatList
        refreshing={refresh}
        onRefresh={onRefresh}
        data={requestList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
      />
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: scaleVer(8),
    ...shadowStyle.ELEVATION_3,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: colors.dark90,
    paddingHorizontal: scaleHor(12),
    paddingVertical: scaleVer(16),
    backgroundColor: colors.white,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: scaleVer(12),
  },
  button: {
    paddingHorizontal: scaleHor(24),
  },
  infoContainer: {
    alignItems: 'center',
    marginVertical: scaleVer(12),
  },
});

export default connect(state => ({}), { updateRentalRequest })(
  RentSharingRequestScreen
);
