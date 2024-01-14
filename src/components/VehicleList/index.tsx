import React from 'react';
import useData from '../../hooks/useData';
import './style.scss';
import VehicleCard from '../VehicleCard';

export default function VehicleList() {
  const [loading, error, vehicles] = useData();

  if (loading) {
    return <div data-testid="loading">Loading</div>;
  }

  if (error) {
    return <div data-testid="error">{error}</div>;
  }

  return (
    <div data-testid="results">
      <section className="VehicleList">
        {vehicles && vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </section>
    </div>
  );
}
