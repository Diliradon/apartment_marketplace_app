import { RentFormValues } from '../schemas/rentSchema';

export const getPreparedApartments = (
  apartments: RentFormValues[],
  filterBy: string,
  sortBy: string,
  query: string,
): RentFormValues[] => {
  let preparedApartments = [...apartments];

  if (filterBy !== 'All') {
    const numberOfRooms = parseInt(filterBy, 10);

    if (!isNaN(numberOfRooms)) {
      preparedApartments = preparedApartments.filter(
        apartment => apartment.rooms === numberOfRooms,
      );
    }
  }

  if (sortBy === 'highest to lowest') {
    preparedApartments = preparedApartments.sort((a, b) => +b.price - +a.price);
  } else {
    preparedApartments = preparedApartments.sort((a, b) => +a.price - +b.price);
  }

  if (!!query.length) {
    const lowerCaseQuery = query.toLowerCase();

    preparedApartments = preparedApartments.filter(apartment =>
      apartment.name.toLowerCase().includes(lowerCaseQuery),
    );
  }

  return preparedApartments;
};
