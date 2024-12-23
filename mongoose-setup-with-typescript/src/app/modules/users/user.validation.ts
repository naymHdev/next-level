import { z } from 'zod';
import { UserStatus } from './user.constant';

// Define the Zod schema for IUser
export const userValidationSchema = z.object({
  id: z.string().min(1, { message: 'ID is required and cannot be empty.' }),
  password: z
    .string({
      invalid_type_error: 'Password must be text',
    })
    .min(6, { message: 'Password must be at least 6 characters long.' })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),
});

export const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});
