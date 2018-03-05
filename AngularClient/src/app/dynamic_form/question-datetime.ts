import { QuestionBase } from './question-base';

export class DateTimeQuestion extends QuestionBase<string> {
  controlType = 'datetime-local';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
