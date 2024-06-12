/* eslint-disable no-param-reassign */
import { forwardRef } from 'react';

import './index.scss';

interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  title: string;
  autoGrow?: boolean;
  errorMessage: string;
}

export const RentTextarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ title, autoGrow = true, errorMessage, ...rest }, ref) => {
    return (
      <label className="rent-textarea">
        <h4 className="rent-textarea__title">{title}</h4>

        <textarea
          ref={ref}
          onInput={
            autoGrow
              ? (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }
              : undefined
          }
          {...rest}
          className="rent-textarea__field"
        />

        {!!errorMessage && (
          <p className="rent-textarea__error-message">
            <span className="rent-textarea__error-icon">!</span>
            {errorMessage}
          </p>
        )}
      </label>
    );
  },
);

RentTextarea.displayName = 'RentTextarea';
