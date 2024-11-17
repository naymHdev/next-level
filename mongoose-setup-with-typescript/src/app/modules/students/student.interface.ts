import { Schema, model, connect } from 'mongoose';

interface Guardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: number;
  motherName: string;
  motherOccupation: string;
  motherContactNo: number;
}

interface UserName {
  firstName: string;
  lastName: string;
}
interface LocalGuardian {
  name: string;
  relation: string;
  contactNumber: number;
  email?: string;
  address: string;
  occupation?: string;
  emergencyContact?: string;
}

export interface Student {
  id: string;
  name: UserName;
  email: string;
  contactNumber: string;
  emergencyContactNumber: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  age: number;
  BloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  guardian: Guardian;
  localGuardian: LocalGuardian;
}
