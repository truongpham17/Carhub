import { StyleSheet } from 'react-native';
import { dimension } from 'Constants';

function scaleFont(fontSize) {
  // if (fontSize <= 14) return fontSize;
  return Math.round((fontSize * dimension.SCREEN_WIDTH) / 375);
}

const textStyle = StyleSheet.create({
  biggestTitle: {
    fontSize: scaleFont(42),
    // fontSize: scaleFont(42),
    fontFamily: 'Quicksand-Regular',
  },
  sectionHeading: {
    fontSize: scaleFont(32),
    fontFamily: 'Quicksand-Regular',
  },
  sectionHeadingBold: {
    fontSize: scaleFont(32),
    fontFamily: 'Quicksand-Bold',
  },
  widgetTitle: {
    fontSize: scaleFont(24),
    fontFamily: 'Quicksand-Bold',
  },
  widgetItem: {
    fontSize: scaleFont(18),
    fontFamily: 'Quicksand-Bold',
  },
  bodyText: {
    fontSize: scaleFont(14),
    fontFamily: 'SFUIDisplay-Regular',
  },
  bodyTextBold: {
    fontSize: scaleFont(14),
    fontFamily: 'SFUIDisplay-Bold',
  },
  label: {
    fontSize: scaleFont(12),
    fontFamily: 'SFUIDisplay-Bold',
  },
  labelRegular: {
    fontSize: scaleFont(12),
    fontFamily: 'SFUIDisplay-Bold',
  },
});

const textStyleObject = {
  biggestTitle: {
    fontSize: scaleFont(42),
    fontFamily: 'Quicksand-Regular',
  },
  sectionHeading: {
    fontSize: scaleFont(32),
    fontFamily: 'Quicksand-Regular',
  },
  sectionHeadingBold: {
    fontSize: scaleFont(32),
    fontFamily: 'Quicksand-Bold',
  },
  widgetTitle: {
    fontSize: scaleFont(24),
    fontFamily: 'Quicksand-Bold',
  },
  widgetItem: {
    fontSize: scaleFont(18),
    fontFamily: 'Quicksand-Bold',
  },
  bodyText: {
    fontSize: scaleFont(14),
    fontFamily: 'SFUIDisplay-Regular',
  },
  bodyTextBold: {
    fontSize: scaleFont(14),
    fontFamily: 'SFUIDisplay-Bold',
  },
  label: {
    fontSize: scaleFont(12),
    fontFamily: 'SFUIDisplay-Bold',
  },
  labelRegular: {
    fontSize: scaleFont(12),
    fontFamily: 'SFUIDisplay-Regular',
  },
};

export { textStyle, textStyleObject, scaleFont };
