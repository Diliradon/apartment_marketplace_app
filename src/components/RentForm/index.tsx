import React from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../Button';
import { RentInput } from '../RentInput';
import { RentTextarea } from '../RentTextarea';
import { RentFormValues, rentSchema } from '../../schemas/rentSchema';
import './index.scss';

interface Props {
  className?: string;
  onNewRent: React.Dispatch<React.SetStateAction<RentFormValues[]>>;
}

export const RentForm: React.FC<Props> = ({ onNewRent, className = '' }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RentFormValues>({
    resolver: zodResolver(rentSchema),
  });

  const onSubmit = (data: RentFormValues) => {
    if (rentSchema) {
      onNewRent(current => [
        ...current,
        {
          ...data,
          id: uuidv4(),
        },
      ]);
    }

    reset();
  };

  return (
    <form
      className={cn('rent-form', className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="rent-form__title">Create a new rent</h2>

      <RentInput
        type="text"
        title="Apartment name"
        errorMessage={errors.name?.message || ''}
        {...register('name')}
        placeholder="Name"
      />

      <RentInput
        type="number"
        title="Number of rooms"
        errorMessage={errors.rooms?.message || ''}
        {...register('rooms')}
        placeholder="Rooms"
      />

      <RentInput
        type="number"
        title="Price"
        errorMessage={errors.price?.message || ''}
        {...register('price')}
        placeholder="Price"
      />

      <RentTextarea
        type="number"
        title="Description"
        errorMessage={errors.description?.message || ''}
        {...register('description')}
        placeholder="Description"
      />

      <Button type="submit" title="Submit rent" />
    </form>
  );
};
