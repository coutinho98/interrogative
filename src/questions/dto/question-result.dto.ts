import { Question } from "@prisma/client";

export class QuestionResultDto {
    id: string;
    optionA;
    optionB;
    votesA;
    votesB;
    percentA;
    percentB;

    constructor(question: Question) {
        this.id = question.id;
        this.optionA = question.optionA;
        this.optionB = question.optionB;
        this.votesA = question.votesA;
        this.votesB = question.votesB;

        const totalVotes = question.votesA + question.votesB;
        if (totalVotes === 0) {
            this.percentA = 0;
            this.percentB = 0;
        } else {
            this.percentA = Math.round((question.votesA / totalVotes) * 100);
            this.percentB = 100 - this.percentA;
        }

    }
}

