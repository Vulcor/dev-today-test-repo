import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configModuleConfig from './core/config/config-module.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      ...configModuleConfig(),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
