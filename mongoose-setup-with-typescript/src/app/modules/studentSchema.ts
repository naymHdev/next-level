import { Schema, model } from 'mongoose';
import { Student } from './students/student.interface';

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String },
  },
  email: { type: String },
  contactNumber: { type: String, required: true },
  emergencyContactNumber: { type: String, required: true },
  gender: ['male', 'female'],
  dateOfBirth: { type: String, required: true },
  age: { type: Number, required: true },
  BloodGroup: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
  guardian: {
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContactNo: { type: Number, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    motherContactNo: { type: Number, required: true },
  },
  localGuardian: {
    name: { type: String, required: true },
    relation: { type: String },
    contactNumber: { type: Number },
    email: { type: String },
    address: { type: String },
    occupation: { type: String },
    emergencyContact: { type: String },
  },
});
