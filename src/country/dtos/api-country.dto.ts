import { ApiProperty } from '@nestjs/swagger';

export class ApiCountryDto {
  @ApiProperty({ type: String })
  countryCode: string;

  @ApiProperty({ type: String })
  name: string;
}
