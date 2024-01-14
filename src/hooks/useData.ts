import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getData from '../api';
import {
  setError,
  setLoading,
  setVehicles,
} from '../state/vehicle/vehicleSlice';
import { CombinedVehicleData, RootState } from '../types';

export default function useData(): [boolean, string | null, CombinedVehicleData[] | null] {
  const dispatch = useDispatch();
  const vehicles = useSelector((state: RootState) => state.vehicle.vehicles);
  const loading = useSelector((state: RootState) => state.vehicle.loading);
  const error = useSelector((state: RootState) => state.vehicle.error);

  useEffect(() => {
    dispatch(setLoading(true));
    getData()
      .then((response) => {
        dispatch(setVehicles(response));
        dispatch(setError(null));
      })
      .catch((err) => {
        dispatch(setError(err.toString()));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  return [loading, error, vehicles];
}
