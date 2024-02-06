import mongoose, { Schema } from 'mongoose';

mongoose.connect(process.env.MONGODB_URI as string);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full Name is required.'],
    },
    email: {
      type: String,
      unique: [true, 'Email already exists!'],
      required: [true, 'Email is required.'],
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
