import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={18} height={21} viewBox="0 0 18 21" fill="none" {...props}>
      <Path
        d="M15.984 18.984V8.016H2.016v10.968h13.968zm-3-18H15V3h.984c.532 0 1 .203 1.407.61.406.406.609.874.609 1.406v13.968c0 .532-.203 1-.61 1.407-.406.406-.874.609-1.406.609H2.016a2.069 2.069 0 01-1.454-.563A2.069 2.069 0 010 18.985V5.016c0-.532.188-1 .563-1.407C.969 3.203 1.453 3 2.016 3H3V.984h2.016V3h7.968V.984zM14.016 12v5.016H9V12h5.016z"
        fill="url(#prefix__paint0_linear)"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={9}
          y1={-10}
          x2={9}
          y2={34}
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
