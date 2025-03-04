import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 5008;
  const NODE_EV: string = configService.get<string>('NODE_ENV') || 'dev';

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
    }),
  );
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const packg = require('../package.json');

  await app.listen(port);

  Logger.log(`Environment: ${NODE_EV}`, 'Bootstrap');
  Logger.log(`ServiceName: ${packg?.name}`, 'Bootstrap');
  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
  Logger.log(`Version deployed: ${packg?.version}`, 'Bootstrap');   
}
bootstrap();
