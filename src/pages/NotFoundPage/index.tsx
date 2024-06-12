import notFoundImg from '../../images/page-not-found.png';
import './index.scss';

export const NotFoundPage = () => (
  <div
    className="not-found-page"
    style={{ backgroundImage: `url(${notFoundImg})` }}
  />
);
