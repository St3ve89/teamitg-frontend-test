import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../state/modal/modalSlice';
import './style.scss';
import { RootState } from '../../types';

export default function Modal() {
  const dispatch = useDispatch();
  const { isOpen, vehicleData } = useSelector(
    (state: RootState) => state.modal
  );
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      if (isOpen) {
        modalRef.current.showModal();
      } else {
        modalRef.current.close();
      }
    }
  }, [isOpen]);

  const handleClose = () => {
    dispatch(closeModal());
  };

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <dialog
      className="modal"
      ref={modalRef}
      aria-modal="true"
      aria-labelledby="modal-title"
      data-testid="modal"
    >
      <div className="modal__content">
        <div className="modal__header">
          <h2
            id="modal-title"
            className="modal__title"
            data-testid="modal-title"
          >
            {vehicleData?.id} - {vehicleData?.modelYear}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="modal__close-button"
            aria-label="Close"
            data-testid="modal-close-button"
          >
            <span className="modal__close-icon" aria-hidden="true">
              X
            </span>
          </button>
        </div>
        <div className="modal__details">
          <p className="modal__description">{vehicleData?.description}</p>
          <ul className="modal__info-list">
            <li className="modal__info-list__item">
              <strong>Body Style:</strong>
              {vehicleData?.meta?.bodystyles?.join(', ')}
            </li>
            <li className="modal__info-list__item">
              <strong>Drive Train:</strong>
              {vehicleData?.meta?.drivetrain?.join(', ')}
            </li>
            <li className="modal__info-list__item">
              <strong>Passengers:</strong>
              {vehicleData?.meta?.passengers}
            </li>
            <li className="modal__info-list__item">
              <strong>Emissions:</strong>
              {vehicleData?.meta?.emissions?.template?.replace(
                '$value',
                vehicleData?.meta?.emissions?.value?.toString() ||
                  'default value'
              )}
            </li>
            <li className="modal__info-list__item">
              <strong>Model Year:</strong>
              {vehicleData?.modelYear}
            </li>
          </ul>
        </div>
      </div>
      <div
        className="modal__backdrop"
        onClick={handleClose}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === 'Space') {
            handleClose();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label="Close modal"
      />
    </dialog>,
    document.getElementById('modal-root')!
  );
}
