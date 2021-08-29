import { Operators } from '../enums';

export class EntityODataParameter {
  private _field: string;
  private _operation: Operators;
  private _value: any;

  constructor(entityODataParameter: { field: string; value: string; operation?: Operators }) {
    this.field = entityODataParameter.field;
    this.value = entityODataParameter.value;
    this.operation = entityODataParameter.operation;
  }

  set field(value) {
    this._field = value;
  }

  get field() {
    return this._field;
  }

  set operation(value) {
    this._operation = value;
  }

  get operation() {
    return this._operation;
  }

  set value(value) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  public toString(): string {
    if (this.operation === Operators.CONTAINING) {
      return `${this.operation}(lower(${this.field}), lower(${this.value}))`;
    }
    return `${this.field} ${this.operation || ''} ${this.value}`;
  }
}
