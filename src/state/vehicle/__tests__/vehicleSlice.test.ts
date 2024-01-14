import vehicleReducer, { setVehicles, setLoading, setError } from '../vehicleSlice';

describe('vehicleSlice', () => {
  const initialState = {
    vehicles: [],
    loading: false,
    error: null
  };

  it('should return the initial state', () => {
    expect(vehicleReducer(undefined, { type: 'unknown_action' })).toEqual(initialState);
  });

  it('should handle setVehicles', () => {
    const vehicles = [{ id: 'v1', name: 'Car1' }, { id: 'v2', name: 'Car2' }];
    expect(vehicleReducer(initialState, setVehicles(vehicles))).toEqual({
      ...initialState,
      vehicles,
    });
  });

  it('should handle setLoading', () => {
    expect(vehicleReducer(initialState, setLoading(true))).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle setError', () => {
    const error = 'Error fetching vehicles';
    expect(vehicleReducer(initialState, setError(error))).toEqual({
      ...initialState,
      error,
    });
  });
});
