import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={120} height={120} viewBox="0 0 367.805 367.805" {...props}>
      <Path
        d="M183.903.001c101.566 0 183.902 82.336 183.902 183.902s-82.336 183.902-183.902 183.902S.001 285.469.001 183.903C-.288 82.625 81.579.29 182.856.001h1.047z"
        fill="#77C73B"
      />
      <Path
        fill="#ffffff"
        d="M285.78 133.225L155.168 263.837l-73.143-72.62 29.78-29.257 43.363 42.841 100.833-100.833z"
      />
    </Svg>
  );
}

export default SvgComponent;
