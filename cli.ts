import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { CliService } from './src/cli/cli.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const cliService = app.get(CliService);

  const count = process.argv[2] ? parseInt(process.argv[2]) : 10;
  if (isNaN(count)) {
    console.error('O argumento precisa ser um número.');
    process.exit(1);
  }

  await cliService.generateQuestions(count);
  await app.close();
}

bootstrap();