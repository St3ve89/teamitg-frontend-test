import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockVehicleStore } from '../../../__mocks__/store';
import VehicleCard from '..';

const mockVehicle = {
  id: '123',
  price: '$20,000',
  description: 'This is a vehicle description',
  media: [{ url: 'image-url-16x9.jpg' }, { url: 'image-url-1x1.jpg' }],
};

describe('<VehicleCard /> Tests', () => {
  it('Should render VehicleCard component with mock data', () => {
    const { getByTestId } = render(
      <Provider store={mockVehicleStore}>
        <VehicleCard vehicle={mockVehicle} />
      </Provider>
    );

    const vehicleIdElement = getByTestId('vehicle-name');
    expect(vehicleIdElement.textContent).toBe('123');

    const vehiclePriceElement = getByTestId('vehicle-price');
    expect(vehiclePriceElement.textContent).toBe('From $20,000');

    const vehicleDescriptionElement = getByTestId('vehicle-description');
    expect(vehicleDescriptionElement.textContent).toBe(
      'This is a vehicle description'
    );

    const vehicleImageElement = getByTestId('vehicle-image') as HTMLImageElement;
    expect(vehicleImageElement).toBeTruthy();
    expect(vehicleImageElement.alt).toBe('123');

    const moreButtonElement = getByTestId('read-more-button');
    expect(moreButtonElement).toBeTruthy();
  });
});
