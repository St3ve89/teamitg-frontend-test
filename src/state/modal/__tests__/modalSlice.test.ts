import { ModalState } from '../../../types';
import modalReducer, { openModal, closeModal } from '../modalSlice';

describe('modalSlice', () => {
  const initialState = {
    isOpen: false,
    vehicleData: null,
  };

  it('should return the initial state', () => {
    expect(modalReducer(undefined, { type: 'unknown_action' })).toEqual(initialState);
  });

  it('should handle openModal', () => {
    const vehicleData = { id: '123' };
    expect(modalReducer(initialState, openModal(vehicleData))).toEqual({
      isOpen: true,
      vehicleData,
    });
  });

  it('should handle closeModal', () => {
    const stateBefore: ModalState = { isOpen: true, vehicleData: { id: '123' } };
    expect(modalReducer(stateBefore, closeModal())).toEqual({
      isOpen: false,
      vehicleData: null,
    });
  });
});
