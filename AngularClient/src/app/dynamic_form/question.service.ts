// tslint:disable:import-spacing
import { Injectable }       from '@angular/core';
import { Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { DropdownQuestion } from './question-dropdown';
import { DropdownHTTPQuestion } from './question-http-dropdown';
import { DropdownEnumQuestion } from './question-enum-dropdown';
import { QuestionBase }     from './question-base';
import { TextboxQuestion } from './question-textbox';
import { DateTimeQuestion } from './question-datetime';
import { BooleanQuestion } from './question-boolean';
import { PocoBaseMetadata } from '../metadata/poco-base';
import { PocoMetadata } from '../metadata/pocoMetadata';
import { PocoRenderingService } from '../poco_shared/poco-rendering.service';
import { PocoFormattingService } from '../poco_shared/poco-formatting.service';

@Injectable()
export class QuestionService {
  isCreateQuestion = false;
  isQuestionFormRequired: boolean;

  constructor(private readonly http: HttpClient,
              private readonly pocoRenderingService: PocoRenderingService,
              private readonly pocoFormattingService: PocoFormattingService) { }

  getQuestionsForSearch(pocoBaseMetamodel: PocoBaseMetadata, poco?: object): Promise<QuestionBase<any>[]> {
    return this.getQuestions(pocoBaseMetamodel, poco, false, true);
  }

  getQuestionsForCreate(pocoBaseMetamodel: PocoBaseMetadata, poco?: object): Promise<QuestionBase<any>[]> {
    this.isCreateQuestion = true;
    return this.getQuestions(pocoBaseMetamodel, poco, false, false);
  }

  // Todo: get from a remote source of question metadata
  // Todo: make asynchronous
  getQuestions(pocoBaseMetamodel: PocoBaseMetadata, poco?: object, isRequiredOverride?: boolean, isQuestionForSearch?: boolean): Promise<QuestionBase<any>[]> {
    const pocoMetamodels = pocoBaseMetamodel.metadata;
    const primaryKey = pocoBaseMetamodel['primaryKey'];
    const dataRenderers = new Array<Promise<QuestionBase<any>>>();
    // https://stackoverflow.com/questions/11922383/access-process-nested-objects-arrays-or-json
    for (const modelMetadata of pocoMetamodels) {
      const pocoValue = (poco == null) ? '' : poco[modelMetadata.value];
      if (modelMetadata.reference && pocoValue !== null && pocoValue !== '') {
        const pocoMetadataRef = modelMetadata.reference;
        const renderer = this.pocoRenderingService.initForDropDown2(modelMetadata, pocoMetadataRef)
                            .then(metadata => this.pocoRenderingService
                                                  .getPocosByKeyForDropDown(pocoMetadataRef, pocoValue, metadata))
                            .then(data => this.getQuestion(modelMetadata, pocoValue, isRequiredOverride, '', poco, data));
        dataRenderers.push(renderer);
      } else {
        const controlType = this.getHtmlInputControlAttribute(modelMetadata['type']);
        const typeRequiresStartEndQuestions = isQuestionForSearch && controlType !== 'text' && controlType != 'checkbox';
        const prefixStart = typeRequiresStartEndQuestions ? 'Start' : '';
        const prefixEnd = typeRequiresStartEndQuestions ? 'End' : '';

        const renderer = this.pocoRenderingService
                             .initForDropDown(modelMetadata, modelMetadata.reference)
                             .then(x => this.getQuestion(modelMetadata, pocoValue, isRequiredOverride, prefixStart, poco));

        dataRenderers.push(renderer);

        if (isQuestionForSearch && typeRequiresStartEndQuestions) {
          const renderer2 = this.pocoRenderingService
                                .initForDropDown(modelMetadata, modelMetadata.reference)
                                .then(x => this.getQuestion(modelMetadata, pocoValue, isRequiredOverride, prefixEnd, poco));
          dataRenderers.push(renderer2);
        }
      }
    }

    const result = Promise.all(dataRenderers).then(questions => questions.sort((a, b) => a.order - b.order));
    return result;
  }

  getQuestion(modelMetadata: PocoMetadata, modelAnswer: any, isRequiredOverride: boolean, prefix: string = '',
              model?, modelAnswerOptions?: {key: string, value: string}[] ): Promise<QuestionBase<any>> {
    let newQuestion: QuestionBase<any>;
    switch (this.getMappedServerToClientControlType(modelMetadata['type'])) {
      case 'select':
        if (modelMetadata['reference']) {
          newQuestion = new DropdownHTTPQuestion(
            this.http,
            {
                  key: modelMetadata['value'],
                  label: prefix + ' ' + modelMetadata['label'],
                  value: model ? this.getFormattedPocoValue(modelAnswer, modelMetadata['type']) : '',
                  options: modelAnswerOptions,
                  optionsSource: modelMetadata['reference'],
                  required: this.isRequired(isRequiredOverride, modelMetadata),
                  order: modelMetadata['order'],
                  metadata: modelMetadata
            },
            this.pocoRenderingService
          );
        } else if (modelMetadata['enumeration']) {
          newQuestion = new DropdownEnumQuestion({
                    key: modelMetadata['value'],
                    label: modelMetadata['label'],
                    value: model ? this.getFormattedPocoValue(modelAnswer, modelMetadata['type']) : '',
                    options: modelMetadata['enumeration'],
                    required: this.isRequired(isRequiredOverride, modelMetadata),
                    order: modelMetadata['order']
                });
        } else {
          newQuestion = new DropdownQuestion({
                    key: modelMetadata['value'],
                    label: modelMetadata['label'],
                    value: model ? this.getFormattedPocoValue(modelAnswer, modelMetadata['type']) : '',
                    options: modelMetadata['enumeration'],
                    required: this.isRequired(isRequiredOverride, modelMetadata),
                    order: modelMetadata['order']
                });
        }
        break;
        case 'input':
        {
          const isPrefixUsed = prefix !== undefined && prefix.trim() != ''
          const searchBoundryTag = isPrefixUsed ? '::' + prefix : '';
          const finalPrefix = isPrefixUsed ? (prefix + ': ') : '';
          newQuestion = new TextboxQuestion({
                    key: modelMetadata['value'] + searchBoundryTag,
                    label: finalPrefix + modelMetadata['label'], // + ' ' + pocoValue,
                    value: model ? this.getFormattedPocoValue(modelAnswer, modelMetadata['type'])
                                 : this.getDefaultTextboxValue(isRequiredOverride, modelMetadata),
                    options: modelMetadata['options'],
                    required: this.isRequired(isRequiredOverride, modelMetadata),
                    order: modelMetadata['order'],
                    type: this.getHtmlInputControlAttribute(modelMetadata['type']),
                    step: this.getStep(modelMetadata['type'])
                });
        }
        break;
        case 'slider':
        {
          newQuestion = new BooleanQuestion({
                    key: modelMetadata['value'],
                    label: modelMetadata['label'], // + ' ' + pocoValue,
                    value: model ? this.getFormattedPocoValue(modelAnswer, modelMetadata['type'])
                                : this.getBooleanDefault(isRequiredOverride, modelMetadata),
                    options: modelMetadata['options'],
                    required: this.isRequired(isRequiredOverride, modelMetadata),
                    order: modelMetadata['order'],
                    type: this.getHtmlInputControlAttribute(modelMetadata['type'])
                });
        }
        break;
        default:
          newQuestion = new TextboxQuestion({
              key: modelMetadata['value'],
              label: modelMetadata['label'] + ' DEFAULT CONTROL -> Unidentified METADATA',
              value: model ? modelMetadata['value'] : '',
              options: modelMetadata['options'],
              required: this.isRequired(isRequiredOverride, modelMetadata),
              order: modelMetadata['order'],
              type: this.getHtmlInputControlAttribute(modelMetadata['type'])
            });
          alert('Unidentified Control Type. Only Input and Select inputs types are generated right now.');
      }
      return new Promise(resolve => resolve(newQuestion));
  }

  private isRequired(isRequiredOverride: boolean, pocoMetadata: PocoMetadata) {
    return (isRequiredOverride !== undefined) ? isRequiredOverride : pocoMetadata['required'];
  }

  private getFormattedPocoValue(pocoValue: string, type: string) {
    if (type.toLowerCase()  === 'boolean') {
      if (pocoValue && pocoValue !== null) {
        return pocoValue;
      }
      return false;
    } else if (type.toLowerCase() === 'datetime' && pocoValue) {
      return this.pocoFormattingService.formatDate(type.toLowerCase(), pocoValue);
    } else {
      return pocoValue;
    }
  }

  private getBooleanDefault(isRequiredOverride: boolean, pocoMetadata: PocoMetadata) {
    const isRequired = this.isRequired(isRequiredOverride, pocoMetadata);
    if (isRequired) {
      return false;
    } else {
      return '';
    }
  }

  getDefaultTextboxValue(isRequiredOverride: boolean, pocoMetadata: PocoMetadata): any {
    const type = pocoMetadata['type'];
    if (type.toLowerCase() === 'datetime' || type.toLowerCase() === 'date') {
      const isRequired = this.isRequired(isRequiredOverride, pocoMetadata);
      if (isRequired) {
        return this.pocoFormattingService.formatDate(type.toLowerCase());
      }
    } else {
      return '';
    }
  }

  // We need to translate what the server sent us.
  private getMappedServerToClientControlType(type: string) {
    if (type.toLowerCase() === 'text') {
      return 'input';
    }else if (type.toLowerCase() === 'datetime') {
      return 'input';
    }else if (type.toLowerCase() === 'date') {
      return 'input';
    }else if (type.toLowerCase() === 'reference') {
      return 'select';
    }else if (type.toLowerCase() === 'enumeration') {
      return 'select';
    }  else if (type.toLowerCase() === 'typeAheadDropdown') {
      return 'select';
    } else if (type.toLowerCase() === 'boolean') {
      return 'slider';
    } else {
      return 'input';
    }
  }

  // Ex: Input Control has many types specified as an attribute
  private getHtmlInputControlAttribute(type: string) {
    if (type.toLowerCase() === 'text') {
      return 'text';
    }else if (type.toLowerCase() === 'integer' || type.toLowerCase() === 'real') {
      return 'number';
    }  else if (type.toLowerCase() === 'datetime') {
      return 'datetime-local';
    } else if (type.toLowerCase() === 'date') {
      return 'date';
    } else if (type.toLowerCase() === 'boolean') {
      return 'checkbox';
    } else {
      return 'text';
    }
  }

  getStep(type: string): any {
    if (type.toLowerCase() === 'integer') {
      return '1';
    } else if (type.toLowerCase() === 'real') {
      return 'any';
    }
  }

}
