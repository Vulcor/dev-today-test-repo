import { BadRequestException } from '@nestjs/common';

export class UserExistsException extends BadRequestException {
  constructor(username: string) {
    super(`User with username ${username} already exists.`);
  }
}
