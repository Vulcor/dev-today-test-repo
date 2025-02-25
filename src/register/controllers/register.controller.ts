import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterService } from '../services/register.service';
import { RegisterDto } from '../dtos/register.dto';
import { User } from 'src/core/dal/mongoDB/schemas/user.schema';

@Controller('register')
@ApiTags('Register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  register(@Body() registerDto: RegisterDto): Promise<User> {
    return this.registerService.registerViaUsername(registerDto.username, registerDto.password);
  }
}
