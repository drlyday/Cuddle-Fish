import { Component, Input, OnInit } from '@angular/core';
import { QuestionBase } from './question-base';
import { Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';

export class DropdownEnumQuestion extends QuestionBase<string> {
  controlType = 'dropdown';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
    this.options = this.getOptions();
  }

  getOptions(): {key: string, value: string}[] {
      const newOptions: { key, value }[] = new Array<{key: string, value: string}>();
      for (const ee of this.options) {
        newOptions.push({key: ee, value: ee});
      }
      newOptions.push({key: '', value: ''});

      return newOptions;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
