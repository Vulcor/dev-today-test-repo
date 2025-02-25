import { ConfigModuleOptions } from '@nestjs/config';

export default (): ConfigModuleOptions => ({
  envFilePath: '.env.development.local',
  isGlobal: true,
  expandVariables: true,
});
