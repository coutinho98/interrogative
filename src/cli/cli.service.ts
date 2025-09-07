import { Injectable } from '@nestjs/common';
import { GeminiService } from '../gemini/gemini.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CliService {
    constructor(
        private readonly geminiService: GeminiService,
        private readonly prisma: PrismaService,
    ) { }

    async generateQuestions(count: number = 10) {
        console.log(`${count} IA...`);

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
                    console.log(`- Question number #${i + 1} ignorated: ${q.optionA} or ${q.optionB}?`);
                    continue;
                }

                await this.prisma.question.create({ data: q });
                console.log(`- Question number #${i + 1} ${q.optionA} or ${q.optionB}?`);
            }

        } catch (error) {
            console.error(`Error generating questions:`, error);
        }

        console.log('Question generation completed.');
    }
}