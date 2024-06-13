import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ApartmentInfo } from '../ApartmentInfo';
import { Button } from '../Button';
import { DropdownButton } from '../DropdownButton';
import { RentInput } from '../RentInput';
import { getPreparedApartments } from '../../helpers/functions';
import { RentFormValues } from '../../schemas/rentSchema';
import { useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../../helpers/searchHelper';
import { FilterApartments, SortApartments } from '../../types/formValues';
import './index.scss';

const filterOptions = [
  { id: uuidv4(), option: 'All' },
  { id: uuidv4(), option: '1' },
  { id: uuidv4(), option: '2' },
  { id: uuidv4(), option: '3' },
  { id: uuidv4(), option: '4' },
  { id: uuidv4(), option: '5' },
  { id: uuidv4(), option: '6' },
  { id: uuidv4(), option: '7' },
];

const sortOptions = [
  { id: uuidv4(), option: 'lowest to highest' },
  { id: uuidv4(), option: 'highest to lowest' },
];

interface Props {
  apartments: RentFormValues[];
  setApartments: (apartments: RentFormValues[]) => void;
  setCurrentRent: (value: RentFormValues) => void;
}

export const AvailableApartments: React.FC<Props> = ({
  apartments,
  setApartments,
  setCurrentRent,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sortBy = (searchParams.get('sortBy') ||
    'lowest to highest') as SortApartments;
  const filterBy = (searchParams.get('filterBy') || 'All') as FilterApartments;
  const [readyApartments, setReadyApartments] = useState(apartments);

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  const handleRent = (apartment: RentFormValues) => {
    setCurrentRent(apartment);
    setApartments(apartments.filter(a => a !== apartment));
  };

  const handleDelete = (apartment: RentFormValues) => {
    setApartments(apartments.filter(a => a !== apartment));
  };

  useEffect(() => {
    const preparedApartments = getPreparedApartments(
      apartments,
      filterBy,
      sortBy,
      query,
    );

    setReadyApartments(preparedApartments);
  }, [apartments, filterBy, sortBy, query]);

  return (
    <div className="available-apartments">
      <div className="available-apartments__head">
        <h3 className="available-apartments__title">Available Apartments</h3>

        <p className="available-apartments__title-count">{apartments.length}</p>
      </div>

      <div className="available-apartments__parameters">
        <div className="available-apartments__parameters-item">
          <h4>Sort by price</h4>

          <DropdownButton
            options={sortOptions}
            initialOption={sortBy}
            onClickOptipn={option => setSearchWith({ sortBy: option.option })}
          />
        </div>

        <div className="available-apartments__parameters-item">
          <h4>Filter by rooms</h4>

          <DropdownButton
            options={filterOptions}
            initialOption={filterBy}
            onClickOptipn={option => setSearchWith({ filterBy: option.option })}
          />
        </div>

        <div className="available-apartments__parameters-item">
          <h4>Search by Name</h4>

          <RentInput
            placeholder="Search by Name"
            id="search-dropdown"
            type="search"
            classNames="available-apartments__search-input"
            value={query}
            onChange={e => setSearchWith({ query: e.target.value })}
          />
        </div>
      </div>

      <ul className="available-apartments__list">
        {!!readyApartments.length ? (
          <>
            {readyApartments.map(apartment => (
              <li key={apartment.id} className="available-apartments__item">
                <ApartmentInfo
                  infoApartment={apartment}
                  classNames="available-apartments__item-info"
                />

                <div className="available-apartments__buttons">
                  <Button
                    title="Rent"
                    classNames="available-apartments__rent-button"
                    onClick={() => handleRent(apartment)}
                  />

                  <Button
                    title="Delete"
                    classNames="available-apartments__delete-button"
                    onClick={() => handleDelete(apartment)}
                  />
                </div>
              </li>
            ))}
          </>
        ) : (
          <h3 className="available-apartments__item">Not found Apartments</h3>
        )}
      </ul>
    </div>
  );
};
