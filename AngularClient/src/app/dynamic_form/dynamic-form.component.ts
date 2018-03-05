// tslint:disable:import-spacing
import { Component, Input, Output, OnInit, OnChanges, EventEmitter }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { Router }                    from '@angular/router';

import { BehaviorSubject }     from 'rxjs/BehaviorSubject';
import { Observable, Subject } from 'rxjs/Rx';

import { QuestionBase }              from './question-base';
import { QuestionControlService }    from './question-control.service';
import { MatSnackBar }                from '@angular/material';

@Component({
  selector: 'dynamic-form',
  templateUrl: 'dynamic-form.component.html',
  providers: [ QuestionControlService ]
})

export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() questions: QuestionBase<any>[] = [];
  @Input() action = 'update';
  @Input() endpoint: string;
  @Input() pocokey: string;
  @Input() icon: string;
  @Input() canDelete = false;

  @Output() onFormSubmit = new EventEmitter<any>();
  @Output() onDeleteEvent = new EventEmitter<any>();

  errorMessage: string = undefined;

  form: FormGroup;

  constructor(private readonly questionControlService: QuestionControlService) { }

  ngOnInit() {
    this.form = this.questionControlService.toFormGroup(this.questions);
  }

  ngOnChanges() {
    this.form = this.questionControlService.toFormGroup(this.questions);
  }

  onReset() { 
    this.ngOnChanges(); 
  }

  // reset() {
  //  // this.form.updateValueAndValidity();
  //  // this.form.get('').
  // }

  onSubmit() {
    const payLoad = JSON.stringify(this.form.value);
    this.onFormSubmit.emit(this.form.value);
  }

  onDelete() {
    this.onDeleteEvent.emit();
  }
}
