import { Module } from '@nestjs/common';
import { CliService } from './cli.service';
import { GeminiModule } from '../gemini/gemini.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [GeminiModule, PrismaModule],
  providers: [CliService],
  exports: [CliService], 
})
export class CliModule {}