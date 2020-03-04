import React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.125.625v3.25h3.25v2.167h-3.25V9.28s-2.156.01-2.167 0V6.04h-3.25s.011-2.155 0-2.166h3.25V.625h2.167zm-2.167 20.583H2.792V6.042h9.75V3.875h-9.75A2.173 2.173 0 00.625 6.042v15.166c0 1.192.975 2.167 2.167 2.167h15.166a2.173 2.173 0 002.167-2.167v-9.75h-2.167v9.75zM9.52 17.774l-2.123-2.557-2.98 3.825h11.917l-3.835-5.103-2.979 3.835z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
