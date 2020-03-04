import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';

type PropTypes = {
  style: {},
  children: React.Node,
};

const Gradient = ({ style, children }: PropTypes) => (
  <LinearGradient
    style={style}
    start={{ x: 0.5, y: 1 }}
    end={{ x: 0.5, y: 0 }}
    colors={[
      '#214687',
      '#234988',
      '#28548A',
      '#32668D',
      '#3F8092',
      '#50A198',
      '#64C89F',
      '#6AD3A1',
    ]}
    locations={[0, 0.19, 0.357, 0.516, 0.67, 0.82, 0.965, 1]}
  >
    {children}
  </LinearGradient>
);

export default Gradient;
