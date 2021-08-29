import { Component, OnInit, EventEmitter, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { InputRestAutoCompleteEnumService } from './input-rest-auto-complete-enum.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'input-rest-auto-complete-enum',
  templateUrl: './input-rest-auto-complete-enum.component.html',
  styleUrls: ['./input-rest-auto-complete-enum.component.css']
})
export class InputRestAutoCompleteEnumComponent implements OnInit {

  @ViewChild('autoCompleteObject', { static: true }) _autoCompleteObjectEl: ElementRef;
  @Input() name: string;
  @Input() placeholder: string;
  @Input() readonly: boolean;
  @Input() required: boolean;
  @Input() disabled: boolean;
  @Input() dropdown: boolean;
  @Input() forceSelection = true;
  @Input() error: object;
  @Input() emptyMessage: string;
  @Input() itemSelect: any;
  @Input() inputId: string;
  private isDropdown: boolean;
  @Input() keyToExclude: any = [];
  @Input() keyToKeep: any = [];

  @Input() server: string;
  @Input() enumeration: string;
  @Input() form: FormGroup;
  @Input() multiple = false;

  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Output() onBlur: EventEmitter<any> = new EventEmitter();
  @Output() onClear: EventEmitter<any> = new EventEmitter();

  suggestions: any[] = [];
  payload: any[];

  constructor(private service: InputRestAutoCompleteEnumService) {
  }

  ngOnInit() {
    try {
      this.service.query(this.server, this.enumeration).subscribe(
        payload =>
        this.payload = payload.results[0].items);
    } catch (e) {
      console.log('Erro ao buscar no back');
    }
  }

  filterQuery(event: any) {
    const query = event.query;
    this.suggestions = [];
    if (!(isNaN(query) && (query.toString().length < 3))) {
      if (this.keyToExclude && this.keyToExclude.length) {
        this.payload = this.payload && this.payload.filter(record => !this.keyToExclude.includes(record.key));
      } else if (this.keyToKeep && this.keyToKeep.length) {
        this.payload = this.payload && this.payload.filter(record => this.keyToKeep.includes(record.key));
      }
      for (let i = 0; i < this.payload.length; i++) {
        const item = this.payload[i];
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
    if (!this.isDropdown) {
      this.form.controls[this.name].markAsDirty();
      this.onBlur.emit(option);
    } else {
      this.isDropdown = false;
    }
  }

  onDropdownClick() {
    this.isDropdown = true;
  }

  async onClearItem(option: object) {
    await this.onClear.emit(option);
    this.form.get(this.name).reset();
  }

  get autoCompleteObject() {
    return this._autoCompleteObjectEl;
  }
}
