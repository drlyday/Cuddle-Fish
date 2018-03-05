export class SearchOrder {
  fieldName: string;
  ascDescEnum: string;

  constructor (name, direction = 'desc') {
    this.fieldName = name;
    this.ascDescEnum = direction;
  }
}
