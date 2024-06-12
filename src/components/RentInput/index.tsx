import { forwardRef } from 'react';

import './index.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  classNames?: string;
  title?: string;
  errorMessage?: string;
}

export const RentInput = forwardRef<HTMLInputElement, Props>(
  ({ classNames, title, errorMessage, ...rest }, ref) => {
    return (
      <label className={`rent-input ${classNames}`}>
        <h4 className="rent-input__title">{title}</h4>

        <input ref={ref} {...rest} className="rent-input__field" />

        {!!errorMessage && (
          <p className="rent-input__error-message">
            <span className="rent-input__error-icon">!</span>
            {errorMessage}
          </p>
        )}
      </label>
    );
  },
);

RentInput.displayName = 'LoginInput';
