import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: 'users',
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.log('Error: ', error);
  }
};
