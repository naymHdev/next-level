import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id must be required' }),
    password: z.string({ required_error: 'Password must be required' }),
  }),
});

export const AuthValidations = {
  loginValidationSchema,
};
