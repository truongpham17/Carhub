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
  BackHandler,
  StatusBar,
  Modal,
} from 'react-native';
import LottieView from 'lottie-react-native';

import { loading as loadingAnimated } from 'Assets/animation';

import { scaleVer, scaleHor } from 'Constants/dimensions';
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
} & BackTitleTypes;

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
  haveBackHeader = false,
  haveBack = true,
  title,
  haveRight,
  rightIcon,
  onRightPress,
  backType = 'back',
  onBackPress,
  ...next
}: PropTypes) => {
  const [errorData, setError] = useState(null);

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
    <Modal visible={loading} transparent>
      <LottieView autoPlay source={loadingAnimated} />
    </Modal>
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
      />
    );

  const renderChildren = () => (
    <View style={[styles.containerStyle, { flex: 1 }, style]}>
      {renderBackTitle()}
      {children}
    </View>
  );

  // const renderBackPopup = () => <FadedContainer visible={backVisible}></FadedContainer>;

  const renderTabbarNoScroll = () => (
    <React.Fragment>
      {renderChildren()}
      {tabbarComponent}
    </React.Fragment>
  );

  const renderTabbarScroll = () => (
    <React.Fragment>
      <ScrollView
        contentContainerStyle={[styles.containerStyle, style]}
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {renderBackTitle()}
        {children}
      </ScrollView>
      {tabbarComponent}
    </React.Fragment>
  );

  const renderNoTabbarScroll = () => (
    <ScrollView
      contentContainerStyle={[styles.containerStyle, style]}
      keyboardShouldPersistTaps="handled"
      style={{ flex: 1 }}
    >
      {renderBackTitle()}
      {children}
    </ScrollView>
  );

  const renderComponent = () => {
    if (!scrollable && !tabbarComponent) {
      return renderChildren();
    }
    if (!scrollable && tabbarComponent) {
      return renderTabbarNoScroll();
    }
    if (scrollable && !tabbarComponent) {
      return renderNoTabbarScroll();
    }
    if (scrollable && tabbarComponent) {
      return renderTabbarScroll();
    }
  };
  return (
    <SafeAreaView
      style={[{ flex: 1, backgroundColor: colors.white }, containerStyle]}
    >
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
      {renderComponent()}
      {renderLoading()}
      {errorData && (
        <ErrorFeedback onErrorPress={onErrorPress} {...errorData} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingVertical: scaleVer(24),
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
