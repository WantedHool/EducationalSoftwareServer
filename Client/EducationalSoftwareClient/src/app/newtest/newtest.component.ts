import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../models/question';
import { QuestionAnswer } from '../models/questionAnswer';
import { Test } from '../models/test';

interface QuestionType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-newtest',
  templateUrl: './newtest.component.html',
  styleUrls: ['./newtest.component.css']
})
export class NewtestComponent implements OnInit {
  @Input() data: Question[] = [];
  @Input() dataAnswers: QuestionAnswer[] = [];
  
  selectedValue: string = "";
  
  questionTypes: QuestionType[] = [
    // {value: 'textBox', viewValue: 'TextBox'},
    {value: 'singleSelect', viewValue: 'Απλή επιλογής'},
    {value: 'numeric', viewValue: 'Αριθμητική'},
    {value: 'boolean', viewValue: 'Σ/Λ'},
    {value: 'multiselect', viewValue: 'Πολλαπλής επιλογής'}
  ];

  constructor(private router: Router) {}
  
   test:Test={
    description: '',
    questions: []
  };
  
  answers : QuestionAnswer={
    answer: '',
    isRight: false,
    questionAnswerId: 0,
    questionId: 0
  };
  
  questionType : QuestionType[] = [];

  ngOnInit(): void {
  }

  addNewQuestion() {
		const option = new Question();
		option.description = "";
		option.type = "";
		option.category = "";
    option.questionAnswers=[];
		this.test.questions.push(option);
    console.log(this.test);
	}
  addNewAnswer() {
		const option = new QuestionAnswer();
		option.answer = "";
		option.isRight = false;
    console.log(this.answers);
	}
  saveTest(){
    console.log(this.test);
  }
}
