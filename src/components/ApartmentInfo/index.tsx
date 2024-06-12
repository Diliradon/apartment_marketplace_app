import { Apartment } from '../../types/formValues';
import './index.scss';

interface Props {
  classNames?: string;
  infoApartment: Apartment;
}

export const ApartmentInfo: React.FC<Props> = ({
  classNames = '',
  infoApartment,
}) => (
  <ul className={`apartment-info ${classNames}`}>
    <li className="apartment-info__details-item">
      <span className="apartment-info__details-item-span">Name:</span>

      <span className="apartment-info__details-item-span">
        {infoApartment.name}
      </span>
    </li>

    <li className="apartment-info__details-item">
      <span className="apartment-info__details-item-span">Rooms:</span>

      <span className="apartment-info__details-item-span">
        {infoApartment.rooms}
      </span>
    </li>

    <li className="apartment-info__details-item">
      <span className="apartment-info__details-item-span">Price:</span>

      <span className="apartment-info__details-item-span">
        {infoApartment.price}
      </span>
    </li>

    <li className="apartment-info__details-item">
      <span className="apartment-info__details-item-span">Description:</span>

      <span className="apartment-info__details-item-span">
        {infoApartment.description}
      </span>
    </li>
  </ul>
);
