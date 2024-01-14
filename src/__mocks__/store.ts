import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

export const mockModalStore = mockStore({
  modal: {
    isOpen: true,
    vehicleData: {
      id: '123',
      modelYear: '2021',
      description: 'A great car',
      meta: {
        bodystyles: ['Sedan', 'Coupe'],
        drivetrain: ['AWD', 'RWD'],
        emissions: {
          template: 'CO2 Emissions $value g/km',
          value: 0,
        },
        passengers: 5,
      },
    },
  },
});

export const mockVehicleStore = mockStore({
  vehicles: [
    {
      id: '123',
      modelYear: '2021',
      description: 'A great car',
      meta: {
        bodystyles: ['Sedan', 'Coupe'],
        drivetrain: ['AWD', 'RWD'],
        emissions: {
          template: 'CO2 Emissions $value g/km',
          value: 0,
        },
        passengers: 5,
      },
    },
  ],
  loading: false,
  error: null,
});
