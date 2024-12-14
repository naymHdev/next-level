import { model, Schema } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

// Create the Mongoose schema
const UserSchema = new Schema<IUser, UserModel>(
  {
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
      enum: ['admin', 'student', 'faculty'],
      required: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      required: true,
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post '' after save middleware in db
UserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

UserSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id });
};

UserSchema.statics.isUserPasswordMatch = async function(plainTextPass, hasPass){
  return await bcrypt.compare(plainTextPass, hasPass)
}

export const User = model<IUser, UserModel>('User', UserSchema);
