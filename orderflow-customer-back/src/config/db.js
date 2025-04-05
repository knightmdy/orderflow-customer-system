import mongoose from 'mongoose';
import config from './environment';
import logger from '../utils/logger';

mongoose.Promise = global.Promise;

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger.info('MongoDB 连接成功');
  } catch (err) {
    logger.error('MongoDB 连接失败:', err);
    process.exit(1);
  }
};

export default connectDB;
