// @nest
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { UserService } from './services/user.service';
import { User, UserSchema } from 'src/core/dal/mongoDB/schemas/user.schema';
import { Event, EventSchema } from 'src/core/dal/mongoDB/schemas/event.schema';
import { UserRepository } from 'src/core/dal/mongoDB/repositories/user.repository';
import { UserDeletionService } from './services/user-deletion.service';
import { UserController } from './controllers/user.controller';
import { HttpModule } from '@nestjs/axios';
import { EventRepository } from 'src/core/dal/mongoDB/repositories/event.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HttpModule,
  ],
  providers: [UserService, UserDeletionService, UserRepository, EventRepository],
  exports: [UserService, UserDeletionService],
  controllers: [UserController],
})
export class UserModule {}
