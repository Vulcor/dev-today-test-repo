// @nest
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Types } from 'mongoose';

import { UserRepository } from 'src/core/dal/mongoDB/repositories/user.repository';

@Injectable()
export class UserDeletionService {
  private readonly logger = new Logger(UserDeletionService.name);

  public constructor(private readonly userRepository: UserRepository) {}

  public async deleteUser(id: string | Types.ObjectId): Promise<void> {
    try {
      await this.userRepository.delete(id);
    } catch (err) {
      throw new InternalServerErrorException(err.message | err);
    }
  }
}
