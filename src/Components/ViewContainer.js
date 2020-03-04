/* eslint-disable import/no-duplicates */
/* eslint-disable camelcase */
// @flow
import { useState, useEffect } from 'react';
import * as React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StyleProp,
  ViewStyle,
  StatusBar,
} from 'react-native';
import LottieView from 'lottie-react-native';

import { loading as loadingAnimated } from 'Assets/animation';

import { scaleHor } from 'Constants/dimensions';
import colors from 'Constants/colors';
import ErrorFeedback from './ErrorFeedback';
import FadedContainer from './FadedContainer';
import Header from './Header';

type BackTitleTypes = {
  haveBack: boolean,
  title: string,
  haveRight?: boolean,
  rightIcon?: string,
  onRightPress?: () => void,
  backType?: 'back' | 'exit',
  onBackPress: () => void,
};

type PropTypes = {
  style: StyleProp<ViewStyle>,
  containerStyle: StyleProp<ViewStyle>,
  children: React.Node,
  scrollable: ?boolean,
  tabbarComponent?: {},
  loading: boolean,
  requestError?: {},
  isErrorImportant?: boolean,
  onErrorPress?: () => void,
  dismissLoading?: boolean,
  exposeTime?: number,
  handleBack?: boolean,
  backAction?: () => void,
  showBackPopup?: boolean,
  haveBackHeader?: boolean,
  barStyle?: 'dark-content' | 'light-content',
  safeArea?: boolean,
} & BackTitleTypes;

const SafeAreaViewFlex = ({ safe, children, style }) => {
  if (safe) {
    return <SafeAreaView style={style}>{children}</SafeAreaView>;
  }
  return <View style={style}>{children}</View>;
};

// eslint-disable-next-line react/display-name
const ViewContainer = ({
  style,
  containerStyle,
  children,
  scrollable,
  tabbarComponent,
  loading = false,
  requestError,
  onErrorPress,
  dismissLoading = true,
  exposeTime = 10000,
  haveBackHeader = false,
  haveBack = true,
  title,
  haveRight,
  rightIcon,
  onRightPress,
  backType = 'back',
  onBackPress,
  safeArea = true,
  ...next
}: PropTypes) => {
  const [isLoading, setLoading] = useState(false);
  const [errorData, setError] = useState(null);

  useEffect(() => {
    if (isLoading === loading) return;
    setLoading(loading);
    if (dismissLoading) {
      setTimeout(() => {
        if (loading) {
          setLoading(false);
        }
      }, exposeTime);
    }
  }, [loading]);

  useEffect(() => {
    if (!requestError) return;
    if (requestError) {
      /**
       * @implementation request get token
       */
      setError({
        errorType: 'server',
        label: 'Your token has been expired, please logout and login again!',
      });
    } else {
      setError({
        errorType: 'server',
        label: 'Oh no! There is an unknown error',
      });
    }

    setTimeout(() => {
      if (errorData) {
        setError(null);
      }
    }, 6000);
  }, [requestError]);

  const renderLoading = () => (
    <FadedContainer visible={isLoading}>
      <LottieView autoPlay source={loadingAnimated} />
    </FadedContainer>
  );

  const renderBackTitle = () =>
    haveBackHeader && (
      <Header
        haveBack={haveBack}
        title={title}
        haveRight={haveRight}
        rightIcon={rightIcon}
        onRightPress={onRightPress}
        type={backType}
        onBackPress={onBackPress}
        backType={backType}
        style={{
          marginHorizontal: scaleHor(24),
          // paddingTop: scaleVer(24),
        }}
      />
    );

  const renderChildren = () => (
    <View style={[styles.contentContainerStyle, { flex: 1 }, style]}>
      {children}
    </View>
  );

  const renderNoTabbarScroll = () => (
    <ScrollView
      contentContainerStyle={[styles.contentContainerStyle, style]}
      keyboardShouldPersistTaps="handled"
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );

  const renderComponent = () => {
    if (!scrollable && !tabbarComponent) {
      return renderChildren();
    }

    if (scrollable && !tabbarComponent) {
      return renderNoTabbarScroll();
    }
  };
  return (
    <SafeAreaViewFlex
      style={[styles.containerStyle, containerStyle]}
      safe={safeArea}
    >
      <StatusBar barStyle="dark-content" />
      {/* <SafeAreaView /> */}
      {renderBackTitle()}
      {renderComponent()}
      {renderLoading()}
      {errorData && (
        <ErrorFeedback onErrorPress={onErrorPress} {...errorData} />
      )}
    </SafeAreaViewFlex>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    paddingHorizontal: scaleHor(24),
  },
  absoluteStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});

export default ViewContainer;
