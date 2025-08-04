import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
    private genAI: GoogleGenerativeAI;
    private model: any;

    async onModuleInit() {
        const apiKey = process.env.GOOGLE_API_KEY;

        if (!apiKey) {
            throw new Error('A chave GOOGLE_API_KEY não foi encontrada no arquivo .env.');
        }

        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    }

    async generateQuestion(): Promise<{ optionA: string; optionB: string }> {
        const prompt = `Gere uma única pergunta binária que cause um leve conflito de opinião.
      As opções de resposta devem ser curtas, com no máximo 3 palavras, e sem pontuação no final.
      Responda apenas com a pergunta e as duas opções, separadas por uma barra.
      Por exemplo: Doce ou Salgado? Doce/Salgado
      Outro exemplo: Viajar ou Ficar? Viajar/Ficar
      Outro exemplo: Café ou Chá? Café/Chá
    `;

        const result = await this.model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const [optionA, optionB] = text.split('/');

        return { optionA: optionA.trim(), optionB: optionB.trim() };
    }
}
