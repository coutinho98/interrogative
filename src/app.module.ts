import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './questions/questions.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [QuestionsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}