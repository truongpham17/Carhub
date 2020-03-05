import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { ViewContainer, Button } from 'Components';
import { RentailCarDetailType, NavigationType } from 'types';
import { scaleVer } from 'Constants/dimensions';
import { textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';
import Separator from 'Components/Separator';
import FilterCarModal from '../select-car-screen/FilterCarModal';
import AddressInformation from './AddressInformation';
import InformationCard from './InformationCard';

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
    <ViewContainer title="" onBackPress={onBackPress} scrollable>
      <Image
        source={{
          uri:
            'https://www.kindpng.com/picc/m/184-1840091_mclaren-logo-clipart-png-transparent-png.png',
        }}
        resizeMode="stretch"
        style={styles.imageContainer}
      />
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <View>
            <Text style={textStyle.widgetItem}>Audi V4</Text>
            <Text style={[textStyle.label, { color: colors.dark40 }]}>
              Exclusive Car
            </Text>
          </View>
          <View>
            <Text style={textStyle.widgetItem}>50$/day</Text>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <Text>
            <Text style={textStyle.bodyTextBold}>4.95 stars</Text> (46 trips)
          </Text>
          <Text>
            Total: <Text style={textStyle.widgetItem}>500$</Text>
          </Text>
        </View>
        <Separator />
      </View>

      <InformationCard title="Trip dates" showSeparator>
        <View
          style={[styles.itemContainer, { justifyContent: 'space-around' }]}
        >
          <View style={[styles.dateItem, { alignItems: 'flex-start' }]}>
            <Text style={[textStyle.bodyText, { marginBottom: scaleVer(5) }]}>
              Wed 19 Feb, 10:00
            </Text>
            <Text style={textStyle.bodyText}>Wed 29 Feb, 10:00</Text>
          </View>
          <View style={[styles.dateItem, { alignItems: 'flex-end' }]}>
            <TouchableOpacity onPress={handleChangeTripDate}>
              <Text
                style={[
                  textStyle.bodyTextBold,
                  { color: colors.success, justifyContent: 'center' },
                ]}
              >
                CHANGE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </InformationCard>

      <AddressInformation
        title="PICKUP LOCATION"
        buttonTitle="SHOW"
        onPress={handleShowPickupLoc}
        text="Nha cua Truong"
      />

      <AddressInformation
        title="RETURN LOCATION"
        buttonTitle="SHOW"
        text="Nha cua Tri"
        onPress={handleShowReturnLoc}
      />

      <InformationCard title="Cancellation policy" showSeparator>
        <View>
          <Text style={textStyle.bodyTextBold}>Free cancellation</Text>
          <Text style={{ marginTop: scaleVer(8) }}>
            Full refund before Jan 1, 2020
          </Text>
        </View>
      </InformationCard>

      <InformationCard title="Liberty mutial" showSeparator>
        <View style={styles.libertyContainer}>
          <View style={styles.libertyItem}>
            <Text>4 seats</Text>
          </View>
          <View style={styles.libertyItem}>
            <Text>4 seats</Text>
          </View>
          <View style={styles.libertyItem}>
            <Text>4 seats</Text>
          </View>
          <View style={styles.libertyItem}>
            <Text>4 seats</Text>
          </View>
        </View>
      </InformationCard>

      <InformationCard title="Description">
        <Text>ABC XYZ</Text>
      </InformationCard>
      <View style={styles.buttonContainer}>
        <Button label="GO TO CHECKOUT" onPress={goToCheckOut} />
      </View>
      <FilterCarModal />
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: scaleVer(250),
    borderRadius: 15,
    marginBottom: scaleVer(20),
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
