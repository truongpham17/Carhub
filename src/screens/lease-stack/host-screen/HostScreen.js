import React, { useState, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux';
import { ViewContainer, InputForm, Button, ImageSelector } from 'Components';
import { textStyle } from 'Constants/textStyles';
import { NavigationType, UserType } from 'types';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { shadowStyle } from 'Constants';
import colors from 'Constants/colors';
import {
  checkCarByVin,
  getCustomerPreviousCarList,
  setLeaseInfo,
} from '@redux/actions/lease';
import { selectImage } from 'Utils/images';
import Clarifai from 'clarifai';
import { CLARIFY_KEY } from 'Constants/key';
import { setPopUpData } from '@redux/actions';
import Seperator from './Seperator';

const clarifai = new Clarifai.App({
  apiKey: CLARIFY_KEY,
});

process.nextTick = setImmediate;

type PropTypes = {
  navigation: NavigationType,
  loading: Boolean,
  user: UserType,
  vin: String,
  usingYears: String,
  odometer: String,
  images: [],
};

const HostScreen = ({
  navigation,
  loading,
  user,
  vin,
  usingYears,
  odometer,
  images,
}: PropTypes) => {
  const [loadingRecognize, setLoading] = useState(false);
  const dispatch = useDispatch();
  const base64Refs = useRef([]);

  const predict = async image => {
    const predictions = await clarifai.models.predict(Clarifai.GENERAL_MODEL, {
      base64: image,
    });
    return predictions;
  };

  const handleChangeVin = vin => {
    setLeaseInfo(dispatch)({ vin });
  };
  const handleChangeUsingYears = usingYears => {
    setLeaseInfo(dispatch)({ usingYears });
  };
  const handleChangeOdometers = odometer => {
    setLeaseInfo(dispatch)({ odometer });
  };
  const handleAddImage = () => {
    selectImage(async image => {
      setLeaseInfo(dispatch)({
        images: [...images, { uri: image.uri, key: image.key }],
      });
      // setImages(images => [...images, { uri: image.uri, key: image.key }]);
      base64Refs.current.push({ data: image.data, key: image.key });
      // console.log('start analyze data');
      // const result = await predict(image.data);
      // console.log(result);
    });
  };

  const handleRemoveImage = key => {
    setLeaseInfo(dispatch)({
      images: images.filter(image => image.key !== key),
    });
    // setImages(images => images.filter(image => image.key !== key));
    base64Refs.current = base64Refs.current.filter(image => image.key !== key);
  };

  const onPressBack = () => {
    navigation.pop();
  };

  const validateData = () => {
    if (images.length === 1) {
      Alert.alert('Please add your car images');
    } else if (!vin) {
      Alert.alert('Please input VIN');
    } else if (isNaN(usingYears) || !usingYears) {
      Alert.alert('Please input using year', 'Using years must be a number');
    } else if (isNaN(odometer) || !odometer) {
      Alert.alert('Please input odometer', 'Odometers must be a number');
    } else {
      return true;
    }
  };

  const handleTestImage = async () => {
    if (!validateData()) return;

    setLoading(true);
    const errors = [];
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
      setPopUpData(dispatch)({
        popupType: 'error',
        title: 'Cannot recognize your car',
        description:
          'It seem like you choose the wrong images of your car, we can not recognize them, please try again!',
        modalVisible: true,
      });
    } else {
      handleNextStep();
    }
  };

  const handleNextStep = () => {
    checkCarByVin(dispatch)(
      {
        vin,
        usingYears,
        odometer,
        images,
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
    getCustomerPreviousCarList(dispatch)(
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
        keyboardType="numeric"
      />
      <InputForm
        label="Odometers"
        value={odometer}
        onChangeText={handleChangeOdometers}
        placeholder="Type odometer..."
        containerStyle={{ marginVertical: scaleVer(16) }}
        keyboardType="numeric"
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

export default connect(state => ({
  loading: state.lease.loading,
  user: state.user,
  vin: state.lease.vin,
  usingYears: state.lease.usingYears,
  odometer: state.lease.odometer,
  images: state.lease.images,
}))(HostScreen);
