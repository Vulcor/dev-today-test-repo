import { ApiProperty } from '@nestjs/swagger';

export class CountryHolydayDto {
  @ApiProperty({ type: String })
  date: string;

  @ApiProperty({ type: String })
  localName: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  countryCode: string;

  @ApiProperty({ type: Boolean })
  fixed: boolean;

  @ApiProperty({ type: Boolean })
  global: boolean;

  @ApiProperty()
  counties: any;

  @ApiProperty()
  launchYear: any;

  @ApiProperty({ type: [String] })
  types: string[];
}
