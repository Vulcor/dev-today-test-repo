import { ApiProperty } from '@nestjs/swagger';

export class CountryBorderingInfoDto {
  @ApiProperty({ type: String })
  commonName: string;

  @ApiProperty({ type: String })
  officialName: string;

  @ApiProperty({ type: String })
  countryCode: string;

  @ApiProperty({ type: String })
  region: string;

  @ApiProperty({ type: CountryBorderingInfoDto })
  borders: [CountryBorderingInfoDto] | null;
}
