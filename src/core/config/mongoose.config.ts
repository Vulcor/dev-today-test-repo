import { MongooseModuleOptions } from '@nestjs/mongoose';

export default (): MongooseModuleOptions => ({
  uri: process.env.MONGO_URL,
  autoCreate: false,
  autoIndex: false,
});
