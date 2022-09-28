import { Question } from "./question";

export class Test{
    testId?: number;
    description?: string;
    chapterId?: number;
    class?: string;
    active?: boolean;
    studentId?: number
    questions: Question[];
    constructor(){
        this.questions = [];
    }
}