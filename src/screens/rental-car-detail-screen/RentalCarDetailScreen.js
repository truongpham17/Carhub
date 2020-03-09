import React, { useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ViewContainer, Button } from 'Components';
import { RentailCarDetailType, NavigationType } from 'types';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import { textStyle } from 'Constants/textStyles';
import { dimension } from 'Constants';
import Header from './Header';
import ImageSlider from './ImageSlider';
import Item from './Item';
import Liberty from './Liberty';
import Description from './Description';

type PropsType = {
  rentalDetail: RentailCarDetailType,
  navigation: NavigationType,
};

const RentalCarDetailScreen = ({ rentalDetail, navigation }: PropsType) => {
  const onBackPress = () => {
    navigation.goBack();
  };

  const handleChangeTripDate = () => {};
  const handleShowPickupLoc = () => {};
  const handleShowReturnLoc = () => {};

  const goToCheckOut = () => {};
  return (
    <ViewContainer onBackPress={onBackPress} scrollable safeArea={false}>
      <ImageSlider />
      <Header />
      <Item
        title="Trip dates"
        data={[
          { value: '12 Aug 2020, 10:00 AM' },
          { value: '15 Aug 2020, 10:00 AM' },
        ]}
      />

      <Item
        title="PICK UP LOCATION"
        data={[{ value: 'Ho Chi Minh, District 1, 16 Nam Ky Khoi Nghia' }]}
        showAction
        actionLabel="SHOW"
        onActionPress={() => {}}
      />
      <Item
        title="PICK UP LOCATION"
        data={[{ value: 'Ho Chi Minh, District 1, 16 Nam Ky Khoi Nghia' }]}
        showAction
        actionLabel="SHOW"
        onActionPress={() => {}}
      />

      <Item
        title="Cancellation policy"
        data={[
          { value: 'Free cancellation', style: textStyle.bodyTextBold },
          { value: 'Full refund before 18 Feb, 10:00 AM' },
        ]}
      />
      <Liberty
        data={[
          { icon: { name: 'users' }, value: '4 seats' },
          { icon: { name: 'briefcase' }, value: '6 bags' },
          { icon: { name: 'filter' }, value: 'Gas' },
          { icon: { name: 'radio' }, value: 'Automatic' },
        ]}
      />

      <Description description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consequat metus in nibh ultricies laoreet. Aenean ac nibh quis urna laoreet tempus. Aliquam pharetra felis leo, at faucibus erat malesuada ut. Ut aliquam lectus in porttitor imperdiet. Maecenas eu porttitor libero. Donec non suscipit nulla. Aenean vitae nisi eu urna dignissim mattis. Maecenas semper facilisis cursus. Etiam lorem mi, venenatis ut leo et, commodo gravida magna." />

      <View style={styles.buttonContainer}>
        <Button label="GO TO CHECKOUT" onPress={goToCheckOut} />
      </View>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: scaleVer(250),
    borderRadius: 8,
    marginBottom: scaleVer(20),
    width: dimension.SCREEN_WIDTH,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: scaleVer(5),
  },
  dateItem: {
    flex: 1,
    justifyContent: 'center',
  },
  libertyItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
  },
  libertyContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginVertical: scaleVer(28),
  },
});

export default RentalCarDetailScreen;
