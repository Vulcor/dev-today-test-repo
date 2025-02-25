import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CountryService } from './services/country.service';
import { CountryController } from './controllers/country.controller';

@Module({
  imports: [HttpModule],
  providers: [CountryService],
  controllers: [CountryController],
})
export class CountryModule {}
