import React, { useEffect, useState, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { ViewContainer, InputForm, Button, ImageSelector } from 'Components';
import { textStyle } from 'Constants/textStyles';
import { NavigationType, UserType } from 'types';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { shadowStyle } from 'Constants';
import colors from 'Constants/colors';
import {
  checkCarByVin,
  getCustomerPreviousCarList,
  setValue,
} from '@redux/actions/lease';
import { selectImage } from 'Utils/images';
import Clarifai from 'clarifai';
import { CLARIFY_KEY } from 'Constants/key';
import Seperator from './Seperator';

const clarifai = new Clarifai.App({
  apiKey: CLARIFY_KEY,
});

process.nextTick = setImmediate;

type PropTypes = {
  checkCarByVin: () => void,
  getCustomerPreviousCarList: () => void,
  setValue: () => void,
  navigation: NavigationType,
  loading: Boolean,
  user: UserType,
  vin: String,
  usingYears: String,
  odometers: String,
};

const HostScreen = ({
  checkCarByVin,
  navigation,
  loading,
  user,
  vin,
  usingYears,
  odometers,
  getCustomerPreviousCarList,
  setValue,
}: PropTypes) => {
  console.log({ vin, usingYears, odometers });
  const [images, setImages] = useState(['']);
  const [loadingRecognize, setLoading] = useState(false);
  const base64Refs = useRef([]);

  const predict = async image => {
    const predictions = await clarifai.models.predict(Clarifai.GENERAL_MODEL, {
      base64: image,
    });
    return predictions;
  };

  const handleChangeVin = vin => {
    setValue({ vin });
  };
  const handleChangeUsingYears = usingYears => {
    setValue({ usingYears });
  };
  const handleChangeOdometers = odometers => {
    setValue({ odometers });
  };
  const handleAddImage = () => {
    selectImage(async image => {
      setImages(images => [...images, { uri: image.uri, key: image.key }]);
      base64Refs.current.push({ data: image.data, key: image.key });
      // console.log('start analyze data');
      // const result = await predict(image.data);
      // console.log(result);
    });
  };

  const handleRemoveImage = key => {
    setImages(images => images.filter(image => image.key !== key));
    base64Refs.current = base64Refs.current.filter(image => image.key !== key);
  };

  const onPressBack = () => {
    navigation.pop();
  };

  const handleTestImage = async () => {
    setLoading(true);
    const errors = [];
    console.log(base64Refs);
    const predictions = await Promise.all(
      base64Refs.current.map(base64 => predict(base64.data))
    );

    predictions.forEach((prediction, index) => {
      const { concepts } = prediction.outputs[0].data;
      let isValidate = false;
      for (let i = 0; i < concepts.length; i++) {
        if (
          concepts[i].name.includes('car') ||
          concepts[i].name.includes('vehicle')
        ) {
          isValidate = true;
          break;
        }
      }
      if (!isValidate) {
        errors.push(index);
      }
    });

    setLoading(false);

    if (errors.length > 0) {
      setTimeout(() => {
        Alert.alert(
          'Cannot recognize your car',
          'It seem like you choose the wrong images of your car, we can not recognize them, please try again!'
        );
      }, 300);
    } else {
      handleNextStep();
    }
  };

  const handleNextStep = () => {
    checkCarByVin(
      {
        vin,
        usingYears,
        odometers,
        images: images.filter((_, i) => i > 0),
      },
      {
        onSuccess: () => navigation.navigate('HostHubScreen'),
        onFailure: () => {
          Alert.alert(
            'Car is not found',
            'Your VIN code maybe wrong. Please input again',
            [{ text: 'OK', onPress: () => console.log('OK') }],
            { cancelable: false }
          );
          console.log('error');
        },
      }
    );
  };
  const handlePreviousCar = () => {
    getCustomerPreviousCarList(
      { id: user._id },
      {
        onSuccess: () => navigation.navigate('HostListCarScreen'),
        onFailure: () => {
          console.log('error');
        },
      }
    );
  };
  const handleScan = () => {
    navigation.navigate('HostScanCameraScreen');
  };
  return (
    <ViewContainer
      scrollable
      haveBackHeader
      title="Host"
      onBackPress={onPressBack}
      loading={loading || loadingRecognize}
    >
      <TouchableOpacity style={styles.container} onPress={handleScan}>
        <Text style={textStyle.bodyTextBold}> Scan VIN Code </Text>
      </TouchableOpacity>
      <Seperator />
      <InputForm
        label="VIN"
        value={vin}
        onChangeText={handleChangeVin}
        placeholder="Type VIN..."
        containerStyle={{ marginVertical: scaleVer(16) }}
      />
      <InputForm
        label="Using years"
        value={usingYears}
        onChangeText={handleChangeUsingYears}
        placeholder="Type using years..."
        containerStyle={{ marginVertical: scaleVer(16) }}
      />
      <InputForm
        label="Odometers"
        value={odometers}
        onChangeText={handleChangeOdometers}
        placeholder="Type odometers..."
        containerStyle={{ marginVertical: scaleVer(16) }}
      />
      <ScrollView horizontal>
        {images.map((item, index) => (
          <ImageSelector
            data={item}
            onAddPress={handleAddImage}
            onRemovePress={handleRemoveImage}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={{ alignSelf: 'flex-end', marginBottom: scaleVer(16) }}
        onPress={handlePreviousCar}
      >
        <Text style={[textStyle.bodyTextBold, { color: colors.successLight }]}>
          Choose your previous car >>
        </Text>
      </TouchableOpacity>
      <Button
        style={{ marginVertical: scaleVer(32) }}
        label="Next step"
        onPress={handleTestImage}
      />
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scaleHor(64),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadowStyle.ELEVATION_3,
    backgroundColor: colors.white,
    marginVertical: scaleVer(15),
  },
});

export default connect(
  state => ({
    loading: state.lease.loading,
    user: state.user,
    vin: state.lease.vin,
    usingYears: state.lease.usingYears,
    odometers: state.lease.odometers,
  }),
  { checkCarByVin, getCustomerPreviousCarList, setValue }
)(HostScreen);
