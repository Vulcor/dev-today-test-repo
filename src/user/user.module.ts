// @nest
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { UserService } from './services/user.service';
import { User, UserSchema } from 'src/core/dal/mongoDB/schemas/user.schema';
import { UserRepository } from 'src/core/dal/mongoDB/repositories/user.repository';
import { UserDeletionService } from './services/user-deletion.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserService, UserDeletionService, UserRepository],
  exports: [UserService, UserDeletionService],
})
export class UserModule {}
