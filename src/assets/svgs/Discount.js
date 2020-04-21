import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={107} height={106} viewBox="0 0 107 106" fill="none" {...props}>
      <Path
        d="M35.454 34.962l70.689 1.437L36.89 105.65l-1.436-70.689z"
        fill="#DFF5FD"
      />
    </Svg>
  );
}

export default SvgComponent;
