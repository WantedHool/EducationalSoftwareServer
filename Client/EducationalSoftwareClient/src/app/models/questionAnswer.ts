
export class QuestionAnswer {
    questionAnswerId: number;
    questionId: number;
    answer: string;
    isRight: boolean;

    constructor(){
        this. questionAnswerId = 0;
        this. questionId = 0;
        this.answer = "";
        this.isRight = false;
    }
}