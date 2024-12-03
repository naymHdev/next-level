import { z } from 'zod';

const academicFacultyValidationSchema = z.object({
  name: z.string({
    required_error: 'Academic faculty must be string',
  }),
});

export const AcademicFacultyValidations = {
  academicFacultyValidationSchema,
};
