import { ApiProperty } from '@nestjs/swagger';
import { CountryBorderingInfoDto } from './country-info.dto';
import { CountryPopulationDataDto } from './country-population-data.dto';

export class CountryInfoResponseDto {
  @ApiProperty({ type: CountryBorderingInfoDto })
  borderingCountries: [CountryBorderingInfoDto];

  @ApiProperty({ type: CountryPopulationDataDto })
  pupulationData: [CountryPopulationDataDto];

  @ApiProperty({ type: String })
  flagData: string;
}
