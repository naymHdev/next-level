import { z } from 'zod';

// UserName Validation Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is must be required!',
    })
    .max(14, 'Longer than the maximum allowed length - 14')
    .trim(),
  lastName: z
    .string({
      required_error: 'Last name is must be required!',
    })
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: '{VALUE}: is not valid!',
    }),
});

// Guardian Validation Schema
const guardianValidationSchema = z.object({
  fatherName: z
    .string({
      required_error: 'Father name is must be required!',
    })
    .trim(),
  fatherOccupation: z.string({
    required_error: 'Father occupation is required!',
  }),
  fatherContactNo: z.number({
    required_error: 'Father contact number must be required!',
  }),
  motherName: z
    .string({
      required_error: 'Mother name is must be required!',
    })
    .trim(),
  motherOccupation: z.string(),
  motherContactNo: z.number({
    required_error: 'Mother contact number must be required!',
  }),
});

// Local Guardian Validation Schema
const localGuardianValidationSchema = z.object({
  name: z.string({
    required_error: 'Name is required!',
  }),
  relation: z.string(),
  contactNumber: z.number(),
  email: z.string().email(),
  address: z.string(),
  occupation: z.string(),
  emergencyContact: z.string(),
});

// Student Validation Schema
const studentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: userNameValidationSchema,
      email: z
        .string({
          required_error: 'Email must be required!',
        })
        .email(),
      contactNumber: z.string({
        required_error: 'Contact number must be required!',
      }),
      emergencyContactNumber: z.string({
        required_error: 'Emergency contact number must be required!',
      }),
      gender: z.enum(['male', 'female'], {
        required_error: 'Gender must be required!',
      }),
      dateOfBirth: z
        .date({
          required_error: 'Birth date must be required!',
        })
        .optional(),
      age: z
        .number({
          required_error: 'Age must be required!',
        })
        .int(),
      BloodGroup: z.enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'], {
        required_error: 'Blood group must be required!',
      }),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
    }),
  }),
});

export const studentValidations = {
  studentValidationSchema,
};
