import { HttpException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import mongoose from 'mongoose';
import { UserRepository } from 'src/core/dal/mongoDB/repositories/user.repository';
import { UserDocument } from 'src/core/dal/mongoDB/schemas/user.schema';
import { UserExistsException } from 'src/core/exceptions/user-exists.exception';
import { UserDeletionService } from 'src/user/services/user-deletion.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RegisterService {
  private readonly logger = new Logger(RegisterService.name);

  public constructor(
    private readonly userDeletionService: UserDeletionService,
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  public async registerViaUsername(username: string, password: string): Promise<UserDocument> {
    let newUser: UserDocument | undefined;
    try {
      const existingUser = await this.userRepository.findOne({ username });

      if (existingUser) {
        throw new UserExistsException(username);
      }

      const hashedPassword = await this.hashPassword(password);
      newUser = await this.userRepository.create({ username, password: hashedPassword });

      return newUser;
    } catch (err) {
      if (newUser && newUser._id) await this.userDeletionService.deleteUser(newUser._id as mongoose.ObjectId);
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException(err.message | err);
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, this.configService.get<number>('PASSWOD_HASH_ROUNDS'));
    return hash;
  }

  private async comparePasswords(plaintextPassword: string, password: string): Promise<boolean> {
    const match = await bcrypt.compare(plaintextPassword, password);
    return match;
  }
}
