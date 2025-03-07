import { Module } from '@nestjs/common';
import getConfigModuleConfig from './core/config/config-module.config';
import mongooseConfig from './core/config/mongoose.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterModule } from './register/register.module';
import { CountryModule } from './country/country.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ...getConfigModuleConfig(),
      load: [mongooseConfig],
    }),
    MongooseModule.forRootAsync({
      useFactory: mongooseConfig,
    }),
    UserModule,
    RegisterModule,
    CountryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
