import { Injectable } from '@nestjs/common';
import { GeminiService } from '../gemini/gemini.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CliService {
  constructor(
    private readonly geminiService: GeminiService,
    private readonly prisma: PrismaService,
  ) {}

  async generateQuestions(count: number = 10) {
    console.log(`Gerando ${count} perguntas com a IA...`);
    
    try {
      const questionsData = await this.geminiService.generateQuestions(count);
      
      for (const [i, q] of questionsData.entries()) {
        const existingQuestion = await this.prisma.question.findFirst({
          where: {
            OR: [
              { optionA: q.optionA, optionB: q.optionB },
              { optionA: q.optionB, optionB: q.optionA },
            ],
          },
        });

        if (existingQuestion) {
          console.log(`- Pergunta #${i + 1} ignorada (já existe): ${q.optionA} ou ${q.optionB}?`);
          continue; 
        }
        
        await this.prisma.question.create({ data: q });
        console.log(`- Pergunta #${i + 1} gerada e salva: ${q.optionA} ou ${q.optionB}?`);
      }

    } catch (error) {
      console.error(`Erro ao gerar as perguntas:`, error);
    }
    
    console.log('Geração de perguntas concluída.');
  }
}