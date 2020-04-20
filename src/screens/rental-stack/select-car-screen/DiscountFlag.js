import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';
import { scaleHor } from 'Constants/dimensions';

const dimension = scaleHor(72);

type PropTypes = {
  discount: number,
};
const DiscountFlag = ({ discount }: PropTypes) => {
  console.log('discount:', discount);
  return (
    <View style={styles.off}>
      <Animated.View
        style={{
          width: 2 * dimension,
          height: 2 * dimension,
          backgroundColor: '#DFF5FD',
          transform: [{ rotate: '45deg' }],
          position: 'absolute',
          left: -dimension,
          top: -dimension,
          zIndex: 2,
        }}
      ></Animated.View>
      <Animated.Text style={styles.text}>
        -{Math.round(discount * 100)}% OFF
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  off: {
    position: 'absolute',
    left: 0,
    top: 0,
    // position: 'absolute',
    // left: -dimension,
    // top: -dimension,
  },
  text: {
    ...textStyle.bodyTextBold,
    color: colors.error,
    marginTop: scaleHor(32),
    marginStart: scaleHor(8),

    transform: [{ rotate: '-45deg' }],
    zIndex: 3,
  },
});

export default DiscountFlag;
