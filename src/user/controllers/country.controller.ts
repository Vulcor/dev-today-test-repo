import { Controller, Get, Logger, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiCountryDto } from '../dtos/api-country.dto';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { apiCountryDtoArrayExample } from '../examples/api-country-dto-array.example';
import { CountryInfoResponseDto } from '../dtos/country-info-response.dto';

@Controller('country')
@ApiTags('Country')
export class CountryController {
  private readonly logger = new Logger(CountryController.name);

  public constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({
    type: [ApiCountryDto],
    example: apiCountryDtoArrayExample,
  })
  getAllAvailableCountries(): Promise<ApiCountryDto[]> {
    return this.userService.getAllAvailableCountries();
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
    example: apiCountryDtoArrayExample,
  })
  getCountryInfo(@Param('countryCode') countryCode: string): Promise<any> {
    return this.userService.getCountryInfo(countryCode);
  }
}
