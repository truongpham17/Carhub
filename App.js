import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import store, { persistor } from './src/@redux/store';
import Navigation from './src/screens/Navigation';

// import './src/services/remote-config';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Navigation />
    </PersistGate>
  </Provider>
);

export default App;
