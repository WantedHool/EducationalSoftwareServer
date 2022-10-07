import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../models/question';
import { Student } from '../models/student';
import { StudentAnswer } from '../models/student-answer';
import { Test } from '../models/test';
import { TestsService } from '../services/tests-service';

@Component({
  selector: 'app-student-test',
  templateUrl: './student-test.component.html',
  styleUrls: ['./student-test.component.css']
})
export class StudentTestComponent implements OnInit {
  test: Test = new Test();
  studentId: number = 0;
  currentQuestion = new Question();
  count: number = 1;
  studentAnswers: StudentAnswer[] = [];
  constructor(private testsSrv: TestsService,
              public router: Router) { }

  ngOnInit(): void {
    let testId = Number(localStorage.getItem('testId'));
    this.studentId = ((JSON.parse(localStorage.getItem('student') ?? '')) as Student).studentId ?? 0
    this.testsSrv.getTestById(testId).subscribe(x => {
      this.test = x as Test
      this.currentQuestion = this.test.questions[0]
    })
  }

  onClick() {
    if (this.count === this.test.questions.length) {
      this.testsSrv.answerTest(this.studentAnswers).subscribe(x => this.router.navigate(['home/Teacher/theory']));
    }
    else {
      this.currentQuestion = this.test.questions[this.count];
      this.count++;
    }
  }

  addAnswer(event: any, answer: string) {
    if (event.checked) {
      let studentAnswer: StudentAnswer = new StudentAnswer();
      studentAnswer.questionId = this.currentQuestion.questionId;
      studentAnswer.studentAnswerId = 0;
      studentAnswer.testId = this.test.testId;
      studentAnswer.studentResult = answer;
      studentAnswer.studentId = this.studentId;
      this.studentAnswers.push(studentAnswer);
    }
    else {
      this.studentAnswers = this.studentAnswers.filter(x => !(x.questionId === this.currentQuestion.questionId && x.studentResult === answer));
    }


  }

}
