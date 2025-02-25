import { ConfigModuleOptions } from '@nestjs/config';
import getEnvValidationSchema from '../validation/env.validation';

export default (): ConfigModuleOptions => ({
  envFilePath: '.env.development.local',
  validationSchema: getEnvValidationSchema(),
  isGlobal: true,
  expandVariables: true,
});
