import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { PostHolidaysDto } from '../dtos/post-holidays.dto';
import { UserDocument } from 'src/core/dal/mongoDB/schemas/user.schema';

@Controller('users')
@ApiTags('Users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  public constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): Promise<UserDocument[] | null> {
    return this.userService.getAllUsers();
  }

  @Post(':userId/calendar/holidays')
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'Id of a user',
    type: String,
    example: '67bdb3b403ce88851a3eb6d2',
  })
  postHolidays(@Param('userId') userId: string, @Body() postHolidaysDto: PostHolidaysDto): Promise<any> {
    return this.userService.postHolidays(userId, postHolidaysDto);
  }
}
