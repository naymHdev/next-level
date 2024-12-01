import { z } from 'zod';

const createAcademicSemesterValidationSchema = z.object({
  name: z.string(),
  code: z.string(),
  year: z.string(),
  startMonth: z.string(),
  endMonth: z.string(),
});

export const AcademicSemesterValidations = {
  createAcademicSemesterValidationSchema,
};
