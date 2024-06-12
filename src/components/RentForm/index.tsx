import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '../Button';
import { RentInput } from '../RentInput';
import { Apartment } from '../../types/formValues';
import { RentTextarea } from '../RentTextarea';
import './index.scss';

const rentSchema = z.object({
  id: z.coerce.string(),
  name: z.coerce.string().min(2, 'Title is required'),
  rooms: z.coerce
    .number()
    .min(1, 'Rooms must be at least 1')
    .max(7, 'Rooms should be no more than 7 rooms.'),
  price: z.coerce
    .number()
    .min(0, 'Price must be positive')
    .max(10_000, 'Price must be at most 10000'),
  description: z.string().min(10, 'Description is required'),
});

export type RentFormValues = z.infer<typeof rentSchema>;

interface Props {
  className?: string;
  onNewRent: React.Dispatch<React.SetStateAction<Apartment[]>>;
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
        title="Name"
        errorMessage={errors.name?.message || ''}
        {...register('name')}
        placeholder="Name"
      />

      <RentInput
        type="number"
        title="Rooms"
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
