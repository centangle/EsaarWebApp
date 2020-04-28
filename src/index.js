
import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './common/redux/store';
import './index.css';
import './web/components/toaster/toast.styles.scss';
import App from './App';
import Toaster from './web/components/toaster/Toaster';
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
        <Toaster />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();