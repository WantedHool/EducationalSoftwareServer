export class StudentAnswer{
    studentAnswerId?: number;
    testId?: number;
    studentId?: number;
    questionId?: number;
    studentResult? : string;

    constructor(){
        this.studentAnswerId = 0;
        this.testId = 0;
        this.studentId = 0;
        this.questionId = 0;
        this.studentResult = "";
    }
}