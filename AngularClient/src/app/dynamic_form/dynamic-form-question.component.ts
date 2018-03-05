import { Component, Input, OnInit } from '@angular/core';
import { FormGroup }                from '@angular/forms';

import { BehaviorSubject }      from 'rxjs/BehaviorSubject';
import { Observable, Subject }  from 'rxjs/Rx';

import { QuestionBase } from './question-base';

@Component({
  selector: 'df-question',
  templateUrl: 'dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent implements OnInit {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

  ngOnInit() {
    this.question.init();
  }

  getFormLabel() {
    if (this.question.required) {
      return this.question.label + '*';
    } else {
      return this.question.label;
    }
  }
}
