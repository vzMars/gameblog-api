import { connect } from 'mongoose';
import env from '../utils/validateEnv';

const connectDB = async () => {
  try {
    const conn = await connect(env.DATABASE_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
