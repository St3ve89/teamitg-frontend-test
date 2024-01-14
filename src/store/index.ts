import { configureStore } from '@reduxjs/toolkit';
import vehicleReducer from '../state/vehicle/vehicleSlice';
import modalReducer from '../state/modal/modalSlice';

export const store = configureStore({
  reducer: {
    vehicle: vehicleReducer,
    modal: modalReducer,
  },
});
