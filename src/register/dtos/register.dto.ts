import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ required: true, example: 'Vulcore' })
  @IsDefined()
  @MinLength(3)
  username: string;

  @ApiProperty({ required: true, example: 'qQ1!123456' })
  @IsString()
  @MinLength(8)
  @IsDefined()
  @IsStrongPassword(
    { minLowercase: 1, minUppercase: 1, minSymbols: 1 },
    { message: 'password must contain a lowercase letter, an uppercase letter and a special character.' },
  )
  password: string;
}
