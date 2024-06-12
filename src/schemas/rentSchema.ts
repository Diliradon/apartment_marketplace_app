/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod';

export const rentSchema = z.object({
  id: z.coerce.string(),
  name: z.coerce
    .string()
    .min(2, 'Apartment name must be at least 2 symbols')
    .refine(value => /\S/.test(value), {
      message: 'Apartment name cannot be only spaces',
    }),
  rooms: z.coerce
    .number()
    .min(1, 'Rooms must be at least 1')
    .max(7, 'Rooms should be no more than 7 rooms.'),
  price: z.coerce
    .number()
    .min(1, 'Price must be positive')
    .max(10_000, 'Price must be at most 10000'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 symbols')
    .refine(value => /\S/.test(value), {
      message: 'Description name cannot be only spaces',
    }),
});

export type RentFormValues = z.infer<typeof rentSchema>;
