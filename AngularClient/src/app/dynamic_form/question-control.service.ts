// tslint:disable:import-spacing
import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';

import { QuestionBase } from './question-base';
import { TextboxQuestion } from './question-textbox';

@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: QuestionBase<any>[] ) {
    const group: any = {};

    questions.forEach(question => {
      group[question.key] = new FormControl(this.getQuestionValue(question.value), this.getValidators(question));
    });
    return new FormGroup(group);
  }

  getQuestionValue(qVal) {
    if (qVal === null || qVal === undefined) {
      return '';
    } else {
      return qVal;
    }
  }

  getValidators(question: QuestionBase<any>): ValidatorFn[] {
    const validators = new Array<ValidatorFn>();
    if (question.controlType === 'textbox') {
      const textbox = question as TextboxQuestion;
      if (textbox.type === 'number' && textbox.step === '1'){
        validators.push(this.isInteger);
      }
    }
    if ( question.required ) {
      validators.push(Validators.required)
    }

    return validators;
  }

  public isInteger = (control: FormControl) => {
      return this.check_if_is_integer(control.value) ? null : { notNumeric: true };
  }

  check_if_is_integer(value){
    // tslint:disable-next-line:radix
    if ((parseFloat(value) === parseInt(value)) && !isNaN(value)) {
       // I can have spacespacespace1 - which is 1 and validators pases but
       // spacespacespace doesn't - which is what i wanted.
       // 1space2 doesn't pass - good
       // of course, when saving data you do another parseInt.
        return true;
    } else if (value === '' || value === 'undefined') {
      return true;
    }
    else {
        return false;
    }
 }
}
