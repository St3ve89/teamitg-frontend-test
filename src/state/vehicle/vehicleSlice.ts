/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState: {
    vehicles: [],
    loading: false,
    error: null
  },
  reducers: {
    setVehicles: (state, action) => {
      state.vehicles = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setVehicles, setError, setLoading } = vehicleSlice.actions;
export default vehicleSlice.reducer;
