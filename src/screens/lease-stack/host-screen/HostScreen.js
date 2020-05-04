import React, { useState, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  View,
} from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux';
import {
  ViewContainer,
  InputForm,
  Button,
  ImageSelector,
  ProgressStep,
} from 'Components';
import { textStyle, textStyleObject } from 'Constants/textStyles';
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
import VinExplainModal from './VinExplainModal';
import ProgressLeaseStep from '../ProgressLeaseStep';

const clarifai = new Clarifai.App({
  apiKey: CLARIFY_KEY,
});

process.nextTick = setImmediate;

type PropTypes = {
  navigation: NavigationType,
};

const HostScreen = ({ navigation }: PropTypes) => {
  const [loadingRecognize, setLoading] = useState(false);
  const [VINExplainVisible, setVINExplainVisible] = useState(false);
  const {
    loading,
    vin,
    usingYears,
    odometer,
    images,
    licensePlates,
  } = useSelector(state => state.lease);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const base64Refs = useRef([]);

  const predict = async image => {
    const predictions = await clarifai.models.predict(Clarifai.GENERAL_MODEL, {
      base64: image,
    });
    return predictions;
  };

  const handleChangeValue = (value, type) => {
    setLeaseInfo(dispatch)({ [type]: value });
  };

  const handleAddImage = () => {
    selectImage(async image => {
      setLeaseInfo(dispatch)({
        images: [...images, { uri: image.uri, key: image.key }],
      });
      base64Refs.current.push({ data: image.data, key: image.key });
    });
  };

  const handleRemoveImage = key => {
    setLeaseInfo(dispatch)({
      images: images.filter(image => image.key !== key),
    });
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
    } else if (!licensePlates) {
      Alert.alert('Please input license plates!');
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
    setTimeout(() => {
      setLoading(false);
    }, 100);

    if (errors.length > 0) {
      setPopUpData(dispatch)({
        popupType: 'error',
        title: 'Cannot recognize your car',
        description:
          'It seem like you choose the wrong images of your car, we can not recognize them, please try again!',
      });
    } else {
      handleNextStep();
    }
  };

  const handleNextStep = () => {
    if (!validateData()) return;
    checkCarByVin(dispatch)(
      {
        vin,
        usingYears,
        odometer,
        images,
      },
      {
        onSuccess: () => navigation.navigate('HostHubScreen'),
        onFailure: isVINError => {
          if (isVINError) {
            setPopUpData(dispatch)({
              popupType: 'error',
              title: 'VIN is not valid',
              description: 'Your VIN code maybe wrong. Please try again',
            });
          } else {
            setPopUpData(dispatch)({
              popupType: 'confirm',
              title: 'Car model not support',
              description:
                'Sorry, this car model currently not support in our system. Please contact us if you need help',
            });
          }
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

  const handleScan = type => {
    navigation.navigate('HostScanCameraScreen', { type });
  };

  return (
    <ViewContainer
      scrollable
      haveBackHeader
      title="Host"
      onBackPress={onPressBack}
      loading={loading || loadingRecognize}
    >
      <ProgressLeaseStep step={0} />
      <Text style={styles.title}>Input car information</Text>
      <InputForm
        icon={{ name: 'camera', type: 'feather' }}
        label="VIN (*)"
        value={vin}
        onIconPress={() => handleScan('vin')}
        onChangeText={text => handleChangeValue(text, 'vin')}
        placeholder="Type VIN"
        containerStyle={styles.input}
      />
      <Text
        style={{ textAlign: 'right' }}
        onPress={() => setVINExplainVisible(true)}
      >
        What is VIN?
      </Text>
      <InputForm
        // icon={{ name: 'camera', type: 'feather' }}
        label="License plates (*)"
        icon={{ name: 'camera', type: 'feather' }}
        value={licensePlates}
        onIconPress={() => handleScan('licensePlates')}
        onChangeText={text => handleChangeValue(text, 'licensePlates')}
        placeholder="Type License plates"
        containerStyle={styles.input}
      />
      <InputForm
        label="Using years (*)"
        value={usingYears}
        onChangeText={text => handleChangeValue(text, 'usingYears')}
        placeholder="Type using years..."
        containerStyle={styles.input}
        keyboardType="numeric"
      />
      <InputForm
        label="Odometers (*)"
        value={odometer}
        onChangeText={text => handleChangeValue(text, 'odometer')}
        placeholder="Type odometer..."
        containerStyle={styles.input}
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

      <View
        style={{
          flex: 1,
          marginBottom: scaleVer(12),
          justifyContent: 'flex-end',
        }}
      >
        <Button label="Next step" onPress={handleNextStep} />
      </View>
      <VinExplainModal
        modalVisible={VINExplainVisible}
        onClose={() => setVINExplainVisible(false)}
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
  title: {
    textAlign: 'center',
    ...textStyleObject.widgetItem,
    marginTop: scaleVer(16),
  },
  input: { marginVertical: scaleVer(8) },
});

export default connect(state => ({}))(HostScreen);
