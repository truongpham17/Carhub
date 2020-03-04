import React from 'react';
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { scaleHor } from 'Constants/dimensions';

function SvgComponent(props) {
  return (
    <Svg
      width={scaleHor(28)}
      height={scaleHor(28)}
      viewBox="0 0 26 26"
      fill="none"
      {...props}
    >
      <Rect
        x={1}
        y={1}
        width={24}
        height={24}
        rx={12}
        fill="url(#prefix__paint0_linear)"
        stroke="#fff"
        strokeWidth={2}
      />
      <Path
        d="M13.679 9.821l2.5 2.5-5.43 5.43-2.229.246a.469.469 0 01-.517-.518l.248-2.23 5.428-5.428zm4.046-.372l-1.174-1.174a.938.938 0 00-1.326 0l-1.104 1.104 2.5 2.5 1.104-1.104a.938.938 0 000-1.326z"
        fill="#fff"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={13}
          y1={0}
          x2={13}
          y2={26}
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
