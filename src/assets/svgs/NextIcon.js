import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={8} height={13} viewBox="0 0 8 13" fill="none">
      <Path
        d="M7.788 5.995L1.92.209a.732.732 0 00-1.025 0L.212.884a.707.707 0 00-.001 1.01L4.861 6.5.21 11.107a.707.707 0 00.001 1.009l.684.675c.283.279.742.279 1.025 0l5.867-5.786a.708.708 0 000-1.01z"
        fill="#353E47"
      />
    </Svg>
  );
}

export default SvgComponent;
