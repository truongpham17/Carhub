import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ViewContainer, ListItem, Button } from 'Components';
import { NavigationType, RentDetailType } from 'types';
import { connect } from 'react-redux';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import PriceSelectModal from './PriceSelectModal';

type PropTypes = {
  navigation: NavigationType,
  rentDetail: RentDetailType,
};

const showAttr = [
  { att: 'name', label: 'Name' },
  { att: 'dateOfHire', label: 'Date Of Hire' },
  { att: 'duration', label: 'Duration' },
  { att: 'pricePerDay', label: 'Price Per Day' },
  { att: 'total', label: 'Total' },
  { att: 'store', label: 'Store' },
  { att: 'daysleft', label: 'Days left' },
  { att: 'status', label: 'Status' },
];

const RentHistoryItemDetailScreen = ({ navigation, rentDetail }: PropTypes) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { data } = rentDetail;
  const onBackPress = () => {
    navigation.goBack();
  };

  const handleReturn = () => {};

  const onShowModal = () => {
    setModalVisible(true);
  };

  const onCloseModal = () => {
    setModalVisible(false);
  };

  const handleSubmitSharing = value => {
    console.log(value);
  };

  return (
    <ViewContainer
      haveBackHeader
      title="Detail"
      backAction={onBackPress}
      scrollable
    >
      <Image
        source={{ uri: rentDetail.data.image }}
        style={styles.imageContainer}
        resizeMode="stretch"
      />
      {showAttr.map((item, index) => (
        <ListItem
          key={item.att}
          label={item.label}
          detail={data[item.att]}
          type="detail"
          pressable={false}
          showSeparator={index !== showAttr.length - 1}
        />
      ))}
      <Button label="RETURN" onPress={handleReturn} style={styles.button} />
      <Button
        label="SHARE TO OTHER"
        onPress={onShowModal}
        style={styles.button}
      />
      <PriceSelectModal
        visible={modalVisible}
        onClose={onCloseModal}
        onSubmit={handleSubmitSharing}
      />
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignSelf: 'stretch',
    height: scaleHor(160),
  },
  button: {
    marginVertical: scaleVer(5),
  },
});

export default connect(state => ({
  rentDetail: state.rentDetail,
}))(RentHistoryItemDetailScreen);
