import React from 'react';

import { Button } from '../Button';
import { ApartmentInfo } from '../ApartmentInfo';
import { Apartment } from '../../types/formValues';
import './index.scss';

interface CurrentRentProps {
  currentRent: Apartment | null;
  setCurrentRent: (value: Apartment | null) => void;
}

export const CurrentRent: React.FC<CurrentRentProps> = ({
  currentRent,
  setCurrentRent,
}) => {
  const handleCancelRent = () => {
    setCurrentRent(null);
  };

  return (
    <div className="current-rent">
      {currentRent ? (
        <>
          <div className="current-rent__container">
            <h2 className="current-rent__title">Your current rent</h2>

            <Button
              title="Cancel rent"
              classNames="current-rent__cancel-button"
              onClick={handleCancelRent}
            />
          </div>

          <ApartmentInfo infoApartment={currentRent} />
        </>
      ) : (
        <h3 className="current-rent__none">You have no current rent.</h3>
      )}
    </div>
  );
};
