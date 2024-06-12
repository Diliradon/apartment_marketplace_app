import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import cn from 'classnames';

import { Option } from '../../types/formValues';
import arrowIcon from '../../images/arrow-icon.svg';
import './index.scss';

interface Props {
  options: Option[];
  initialOption: Option;
  onClickOptipn: (value: Option) => void;
}

export const DropdownButton: React.FC<Props> = ({
  options,
  initialOption,
  onClickOptipn,
}) => {
  const [dropdownToggle, setDropdownToggle] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelectOption = (value: Option) => {
    onClickOptipn(value);

    setDropdownToggle(false);
  };

  const handleClickOutside = () => {
    setDropdownToggle(false);
  };

  useOnClickOutside<HTMLDivElement>([dropdownRef], handleClickOutside);

  return (
    <button
      onClick={() => setDropdownToggle(!dropdownToggle)}
      className={cn(
        'dropdown-button',
        dropdownToggle && 'dropdown-buuton--active',
      )}
      ref={dropdownRef}
    >
      {initialOption.option}
      <img
        className={cn(
          'dropdown-button__icon',
          !dropdownToggle && 'dropdown-button__icon--active',
        )}
        src={arrowIcon}
        alt="Arrow Icon"
      />
      <div
        className={cn(
          'dropdown-button__list',
          dropdownToggle && 'dropdown-button__list--active',
        )}
      >
        {options.map(option => (
          <button
            key={option.id}
            className="dropdown-button__list-option"
            onClick={() => handleSelectOption(option)}
          >
            {option.option}
          </button>
        ))}
      </div>
    </button>
  );
};
