import React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={12} height={8} viewBox="0 0 12 8" fill="none" {...props}>
      <Path
        d="M10.594.578L12 1.984l-6 6-6-6L1.406.578 6 5.172 10.594.578z"
        fill="#9A9FA3"
      />
    </Svg>
  );
}

export default SvgComponent;
