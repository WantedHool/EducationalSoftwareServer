import { Component, OnInit } from '@angular/core';
import { QuestionType } from '../models/questionType';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

	// @Input() data: OrderItemOptionOption[] = [];
	// @Input() selectedLanguage: Language;
	// @Output() dataChanged = new EventEmitter<OrderItemOptionOption[]>();
	// @Input() optionIndex: number;

	constructor() {

	}

	ngOnInit() {
	}

  onQuestionTypeChange(option: QuestionType) {
    
	}


	// addRow() {
	// 	const option = new OrderItemOptionOption();
	// 	option.translations = [];
	// 	this.data.push(option);
	// }

	// remove(option: OrderItemOptionOption) {
	// 	const index = this.data.indexOf(option);
	// 	if (index !== -1) {
	// 		this.data.splice(index, 1);
	// 		this.dataChanged.emit(this.data);
	// 	}
	// }

	// managePreSelected(event: any, option: OrderItemOptionOption) {
	// 	if (!event.checked) return;

	// 	this.data.forEach(x => {
	// 		if (x.description !== option.description || x.id !== option.id) {
	// 			x.preSelected = false;
	// 		}
	// 	})
	// }


}
