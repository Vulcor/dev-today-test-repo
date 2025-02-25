import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDefined, IsNumber, IsString, MinLength } from 'class-validator';

export class PostHolidaysDto {
  @ApiProperty({ type: String, required: true, example: 'US' })
  @IsDefined()
  @IsString()
  @MinLength(2)
  countryCode: string;

  @ApiProperty({ type: String, required: true, example: 2025 })
  @IsDefined()
  @IsNumber()
  year: number;

  @ApiProperty({ type: [String], required: true, example: ["New Year's Day", 'Independence Day'] })
  @IsDefined()
  @IsArray()
  holidays: string[];
}
