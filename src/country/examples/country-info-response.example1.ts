import { CountryInfoResponseDto } from '../dtos/country-info-response.dto';

export const countryInfoResponseDtoExample: CountryInfoResponseDto = {
  borderingCountries: [
    {
      commonName: 'Hungary',
      officialName: 'Hungary',
      countryCode: 'HU',
      region: 'Europe',
      borders: null,
    },
  ],
  pupulationData: [
    {
      year: 1960,
      value: 42664652,
    },
  ],
  flagData: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg',
};
