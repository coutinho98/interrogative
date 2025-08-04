import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VoteDto } from './dto/vote.dto';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) { }

  async findRandom(): Promise<any> {
    const count = await this.prisma.question.count();
    const randomIndex = Math.floor(Math.random() * count);

    const randomQuestion = await this.prisma.question.findMany({
      skip: randomIndex,
      take: 1,
    });

    return randomQuestion[0];
  }

  async registerVote(voteDto: VoteDto): Promise<any> {
    const { questionId, option } = voteDto;

    const updateData = option === 'optionA'
      ? { votesA: { increment: 1 } }
      : { voteB: { increment: 1 } }

    return this.prisma.question.update({
      where: { id: questionId },
      data: updateData
    })
  }

  async findAll(): Promise<any> {
    return this.prisma.question.findMany();
  }
}