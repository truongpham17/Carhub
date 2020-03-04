import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { dimension, shadowStyle } from 'Constants';
import { textStyle } from 'Constants/textStyles';
import { Error } from 'Assets/svgs';

type PropTypes = {
  errorType: 'server' | 'no-internet' | 'other',
  label: string,
  onErrorPress: () => void,
};

const ErrorFeedback = ({ onErrorPress, label, errorType }: PropTypes) => {
  const animated = useRef(new Animated.Value(0));
  const opacityAnimated = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animated.current, {
        duration: 1000,
        toValue: -80,
      }),
      Animated.timing(opacityAnimated.current, {
        duration: 1000,
        toValue: 1,
      }),
    ]).start(() => {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(animated.current, {
            duration: 1000,
            toValue: 0,
          }),
          Animated.timing(opacityAnimated.current, {
            duration: 400,
            toValue: 0,
          }),
        ]).start();
      }, 5000);
    });
  }, []);
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: animated.current }],
          opacity: opacityAnimated.current,
        },
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Error />

        {/* <View style={styles.icon} /> */}
        <Text
          style={[
            textStyle.bodyText,
            { color: '#333333', marginStart: dimension.DISTANCE_1 },
          ]}
        >
          {label}
        </Text>
      </View>
      <TouchableOpacity onPress={onErrorPress}>
        <Text style={[textStyle.bodyTextBold, styles.errorText]}>
          Try again
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: dimension.DISTANCE_4,
    justifyContent: 'space-between',
    backgroundColor: '#FFEBEC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B51C24',
    position: 'absolute',
    bottom: -60,
    left: dimension.DISTANCE_3,
    right: dimension.DISTANCE_3,
    zIndex: 2,
    ...shadowStyle.ELEVATION_5,
  },
  icon: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginEnd: dimension.DISTANCE_4,
  },
  errorText: { color: '#B51C24', padding: 4, marginEnd: 12 },
});

export default ErrorFeedback;
