import { model, Schema } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First name is must be required!'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is must be required!'],
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is must be required!'],
  },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: {
    type: Number,
    required: [true, 'Father contact number must be required!'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is must be required!'],
  },
  motherOccupation: { type: String },
  motherContactNo: {
    type: Number,
    required: [true, 'Mother contact number must be required!'],
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  relation: { type: String },
  contactNumber: { type: Number },
  email: { type: String },
  address: { type: String },
  occupation: { type: String },
  emergencyContact: { type: String },
});

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: {
    type: userNameSchema,
    required: [true, 'Name is must be required!'],
  },
  email: { type: String, required: [true, 'Email must be required!'] },
  contactNumber: {
    type: String,
    required: [true, 'Contact number must be required!'],
  },
  emergencyContactNumber: { type: String, required: true },
  gender: {
    type: String,
    enum: ['male', 'female'],
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

export const StudentModel = model<Student>('Student', studentSchema);
