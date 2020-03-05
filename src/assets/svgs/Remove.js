import React from 'react';
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Rect
        x={1}
        y={1}
        width={18}
        height={18}
        rx={9}
        fill="url(#prefix__paint0_linear)"
        stroke="#fff"
        strokeWidth={2}
      />
      <Path
        d="M11.137 10l1.706-1.706a.536.536 0 000-.758l-.38-.379a.536.536 0 00-.757 0L10 8.863 8.294 7.157a.536.536 0 00-.758 0l-.379.38a.536.536 0 000 .757L8.863 10l-1.706 1.706a.536.536 0 000 .758l.38.379c.208.21.548.21.757 0L10 11.137l1.706 1.706c.21.21.549.21.758 0l.379-.38a.536.536 0 000-.757L11.137 10z"
        fill="#fff"
      />
      <Path
        d="M11.137 10l1.706-1.706a.536.536 0 000-.758l-.38-.379a.536.536 0 00-.757 0L10 8.863 8.294 7.157a.536.536 0 00-.758 0l-.379.38a.536.536 0 000 .757L8.863 10l-1.706 1.706a.536.536 0 000 .758l.38.379c.208.21.548.21.757 0L10 11.137l1.706 1.706c.21.21.549.21.758 0l.379-.38a.536.536 0 000-.757L11.137 10z"
        fill="#fff"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={10}
          y1={0}
          x2={10}
          y2={20}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#396A98" />
          <Stop offset={1} stopColor="#08457E" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
