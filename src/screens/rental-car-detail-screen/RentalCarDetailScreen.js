import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ViewContainer } from 'Components';
import { RentailCarDetailType, NavigationType } from 'types';
import { scaleVer } from 'Constants/dimensions';

type PropsType = {
  rentalDetail: RentailCarDetailType,
  navigation: NavigationType,
};

const RentalCarDetailScreen = ({ rentalDetail, navigation }: PropsType) => {
  const onBackPress = () => {
    navigation.goBack();
  };
  return (
    <ViewContainer haveBack title="" onBackPress={onBackPress}>
      <Image
        source={{
          uri:
            'https://www.kindpng.com/picc/m/184-1840091_mclaren-logo-clipart-png-transparent-png.png',
        }}
        resizeMode="stretch"
        style={styles.imageContainer}
      />
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: scaleVer(250),
    borderRadius: 15,
    margin: 0,
    padding: 0,
  },
});

export default RentalCarDetailScreen;
