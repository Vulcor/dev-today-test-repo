// @nest
import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { UserRepository } from 'src/core/dal/mongoDB/repositories/user.repository';
import { ApiCountryDto } from '../dtos/api-country.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CountryBorderingInfoDto } from '../dtos/country-info.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  public constructor(
    private readonly userRepository: UserRepository,
    private readonly httpService: HttpService,
  ) {}

  public async getAllAvailableCountries(): Promise<ApiCountryDto[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<ApiCountryDto[]>('https://date.nager.at/api/v3/AvailableCountries').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error?.response?.data);
          throw new InternalServerErrorException(
            'An error happened during countries fetching process. Check console for error data.',
          );
        }),
      ),
    );
    return data;
  }

  public async getCountryInfo(countryCode: string): Promise<any> {
    const countryInfo: CountryBorderingInfoDto = await this.getBorderingInfoAndName(countryCode);

    const [pupulationData, flagData] = await Promise.all([
      this.getCountryPopulationData(countryInfo.commonName),
      this.getCountryFlagImageUrl(countryInfo.commonName),
    ]);

    return {
      borderingCountries: countryInfo.borders,
      pupulationData,
      flagData,
    };
  }

  private async getBorderingInfoAndName(countryCode: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get<CountryBorderingInfoDto>(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error?.response?.data);
          throw new InternalServerErrorException(
            'An error happened during bordering countries fetching. Check console for error data.',
          );
        }),
      ),
    );
    return data;
  }

  private async getCountryPopulationData(countryName: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get(`https://countriesnow.space/api/v0.1/countries/population`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error?.response?.data);
          throw new InternalServerErrorException(
            'An error happened during population data fetching. Check console for error data.',
          );
        }),
      ),
    );
    const countryInfo = data.data?.find((countryData) => countryData.country === countryName);
    return countryInfo?.populationCounts;
  }

  private async getCountryFlagImageUrl(countryName: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get(`https://countriesnow.space/api/v0.1/countries/flag/images`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error?.response?.data);
          throw new InternalServerErrorException(
            'An error happened during bordering countries fetching. Check console for error data.',
          );
        }),
      ),
    );
    const countryInfo = data.data?.find((countryData) => countryData.name === countryName);
    return countryInfo?.flag;
  }
}
