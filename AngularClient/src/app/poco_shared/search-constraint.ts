export class SearchConstraint {
  operator: string;
  fieldName: string;
  constraint: string;
  type: string;
  value: string;

  static likeString(value: string) {
    value = value  ? '\'%' + value.toLowerCase() + '%\'' : '\'%%\'';
    return value;
  }

  constructor(op: string, field: string, constraint: string, type: string, value: string) {
    this.operator = op;
    this.fieldName = field;
    this.constraint = constraint;
    this.type = type;
    this.value = value;
  }
}
