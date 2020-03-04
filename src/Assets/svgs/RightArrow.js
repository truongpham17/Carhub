import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={34} height={8} viewBox="0 0 34 8" fill="none" {...props}>
      <Path d="M24.954 3H.116v2h24.838v3l8.251-4-8.251-4v3z" fill="#333" />
    </Svg>
  );
}

export default SvgComponent;
