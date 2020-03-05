import React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={8} height={8} viewBox="0 0 8 8" fill="none" {...props}>
      <Path
        d="M5.516 4l2.275-2.274a.715.715 0 000-1.011L7.285.209a.715.715 0 00-1.01 0L4 2.484 1.726.209a.715.715 0 00-1.011 0L.209.715a.715.715 0 000 1.01L2.484 4 .209 6.274a.715.715 0 000 1.011l.506.506c.279.279.732.279 1.01 0L4 5.516l2.274 2.275c.28.279.732.279 1.011 0l.506-.506a.715.715 0 000-1.01L5.516 4z"
        fill="#333"
      />
    </Svg>
  );
}

export default SvgComponent;
