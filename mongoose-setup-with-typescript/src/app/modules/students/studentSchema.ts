import { model, Schema } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TStudentMethods,
  TStudentModel,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is must be required!'],
    maxlength: [14, 'Longer than the maximum allowed length - 14'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is must be required!'],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE}: is not valid!',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is must be required!'],
    trim: true,
  },
  fatherOccupation: { type: String },
  fatherContactNo: {
    type: Number,
    required: [true, 'Father contact number must be required!'],
  },
  motherName: {
    type: String,
  },
  motherOccupation: { type: String },
  motherContactNo: {
    type: Number,
    required: [true, 'Mother contact number must be required!'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  relation: { type: String },
  contactNumber: { type: Number },
  email: { type: String },
  address: { type: String },
  occupation: { type: String },
  emergencyContact: { type: String },
});

const studentSchema = new Schema<TStudent, TStudentModel, TStudentMethods>({
  id: { type: String, required: true, unique: true },
  name: {
    type: userNameSchema,
    required: [true, 'Name is must be required!'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email must be required!'],
    trim: true,
    validate: (value: string) => validator.isEmail(value),
    message: '{VALUE}: is not valid!',
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number must be required!'],
  },
  emergencyContactNumber: { type: String, required: true },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not supported',
    },
    required: [true, 'Gender must be required!'],
  },
  dateOfBirth: {
    type: String,
    required: [true, 'Birth date must be required!'],
  },
  age: { type: Number, required: [true, 'Age must be required!'] },
  BloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
    required: true,
  },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
});

studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await StudentModel.findOne({ id });
  return existingUser;
};

export const StudentModel = model<TStudent, TStudentModel>(
  'Student',
  studentSchema,
);
