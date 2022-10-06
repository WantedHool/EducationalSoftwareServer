import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionAnswer } from '../models/questionAnswer';

@Component({
  selector: 'app-questionanswers',
  templateUrl: './questionanswers.component.html',
  styleUrls: ['./questionanswers.component.css']
})
export class QuestionanswersComponent implements OnInit {
  @Input() data: QuestionAnswer[] = [];

  constructor(private router: Router) { }
  answers : QuestionAnswer={
    answer: '',
    isRight: false,
    questionAnswerId: 0,
    questionId: 0
  };
  ngOnInit(): void {
  }

  addNewAnswer() {
		const option = new QuestionAnswer();
		option.answer = "";
		option.isRight = false;
    console.log(this.answers);
	}
}
