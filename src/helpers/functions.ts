import { RentFormValues } from '../schemas/rentSchema';
import { Option } from '../types/formValues';

export const getPreparedApartments = (
  apartments: RentFormValues[],
  filterBy: Option,
  sortBy: Option,
  query: string,
): RentFormValues[] => {
  let preparedApartments = [...apartments];

  if (filterBy.option !== 'All') {
    const numberOfRooms = parseInt(filterBy.option, 10);

    if (!isNaN(numberOfRooms)) {
      preparedApartments = preparedApartments.filter(
        apartment => apartment.rooms === numberOfRooms,
      );
    }
  }

  if (sortBy.option === 'highest to lowest') {
    preparedApartments = preparedApartments.sort((a, b) => b.price - a.price);
  }

  if (!!query.length) {
    const lowerCaseQuery = query.toLowerCase();

    preparedApartments = preparedApartments.filter(apartment =>
      apartment.name.toLowerCase().includes(lowerCaseQuery),
    );
  }

  return preparedApartments;
};