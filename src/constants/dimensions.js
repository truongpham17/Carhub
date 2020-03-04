import { Dimensions, Platform } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const ratio = SCREEN_WIDTH / SCREEN_HEIGHT;

const lineHeight = Platform.select({ ios: 0.25, android: 0.5 });

function scaleVer(dimension) {
  return Math.round((dimension * SCREEN_HEIGHT) / 812);
}

function scaleHor(dimension) {
  return Math.round((dimension * SCREEN_WIDTH) / 375);
}

export { scaleVer, scaleHor };

const dimensions = {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  DISTANCE_1: 4,
  DISTANCE_2: 8,
  DISTANCE_3: 16,
  DISTANCE_4: 24,
  DISTANCE_5: 32,
  DISTANCE_6: 36,
  DISTANCE_7: 48,

  DEFAULT_MARGIN_COMPONENT: 16,
  DEFAULT_PADDING: 24,
  DEFAULT_MARGIN: 24,
  DEFAULT_MARGIN_TOP: 36,

  DEFAULT_BORDER_RADIUS: 6,
};

const scale = value => (16 / 9) * ratio * value;
/*

  gia su dang la screen_width, height / width = 16/9
  16/9 * width / height * item
  */
export default dimensions;
export { scale, lineHeight };
