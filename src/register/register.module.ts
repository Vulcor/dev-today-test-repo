// @nest
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/core/dal/mongoDB/schemas/user.schema';
import { UserModule } from 'src/user/user.module';
import { RegisterController } from './controllers/register.controller';
import { UserRepository } from 'src/core/dal/mongoDB/repositories/user.repository';
import { RegisterService } from './services/register.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), UserModule],
  controllers: [RegisterController],
  providers: [RegisterService, UserRepository],
})
export class RegisterModule {}
