import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { InputRestAutoCompleteModelEnumService } from './input-rest-auto-complete-model-enum.service';

@Component({
  selector: 'input-rest-auto-complete-model-enum',
  templateUrl: './input-rest-auto-complete-model-enum.component.html',
  styleUrls: ['./input-rest-auto-complete-model-enum.component.css'],
})
export class InputRestAutoCompleteModelEnumComponent implements OnInit {
  private _model: any;
  @Input()
  name: string;
  @Input()
  placeholder: string;
  @Input()
  readonly: boolean;
  @Input()
  required: boolean;
  @Input()
  disabled: boolean;
  @Input()
  dropdown: boolean;
  @Input()
  forceSelection = true;
  @Input()
  error: object;
  @Input()
  emptyMessage: string;
  @Input()
  itemSelect: any;
  @Input()
  style: any;
  @Input()
  inputStyle: any;

  @Input()
  server: string;

  @Input()
  enumeration: string;

  @Output()
  onSelect: EventEmitter<any> = new EventEmitter();
  @Output()
  onBlur: EventEmitter<any> = new EventEmitter();
  @Output()
  onClear: EventEmitter<any> = new EventEmitter();
  @Output()
  modelChange: EventEmitter<any> = new EventEmitter();

  suggestions: any[] = [];
  payload: any[];

  constructor(private service: InputRestAutoCompleteModelEnumService) {}

  ngOnInit() {
    try {
      this.service.query(this.server, this.enumeration).subscribe(payload => (this.payload = payload.results));
    } catch (e) {
      console.log('Erro ao buscar no back');
    }
  }

  filterQuery(event: any) {
    const query = event.query;
    this.suggestions = [];
    if (!(isNaN(query) && query.toString().length < 3)) {
      for (let i = 0; i < this.payload[0].items.length; i++) {
        const item = this.payload[0].items[i];
        if (item.value.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
          this.suggestions.push(item);
        }
      }
    }
  }

  /**
   * Externiza a função de select das opções
   * <input-rest-auto-complete-enum (onSelect)="onSelectHandle($event)" ></input-rest-auto-complete-enum>
   * @param option
   */
  selectOption(option: object) {
    this.onSelect.emit(option);
  }

  onBlurItem(option: object) {
    this.onBlur.emit(option);
  }

  onClearItem(option: object) {
    this.onClear.emit(option);
  }

  set model(val) {
    this._model = val;
    this.modelChange.emit(this._model);
  }

  @Input()
  get model() {
    return this._model;
  }
}
