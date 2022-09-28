import { QuestionAnswer } from "./questionAnswer";

export class Question {
    questionId: number;
    testId: number;
    description: string;
    type: string;
    category: string;
    questionAnswers: QuestionAnswer[];

    constructor(){
        this.questionId = 0;
        this.testId = 0;
        this.description = "";
        this.type = "";
        this.category = "";
        this.questionAnswers=[];
    }
}
