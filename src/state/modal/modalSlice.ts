/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { ModalState } from '../../types';

const initialState: ModalState = {
  isOpen: false,
  vehicleData: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.vehicleData = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.vehicleData = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
