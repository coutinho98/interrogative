import { Injectable, OnModuleInit } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService implements OnModuleInit {
  private genAI: GoogleGenerativeAI;
  private model: any;

  async onModuleInit() {
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      throw new Error('key not found...');
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async generateQuestions(count: number): Promise<{ optionA: string; optionB: string }[]> {
    const prompt = `
      Generate a single list of ${count} pairs of opposing options for binary choice questions.
      The options should be short (1 to 3 words), about varied topics, and not too serious or political.
      The output must be a numbered list with the two options separated by a forward slash ("/").
      Do not include any extra text.

      Examples:
      1. Coffee/Tea
      2. Cat/Dog
      3. Summer/Winter
      4. Ocean/Mountains
      5. Book/Movie

      Generate a list of ${count} new pairs.
    `;
    
    const maxRetries = 3;
    const delayBetweenRetries = 2000;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        const result = await this.model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const questions = text.split('\n')
          .map(line => line.replace(/^\d+\.\s*/, ''))
          .filter(line => line.includes('/'))
          .map(line => {
            const [optionA, optionB] = line.split('/');
            return { optionA: optionA.trim(), optionB: optionB.trim() };
          });

        return questions;
      } catch (error) {
        console.warn(`Try ${i + 1} of ${maxRetries} falied. trying in ${delayBetweenRetries / 1000}s...`);
        if (i === maxRetries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, delayBetweenRetries));
      }
    }
    
    return []; 
  }
}