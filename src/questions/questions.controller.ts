import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { VoteDto } from './dto/vote.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) { }

  @Get('random')
  async findRandomQuestion() {
    return this.questionsService.findRandom();
  }

  @Post('vote')
  async registerVote(@Body() voteDto: VoteDto) {
    return this.questionsService.registerVote(voteDto)
  }
}