import Joi from 'joi';

// UserName schema
const userNameSchema = Joi.object({
  firstName: Joi.string().trim().max(14).required().messages({
    'string.empty': 'First name is must be required!',
    'string.max': 'First name cannot be longer than 14 characters!',
  }),
  lastName: Joi.string()
    .trim()
    .regex(/^[a-zA-Z]+$/)
    .required()
    .messages({
      'string.empty': 'Last name is must be required!',
      'string.pattern.base': '{#label} must contain only alphabets!',
    }),
});

// Guardian schema
const guardianSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    'string.empty': 'Father name is must be required!',
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.empty': 'Father occupation is must be required!',
  }),
  fatherContactNo: Joi.number().required().messages({
    'number.base': 'Father contact number must be a number!',
    'any.required': 'Father contact number must be required!',
  }),
  motherName: Joi.string().trim().required().messages({
    'string.empty': 'Mother name is must be required!',
  }),
  motherOccupation: Joi.string().optional(),
  motherContactNo: Joi.number().required().messages({
    'number.base': 'Mother contact number must be a number!',
    'any.required': 'Mother contact number must be required!',
  }),
});

// LocalGuardian schema
const localGuardianSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Local guardian name is must be required!',
  }),
  relation: Joi.string().optional(),
  contactNumber: Joi.number().optional(),
  email: Joi.string().email().optional().messages({
    'string.email': '{#label} must be a valid email!',
  }),
  address: Joi.string().optional(),
  occupation: Joi.string().optional(),
  emergencyContact: Joi.string().optional(),
});

// Student schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'ID must be required!',
  }),
  name: userNameSchema.required().messages({
    'any.required': 'Name is must be required!',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email must be required!',
    'string.email': '{#label} must be a valid email!',
  }),
  contactNumber: Joi.string().required().messages({
    'string.empty': 'Contact number must be required!',
  }),
  emergencyContactNumber: Joi.string().required().messages({
    'string.empty': 'Emergency contact number must be required!',
  }),
  gender: Joi.string().valid('male', 'female').required().messages({
    'any.only': '{#value} is not a supported gender!',
    'any.required': 'Gender must be required!',
  }),
  dateOfBirth: Joi.string().required().messages({
    'string.empty': 'Birth date must be required!',
  }),
  age: Joi.number().required().messages({
    'number.base': 'Age must be a number!',
    'any.required': 'Age must be required!',
  }),
  BloodGroup: Joi.string()
    .valid('A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-')
    .required()
    .messages({
      'any.only': '{#value} is not a valid blood group!',
    }),
  guardian: guardianSchema.required().messages({
    'any.required': 'Guardian information is must be required!',
  }),
  localGuardian: localGuardianSchema.required().messages({
    'any.required': 'Local guardian information is must be required!',
  }),
});

export default studentValidationSchema;
