import React from 'react';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  G,
  Circle,
  Path,
} from 'react-native-svg';

const SvgComponent = props => (
  <Svg viewBox="0 0 64 64" {...props} width={24} height={24}>
    <Defs>
      <LinearGradient
        y2={161.29}
        x2={0}
        y1={218.22}
        gradientUnits="userSpaceOnUse"
        id="prefix__a"
      >
        <Stop stopColor="#c52828" />
        <Stop offset={1} stopColor="#ff5454" />
      </LinearGradient>
    </Defs>
    <G transform="translate(-666.94 -144.37) scale(.92857)">
      <Circle r={28} cy={189.93} cx={752.7} fill="url(#prefix__a)" />
      <G fill="#fff" fillOpacity={0.851}>
        <Path d="M739.54 180.23a3.922 3.922 0 117.844 0 3.922 3.922 0 01-7.844 0m17.784 0a3.924 3.924 0 017.845 0 3.922 3.922 0 11-7.845 0M766.89 200.51c-2.431-5.621-8.123-9.253-14.502-9.253-6.516 0-12.242 3.65-14.588 9.3a1.897 1.897 0 103.505 1.454c1.756-4.229 6.107-6.96 11.08-6.96 4.864 0 9.189 2.733 11.02 6.965a1.898 1.898 0 003.484-1.506" />
      </G>
    </G>
  </Svg>
);

export default SvgComponent;
