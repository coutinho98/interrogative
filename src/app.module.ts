import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './questions/questions.module';
import { PrismaModule } from './prisma/prisma.module';
import { GeminiModule } from './gemini/gemini.module';

@Module({
  imports: [QuestionsModule, PrismaModule, GeminiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}