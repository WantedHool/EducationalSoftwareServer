export class TestResult{
    testResultId?: number;
    studentId?: number;
    testId?: number;
    totalGrade: number;

    constructor(){
        this.totalGrade = 0
    }
}