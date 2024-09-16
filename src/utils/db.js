import mongoose from 'mongoose';

const connectToMongoDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.info('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export { connectToMongoDB };
