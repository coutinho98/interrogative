import { IsString, IsIn } from 'class-validator'

export class VoteDto {
    @IsString()
    questionId: string;

    @IsString()
    @IsIn(['optionA', 'optionB'])
    option: 'optionA' | 'optionB'
}