import { ConfigModuleOptions } from '@nestjs/config';
import envSchemaValidation from '../validation/env-schema.validation';

export default (): ConfigModuleOptions => ({
  envFilePath: '.env.development.local',
  validationSchema: envSchemaValidation(),
  isGlobal: true,
  expandVariables: true,
});
