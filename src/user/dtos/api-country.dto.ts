import { ApiProperty } from '@nestjs/swagger';

export class ApiCountryDto {
  @ApiProperty()
  countryCode: string;

  @ApiProperty()
  name: string;
}
