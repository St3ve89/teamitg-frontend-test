import React from 'react';
import './style.scss';
import { useDispatch } from 'react-redux';
import { openModal } from '../../state/modal/modalSlice';
import { CombinedVehicleData } from '../../types';

interface VehicleCardProps {
  vehicle: CombinedVehicleData
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const imageUrl16x9 = vehicle.media && vehicle.media[0].url;
  const imageUrl1x1 = vehicle.media && vehicle.media[1].url;

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal(vehicle));
  };

  return (
    <div className="vehicle-card" data-testid="vehicle-card">
      <div className="vehicle-card__image-container">
        <picture>
          <source media="(min-width: 768px)" srcSet={imageUrl16x9} />
          <img
            srcSet={imageUrl1x1}
            src={imageUrl16x9}
            className="vehicle-card__image"
            alt={`${vehicle.id}`}
            data-testid="vehicle-image"
          />
        </picture>
        <div className="vehicle-card__overlay" />
        <div className="vehicle-card__button-container">
          <button
            className="vehicle-card__show-more"
            type="button"
            onClick={handleOpenModal}
            aria-label={`Read more about ${vehicle.id}`}
            data-testid="read-more-button"
          >
            Read More
          </button>
        </div>
      </div>
      <div className="vehicle-card__info-container">
        <h4 className="vehicle-card__name" data-testid="vehicle-name">
          <span>
            <span>{vehicle.id}</span>
          </span>
        </h4>
        <p className="vehicle-card__price" data-testid="vehicle-price">
          From
          {' '}
          {vehicle.price}
        </p>
        <p
          className="vehicle-card__description"
          data-testid="vehicle-description"
        >
          {vehicle.description}
        </p>
      </div>
    </div>
  );
}
