import * as React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={44} height={44} viewBox="0 0 44 44" fill="none" {...props}>
      <Path
        d="M.264 22c0-12.15 9.85-22 22-22s22 9.85 22 22-9.85 22-22 22-22-9.85-22-22z"
        fill="url(#prefix__paint0_linear)"
      />
      <Path
        d="M19.264 26.219l10.593-10.64 1.407 1.405-12 12-5.579-5.578L15.045 22l4.219 4.219z"
        fill="#fff"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={22.264}
          y1={0}
          x2={22.264}
          y2={44}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#6FCF97" />
          <Stop offset={1} stopColor="#66D2EA" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
