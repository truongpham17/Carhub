import React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent({ fill, ...props }) {
  return (
    <Svg width={8} height={12} viewBox="0 0 8 12" fill="none" {...props}>
      <Path
        d="M6.531 12L8 10.59 3.23 6 8 1.41 6.531 0 .281 6l6.25 6z"
        fill={fill}
      />
    </Svg>
  );
}

export default SvgComponent;
