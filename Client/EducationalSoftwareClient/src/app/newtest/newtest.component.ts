import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../models/question';
import { Test } from '../models/test';

@Component({
  selector: 'app-newtest',
  templateUrl: './newtest.component.html',
  styleUrls: ['./newtest.component.css']
})
export class NewtestComponent implements OnInit {
  @Input() data: Question[] = [];

  constructor(private router: Router) { }
  test:Test={
    description: '',
    questions: []
  };
  ngOnInit(): void {
  }

  addNewQuestion() {
		const option = new Question();
		option.description = "";
		option.type = "";
		option.category = "";
    option.questionAnswers=[];
		this.test.questions.push(option);
	}

  saveTest(){
    console.log(this.test);
  }
}
