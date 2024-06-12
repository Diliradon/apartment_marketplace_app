import { useLocalStorage } from 'usehooks-ts';

import { RentForm } from '../../components/RentForm';
import { Apartment } from '../../types/formValues';
import { CurrentRent } from '../../components/CurrentRent';
import { AvailableApartments } from '../../components/AvailableApartments';
import './index.scss';

const initialAvailableApartments = [
  {
    id: '12',
    name: 'Market square apartments',
    rooms: 1,
    price: 2,
    description: 'Description',
  },
  {
    id: '123',
    name: 'Sun Hotel',
    rooms: 1,
    price: 1,
    description: 'Description',
  },
  {
    id: '123',
    name: 'Cozy Room',
    rooms: 1,
    price: 1,
    description: 'Description',
  },
];

export const HomePage = () => {
  const [currentRent, setCurrentRent] = useLocalStorage<Apartment | null>(
    'currentRent',
    null,
  );
  const [availableApartments, setAvailableApartments] = useLocalStorage<
    Apartment[]
  >('availableApartments', initialAvailableApartments);

  return (
    <main className="home-page">
      <RentForm
        className="home-page__rent-form"
        onNewRent={setAvailableApartments}
      />

      <section className="home-page__section">
        <CurrentRent
          currentRent={currentRent}
          setCurrentRent={setCurrentRent}
        />

        <AvailableApartments
          apartments={availableApartments}
          setApartments={setAvailableApartments}
          setCurrentRent={setCurrentRent}
        />
      </section>
    </main>
  );
};
