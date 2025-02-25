import { Controller, Get, Logger, Param } from '@nestjs/common';
import { CountryService } from '../services/country.service';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiCountryDto } from '../dtos/api-country.dto';
import { CountryInfoResponseDto } from '../dtos/country-info-response.dto';
import { countryInfoResponseDtoExample } from '../examples/country-info-response.example1';
import { apiCountryDtoArrayExample } from '../examples/api-country-dto-array.example';

@Controller('countries')
@ApiTags('Countries')
export class CountryController {
  private readonly logger = new Logger(CountryController.name);

  public constructor(private readonly countryService: CountryService) {}

  @Get()
  @ApiOkResponse({
    type: [ApiCountryDto],
    example: apiCountryDtoArrayExample,
  })
  getAllAvailableCountries(): Promise<ApiCountryDto[]> {
    return this.countryService.getAllAvailableCountries();
  }

  @Get(':countryCode')
  @ApiParam({
    name: 'countryCode',
    required: true,
    description: 'country code that can be taken from the list of all countries',
    type: String,
    example: 'UA',
  })
  @ApiOkResponse({
    type: CountryInfoResponseDto,
    example: countryInfoResponseDtoExample,
  })
  getCountryInfo(@Param('countryCode') countryCode: string): Promise<any> {
    return this.countryService.getCountryInfo(countryCode);
  }
}
