import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { VoteDto } from './dto/vote.dto';
import { QuestionResultDto } from './dto/question-result.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) { }

  @Get('random')
  async findRandomQuestion() {
    return this.questionsService.findRandom();
  }

  @Post('vote')
  async registerVote(@Body() voteDto: VoteDto): Promise<QuestionResultDto> {
    return this.questionsService.registerVote(voteDto);
  }

  @Get('all')
  async findAllQuestions() {
    return this.questionsService.findAll();
  }
}