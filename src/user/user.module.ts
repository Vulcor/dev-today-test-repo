// @nest
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { UserService } from './services/user.service';
import { User, UserSchema } from 'src/core/dal/mongoDB/schemas/user.schema';
import { UserRepository } from 'src/core/dal/mongoDB/repositories/user.repository';
import { UserDeletionService } from './services/user-deletion.service';
import { CountryController } from './controllers/country.controller';
import { Event, EventSchema } from 'src/core/dal/mongoDB/schemas/event.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    HttpModule,
  ],
  providers: [UserService, UserDeletionService, UserRepository],
  exports: [UserService, UserDeletionService],
  controllers: [CountryController],
})
export class UserModule {}
