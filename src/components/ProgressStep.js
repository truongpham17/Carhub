import React from 'react';
import { View, StyleSheet, Text, StyleProp, ViewStyle } from 'react-native';
import colors from 'Constants/colors';
import { Tick } from 'Assets/svgs';
import { textStyle } from 'Constants/textStyles';
import { dimension } from 'Constants';

type PropTypes = {
  currentStep: Number,
  labels: [String],
  style: StyleProp<ViewStyle>,
};

const ProgressStep = ({ currentStep, labels, style }: PropTypes) => (
  <View style={[{ width: '100%', alignItems: 'center' }, style]}>
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        {labels.map((item, index) => (
          <View
            style={[{ flexDirection: 'row' }, index === 0 ? {} : { flex: 1 }]}
          >
            {index > 0 && (
              <View
                style={[
                  {
                    // height: 2,
                    // width: dimension.SCREEN_WIDTH / 2 / labels.length,
                    flex: 1,
                    maxHeight: 2,
                    alignSelf: 'stretch',
                    backgroundColor: colors.success,
                    marginTop: 22,
                  },
                  index > currentStep ? { backgroundColor: colors.dark80 } : {},
                ]}
              />
            )}

            <View>
              {currentStep > index ? (
                <View
                  style={{
                    width: 44,
                    height: 44,
                    overflow: 'hidden',
                  }}
                >
                  <Tick />
                </View>
              ) : (
                <View style={styles.tickContainer}>
                  <Text style={textStyle.widgetItem}>{index + 1}</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'stretch',
        }}
      >
        {labels.map((item, index) => (
          <Text
            style={[
              currentStep < index ? textStyle.bodyText : textStyle.bodyTextBold,
              { fontSize: 20 },
            ]}
          >
            {labels[index]}
          </Text>
        ))}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  tickContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.dark80,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '80%',
  },
});

export default ProgressStep;
