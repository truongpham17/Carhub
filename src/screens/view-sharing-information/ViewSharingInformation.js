import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ViewContainer, ListItem, DatePicker, Button } from 'Components';
import { NavigationType, SharingType, UserType } from 'types';
import moment from 'moment';
import { scaleVer } from 'Constants/dimensions';
import { Avatar } from 'react-native-elements';
import { connect, useSelector } from 'react-redux';
import { dimension } from 'Constants';
import { subtractDate } from 'Utils/common';
import colors from 'Constants/colors';
import { sendSharingRequest } from '@redux/actions/sharing';
import { textStyle } from 'Constants/textStyles';
import ItemContainer from './ItemContainer';

type PropsType = {
  navigation: NavigationType,
  sendSharingRequest: () => void,
  user: UserType,
};

const ViewSharingInformation = ({
  navigation,
  sendSharingRequest,
  user,
}: PropsType) => {
  const sharingList: [SharingType] = useSelector(state => state.sharing.data);

  const { selectedId } = navigation.state.params;

  const sharingCar = sharingList.find(item => item._id === selectedId) || {};

  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(sharingCar.rental.endDate);

  const today = new Date();

  // const changeSharingCar = sharing => setSharingCar(sharing);

  const startDateFormat = moment(sharingCar.rental.startDate || today).format(
    'D MMMM, YYYY'
  );
  const endDateFormat = moment(sharingCar.rental.endDate || today).format(
    'D MMMM, YYYY'
  );
  const handleChangeDate = (type, date) => {
    // if (date > sharingCar.rental.endDate) {
    //   alert('Please choose date before ', endDateFormat);
    //   return;
    // }
    if (type === 'start') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const handleSendRequest = () => {
    sendSharingRequest(
      { id: sharingCar._id, customer: user._id },
      {
        onSuccess() {
          alert('Your request is sent successfully!');
          navigation.popToTop();
        },
      }
    );
  };

  const daysdiff = Math.abs(subtractDate(startDate, endDate));

  const data = {
    rental: [
      { label: 'Car name', value: sharingCar.rental.carModel.name },
      { label: 'Car type', value: sharingCar.rental.carModel.type },
      { label: 'Seats', value: sharingCar.rental.carModel.numberOfSeat },
      // { label: 'Start Date', value: startDateFormat },
      { label: 'End Date', value: endDateFormat },
      { label: 'Price per day', value: sharingCar.price },
      // { label: 'Total', value: sharingCar.totalCost },
      { label: 'Location', value: sharingCar.address },
      {
        label: 'Car return address',
        value: sharingCar.rental.pickoffHub.address,
      },
      {
        label: 'Sharing owner',
        value: sharingCar.rental.customer.fullName,
        pressable: true,
        onItemPress: () => {
          console.log('move to user profile screen');
        },
      },
    ],
  };

  return (
    <ViewContainer
      haveBackHeader
      title="Sharing Detail"
      scrollable
      isLoading={isLoading}
      onBackPress={() => navigation.pop()}
    >
      <View>
        <ItemContainer title="Car detail">
          <View style={{ alignSelf: 'center', paddingTop: scaleVer(8) }}>
            <Image
              source={{
                uri:
                  sharingCar.rental.carModel.images[0] ||
                  'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
              }}
              resizeMode="stretch"
              width={dimension.SCREEN_WIDTH}
              height={scaleVer(256)}
            />
          </View>
          {data.rental.map((item, index) => (
            <ListItem
              key={index.toString()}
              label={item.label}
              detail={item.value}
              type="detail"
              pressable={item.pressable}
              onItemPress={item.onItemPress}
              showSeparator={index !== data.rental.length - 1}
            />
          ))}
        </ItemContainer>

        <ListItem
          key="dayDiff"
          label="Duration"
          detail={daysdiff}
          type="detail"
          pressable={false}
          showSeparator
        />
        <ListItem
          key="total"
          label="Total"
          detail={daysdiff * sharingCar.price}
          type="detail"
          pressable={false}
        />
        {user._id === sharingCar.rental.customer._id && (
          <Text
            style={[
              textStyle.labelRegular,
              {
                color: colors.error,
                alignSelf: 'center',
                marginBottom: scaleVer(6),
              },
            ]}
          >
            This sharing is yours, so you cannot go to next step
          </Text>
        )}
        <Button
          label="Send request"
          onPress={handleSendRequest}
          colorEnd={colors.primary}
          colorStart={colors.primaryLight}
          style={{ marginBottom: scaleVer(16) }}
          disable={user._id === sharingCar.rental.customer._id}
        />
      </View>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({});

export default connect(
  state => ({
    user: state.user,
  }),
  { sendSharingRequest }
)(ViewSharingInformation);
