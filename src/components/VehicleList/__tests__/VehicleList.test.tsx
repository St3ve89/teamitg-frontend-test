import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import VehicleList from '..';
import { mockVehicleStore } from '../../../__mocks__/store';
import useData from '../../../hooks/useData';

jest.mock('../../../hooks/useData');

const mockVehicleArray = [
  {
    id: 'xe',
    modelYear: 'k17',
    apiUrl: '/api/vehicle_xe.json',
    media: [
      {
        name: 'vehicle',
        url: '/images/16x9/xe_k17.jpg',
      },
      {
        name: 'vehicle',
        url: '/images/1x1/xe_k17.jpg',
      },
    ],
  },
];

describe('<VehicleList /> Tests', () => {

  beforeEach(() => {
    (useData as jest.Mock).mockReturnValue([true, null, []]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should show loading state if it not falsy', () => {
    (useData as jest.Mock).mockReturnValue([true, 'An error occurred', 'results']);
    const { queryByTestId } = render(
      <Provider store={mockVehicleStore}>
        <VehicleList />
      </Provider>
    );

    expect(queryByTestId('loading')).not.toBeNull();
    expect(queryByTestId('error')).toBeNull();
    expect(queryByTestId('results')).toBeNull();
  });

  it('Should show error if it is not falsy and loading is finished', () => {
    (useData as jest.Mock).mockReturnValue([false, 'An error occurred', 'results']);
    const { queryByTestId } = render(
      <Provider store={mockVehicleStore}>
        <VehicleList />
      </Provider>
    );

    expect(queryByTestId('loading')).toBeNull();
    expect(queryByTestId('error')).not.toBeNull();
    expect(queryByTestId('results')).toBeNull();
  });

  it('Should show results if loading successfully finished', () => {
    (useData as jest.Mock).mockReturnValue([false, false, mockVehicleArray]);
    const { queryByTestId } = render(
      <Provider store={mockVehicleStore}>
        <VehicleList />
      </Provider>
    );

    expect(queryByTestId('loading')).toBeNull();
    expect(queryByTestId('error')).toBeNull();
    expect(queryByTestId('results')).not.toBeNull();
  });
});
