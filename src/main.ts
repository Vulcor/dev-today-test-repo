import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './core/config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import getValidationPipeConfig from './core/config/request-validation.config';

const port = process.env.NEST_PORT || 3002;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe(getValidationPipeConfig()));

  app.setGlobalPrefix('api');
  initSwagger(app);

  await app.listen(port);
}

bootstrap().then(() => {
  console.log(`Listening on port: ${port}`);
});
