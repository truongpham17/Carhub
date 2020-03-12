import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import Navigation from './src/screens/Navigation';
import store, { persistor } from './src/@redux/store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}>
        </PersistGate> */}
        <Navigation />
      </Provider>
    );
  }
}
