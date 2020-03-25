import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import {
  ViewContainer,
  Button,
  ListItem,
  PopupForm,
  ConfirmPopup,
} from 'Components';
import colors from 'Constants/colors';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import { shadowStyle } from 'Constants';
import { connect } from 'react-redux';
import { SharingType, RentalRequestType } from 'types';
import { Avatar } from 'react-native-elements';
import { updateRentalRequest } from '@redux/actions/sharing';
import { textStyle } from 'Constants/textStyles';

type PropsType = {
  navigation: {
    state: {
      params: {
        getRequestListBySharing: (id: any) => void,
      },
    },
    pop: () => void,
  },
  isLoading: Boolean,
  latestSharing: SharingType,
  rentalRequestList: [RentalRequestType],
  updateRentalRequest: () => void,
};

const RentSharingRequestScreen = ({
  navigation,
  isLoading,
  latestSharing,
  rentalRequestList,
  updateRentalRequest,
}: PropsType) => {
  const { getRequestListBySharing } = navigation.state.params;
  const [refresh, setRefresh] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);
  useEffect(() => {
    if (refresh) {
      getRequestListBySharing(latestSharing._id);
    }
    setRefresh(false);
  }, [refresh]);

  // console.log(rentalRequestList);

  // const data = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const onAcceptRequest = id => {
    Alert.alert('Are you sure?', 'This action cannot be undo.', [
      { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      {
        text: 'OK',
        onPress: () => {
          updateRentalRequest(
            { id, status: 'ACCEPTED' },
            {
              onSuccess() {
                setRefresh(true);
              },
              onFailure() {
                alert('Something went wrong!');
              },
            }
          );
        },
      },
    ]);
  };

  const onDeclineRequest = id => {
    Alert.alert('Are you sure?', 'This action cannot be undo.', [
      { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      {
        text: 'OK',
        onPress: () => {
          updateRentalRequest(
            { id, status: 'DECLINED' },
            {
              onSuccess() {
                setRefresh(true);
              },
              onFailure() {
                alert('Something went wrong!');
              },
            }
          );
        },
      },
    ]);
  };

  const onRenderItem = ({ item }: RentalRequestType) => (
    <View style={styles.itemContainer}>
      <View style={styles.infoContainer}>
        <Avatar size="large" source={{ uri: item.customer.avatar }} rounded />
        <ListItem
          key="name"
          label="Name"
          detail={item.customer.fullName}
          type="detail"
          showSeparator
        />
        <ListItem
          key="phone"
          label="Phone"
          detail={item.customer.phone}
          type="detail"
          showSeparator
        />
        <ListItem
          key="email"
          label="Email"
          detail={item.customer.email}
          type="detail"
          showSeparator
        />
        <ListItem
          key="message"
          label="Message"
          detail={item.message || 'No message!'}
          type="detail"
        />
        {item.status !== 'PENDING' && (
          <Text
            style={[
              textStyle.labelRegular,
              {
                alignSelf: 'center',
                marginVertical: scaleVer(6),
                color: colors.error,
              },
            ]}
          >
            {item.status}
          </Text>
        )}
      </View>
      {item.status === 'PENDING' && (
        <View style={styles.buttonContainer}>
          <Button
            label="Accept"
            colorStart={colors.primaryLight}
            colorEnd={colors.primary}
            style={styles.button}
            onPress={() => onAcceptRequest(item._id)}
          />
          <Button
            label="Decline"
            colorStart={colors.errorLight}
            colorEnd={colors.error}
            style={styles.button}
            onPress={() => onDeclineRequest(item._id)}
          />
        </View>
      )}
    </View>
  );
  const onRenderKey = (item, index) => index.toString();
  return (
    <ViewContainer
      title="Rental Request"
      haveBackHeader
      onBackPress={() => navigation.pop()}
      isLoading={isLoading}
    >
      <FlatList
        data={rentalRequestList}
        renderItem={onRenderItem}
        keyExtractor={onRenderKey}
        showsVerticalScrollIndicator={false}
        refreshing={refresh}
        onRefresh={() => setRefresh(true)}
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

export default connect(
  state => ({
    isLoading: state.sharing.isLoading,
    latestSharing: state.sharing.latestSharing,
    rentalRequestList: state.sharing.rentalRequestList,
  }),
  { updateRentalRequest }
)(RentSharingRequestScreen);
