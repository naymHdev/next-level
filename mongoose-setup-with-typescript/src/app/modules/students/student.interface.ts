// Creating a student profile Interface

import { Model } from 'mongoose';

export interface TUserName {
  firstName: string;
  lastName: string;
}

export interface TGuardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: number;
  motherName: string;
  motherOccupation: string;
  motherContactNo: number;
}

export interface TLocalGuardian {
  name: string;
  relation: string;
  contactNumber: number;
  email?: string;
  address: string;
  occupation?: string;
  emergencyContact?: string;
}

export interface TStudent {
  id: string;
  name: TUserName;
  email: string;
  contactNumber: string;
  emergencyContactNumber: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  age: number;
  BloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
}

// For creating statics

// export interface TStudentMethods {
//   isUserExists(id: string): Promise<TStudent | null>;
// }

export interface TStudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}
