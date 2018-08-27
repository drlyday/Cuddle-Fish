import { Component, Input } from '@angular/core';
import { QuestionBase } from './question-base';
import { Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { PocoRenderingService } from '../poco_shared/poco-rendering.service';
import { PocoMetadata } from '../metadata/pocoMetadata';
import { PocoBaseMetadata } from '../metadata/poco-base';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable, Subject } from 'rxjs/Rx';

export class DropdownHTTPQuestion extends QuestionBase<string> {
  controlType = 'typeAheadDropdown';
  filteredOptions: Subject<{key: string, value: string}[]> = new BehaviorSubject([]);
  optionsSource = '';  // URL to web api
  selector: string;
  contents: {key: string, value: string}[];
  metadata: PocoMetadata;
  refBaseMetadata: PocoBaseMetadata;
  isInitialized = false;

  constructor(private http: HttpClient, options: {} = {}, private pocoRenderingService: PocoRenderingService) {
    super(options);
    this.optionsSource = options['optionsSource'];
    this.metadata = options['metadata'];
    this.selector = options['selector'];
    if (options['options']) {
      this.pocoRenderingService.initForDropDown2(this.metadata, this.optionsSource)
                               .then(pocoRefBaseMetadata => this.refBaseMetadata = pocoRefBaseMetadata);
      this.setContent(options['options']);
    } else {
      this.pocoRenderingService.initForDropDown2(this.metadata, this.optionsSource)
          .then(pocoRefBaseMetadata => this.refBaseMetadata = pocoRefBaseMetadata)
          .then(x => this.goGetData(''));
    }
  }

  displayFn(value: string) {
    if (!this.contents) {
      return '';
    }

    const ret = this.contents.find(x => x.key === value);
    return (ret === undefined) ? '' : ret.value;
  }

  onDropDownChange(val: string) {
      this.goGetData(val);
  }

  goGetData(val: string) {
    this.pocoRenderingService.getPocosForDropDown(this.optionsSource, val, this.refBaseMetadata)
    .then(dropDownContent => this.setContent(dropDownContent));
  }

  getInitDataRe(val: string): Promise<{key: string, value: string}[]> {
    const renderer = this.pocoRenderingService.getPocosForDropDown(this.optionsSource, val, this.refBaseMetadata);
    return renderer;
  }

  setContent(content: {key: string, value: string}[]) {
    this.contents = content;
    this.filteredOptions.next(content);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
