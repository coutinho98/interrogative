import { Module } from '@nestjs/common';
import { QuestionsModule } from './questions/questions.module';
import { PrismaModule } from './prisma/prisma.module';
import { GeminiModule } from './gemini/gemini.module';
import { CliModule } from './cli/cli.module';

@Module({
  imports: [
    QuestionsModule,
    PrismaModule,
    GeminiModule,
    CliModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}