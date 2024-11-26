import { model, Schema } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TStudentModel,
  TUserName,
} from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

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

const studentSchema = new Schema<TStudent, TStudentModel>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true, max: 10 },
    name: {
      type: userNameSchema,
      required: [true, 'Name is must be required!'],
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'Id is required!'],
      unique: true,
      ref: 'User',
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//  mongoose virtual

studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.lastName}`;
});

// Pre save middleware
studentSchema.pre('save', async function (next) {
  // has password and save data in db

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post after save middleware
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// Query Middleware
studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', async function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

//  use aggregation

studentSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//  Creating a custom  ic method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await StudentModel.findOne({ id });

  return existingUser;
};

// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await StudentModel.findOne({ id });
//   return existingUser;
// };

export const StudentModel = model<TStudent, TStudentModel>(
  'Student',
  studentSchema,
);
