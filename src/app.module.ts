import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import getConfigModuleConfig from './core/config/config-module.config';
import { MongooseModule } from '@nestjs/mongoose';
import mongooseConfig from './core/config/mongoose.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      ...getConfigModuleConfig(),
      load: [mongooseConfig],
    }),
    MongooseModule.forRootAsync({
      useFactory: mongooseConfig,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
