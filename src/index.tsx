import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import VehicleList from './components/VehicleList';
import { store } from './store';
import './global-styles.scss';
import Modal from './components/Modal';

createRoot(document.querySelector('.root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <VehicleList />
      <Modal />
    </Provider>
  </React.StrictMode>
);
