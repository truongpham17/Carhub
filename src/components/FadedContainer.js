import React, { useEffect, useState, useRef } from 'react';
import { Animated, StyleProp, ViewStyle, StyleSheet } from 'react-native';

type PropTypes = {
  containerStyle: StyleProp<ViewStyle>,
  duration?: number,
  visible: boolean,
  children: React.ReactNode,
};

const FadedContainer = ({
  containerStyle,
  duration = 300,
  visible = false,
  children,
}: PropTypes) => {
  const [expose, setExpose] = useState(!visible);
  const animated = useRef(new Animated.Value(0));

  const show = () => {
    Animated.timing(animated.current, {
      duration,
      toValue: 1,
    }).start();
  };

  const hide = () => {
    Animated.timing(animated.current, {
      duration,
      toValue: 0,
    }).start(() => setExpose(true));
  };

  useEffect(() => {
    if (visible) {
      show();
      if (expose) {
        setExpose(false);
      }
    } else {
      hide();
    }
  }, [visible]);
  return (
    !expose && (
      <Animated.View
        style={[
          styles.containerStyle,
          containerStyle,
          {
            opacity: animated.current,
          },
        ]}
      >
        {children}
      </Animated.View>
    )
  );
};

export default FadedContainer;

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});
