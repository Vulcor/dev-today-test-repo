import { ApiProperty } from '@nestjs/swagger';

export class CountryPopulationDataDto {
  @ApiProperty({ type: Number })
  year: number;

  @ApiProperty({ type: Number })
  value: number;
}
