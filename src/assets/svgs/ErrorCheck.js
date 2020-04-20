import * as React from 'react';
import Svg, { Ellipse, G, Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg viewBox="0 0 512 512" width={120} height={120} {...props}>
      <Ellipse cx={256} cy={256} rx={256} ry={255.832} fill="#FF3F34" />
      <G fill="#fff">
        <Path d="M376.812 337.18l-39.592 39.593-201.998-201.999 39.592-39.592z" />
        <Path d="M376.818 174.825L174.819 376.824l-39.592-39.592 201.999-201.999z" />
      </G>
    </Svg>
  );
}

export default SvgComponent;
