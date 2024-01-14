import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Modal from '..';
import { mockModalStore } from '../../../__mocks__/store';
import modalReducer, { closeModal } from '../../../state/modal/modalSlice';

describe('<Modal />', () => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');

  beforeEach(() => {
    window.HTMLDialogElement.prototype.showModal = () => {};
    window.HTMLDialogElement.prototype.close = () => {};
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    document.body.removeChild(modalRoot);
  });
  it('should render correctly with vehicle data', () => {
    const { getByTestId } = render(
      <Provider store={mockModalStore}>
        <Modal />
      </Provider>
    );

    expect(getByTestId('modal-title').textContent).toBe('123 - 2021');
    expect(getByTestId('modal')).toBeTruthy();
  });

  it('should dispatch closeModal action when the close button is clicked', () => {
    const { getByTestId } = render(
      <Provider store={mockModalStore}>
        <Modal />
      </Provider>
    );

    fireEvent.click(getByTestId('modal-close-button'));

    const actions = mockModalStore.getActions();
    expect(actions).toContainEqual(closeModal());
  });

  it('should close when the close button is clicked', async () => {
    const store = configureStore({
      reducer: {
        modal: modalReducer,
      },
      preloadedState: {
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
      },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <Modal />
      </Provider>
    );

    fireEvent.click(getByTestId('modal-close-button'));

    expect(store.getState().modal.isOpen).toBe(false);
  });
});
