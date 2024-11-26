import mongoose, { Schema } from 'mongoose';
import { IUser } from './user.interface';

// Create the Mongoose schema
const UserSchema: Schema = new Schema<IUser>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  needsPasswordChange: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['admin', 'student', 'faculty'],
    required: true,
  },
  isDeleted: {
    type: String,
    required: true,
    default: 'false',
  },
});

// Export the Mongoose model
export const User = mongoose.model<IUser>('User', UserSchema);
