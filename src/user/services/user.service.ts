import { HttpException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/core/dal/mongoDB/repositories/user.repository';
import { EventRepository } from 'src/core/dal/mongoDB/repositories/event.repository';
import { PostHolidaysDto } from '../dtos/post-holidays.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CountryHolydayDto } from '../dtos/country-holiday.dto';
import { UserDocument } from 'src/core/dal/mongoDB/schemas/user.schema';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  public constructor(
    private readonly userRepository: UserRepository,
    private readonly eventRepository: EventRepository,
    private readonly httpService: HttpService,
  ) {}

  public async getAllUsers(): Promise<UserDocument[] | null> {
    return this.userRepository.find({});
  }

  public async postHolidays(id: string, postHolidaysDto: PostHolidaysDto): Promise<any> {
    try {
      const user = await this.userRepository.getById(id);

      if (!user) throw new NotFoundException(`User by id ${id} was not found`);

      const holidays: CountryHolydayDto[] = await this.getAllCountryYearHolidays(
        postHolidaysDto.countryCode,
        postHolidaysDto.year,
      );

      const filteredHolidays = holidays
        .filter((holiday) => postHolidaysDto.holidays.includes(holiday.name))
        .map((holiday) => {
          return {
            name: holiday.name,
            date: new Date(holiday.date),
            userId: user._id,
          };
        });

      if (!filteredHolidays) throw new NotFoundException('None of the listed by user holidays were found');

      await this.eventRepository.createMany(filteredHolidays);
    } catch (err) {
      this.logger.error(err);
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException(err);
    }
  }

  private async getAllCountryYearHolidays(countryCode: string, year: number): Promise<CountryHolydayDto[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<CountryHolydayDto[]>(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`)
        .pipe(
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
}
