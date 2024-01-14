import { Vehicle, VehicleDetails } from '../types';
import { request } from './helpers';

/**
 * Pull vehicles information
 *
 * @return {Promise<Array.<vehicleSummaryPayload>>}
 */
// TODO: All API related logic should be made inside this function.
export default async function getData() {
  try {
    const vehiclesList = await request('/api/vehicles.json') as Vehicle[];
    const detailedVehicles = await Promise.all(
      vehiclesList.map(async (vehicle) => {
        if (!vehicle.apiUrl) {
          return null;
        }
        try {
          const vehicleDetails = await request(vehicle.apiUrl) as VehicleDetails;
          if (!vehicleDetails.price) {
            return null;
          }
          return { ...vehicle, ...vehicleDetails };
        } catch (error) {
          return null;
        }
      })
    );

    return detailedVehicles.filter((vehicle) => vehicle !== null);
  } catch (error) {
    throw new Error('Failed to fetch vehicle data');
  }
}
