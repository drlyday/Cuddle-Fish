import { QuestionBase } from './question-base';

export class BooleanQuestion extends QuestionBase<string> {
  controlType = 'boolean';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
