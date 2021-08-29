import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { _moment, isValid } from './../utils/helpers';
import { InputRestAutoCompleteService } from './input-rest-auto-complete.service';
import { ServiceType } from '../../core/enums/serviceType';

export interface IConditions {
  fields: Array<string[]>;
  fieldType: string;
  expression: string;
  value: string;
}

@Component({
  selector: 'l-input-rest-auto-complete',
  templateUrl: './input-rest-auto-complete.component.html',
  styleUrls: ['./input-rest-auto-complete.component.css'],
})
export class InputRestAutoCompleteComponent implements OnInit {
  @ViewChild('autoCompleteObject', { static: true })
  _autoCompleteObject: ElementRef;
  @Input()
  name: string;
  @Input()
  table: string;
  @Input()
  order: Array<any[]>;
  @Input()
  enableEntityFilters: boolean;
  @Input()
  fields: Array<any[]>;
  @Input()
  conditionsFields?: Array<any[]>;
  @Input()
  conditions: Array<IConditions>;
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
  keyCode?: string;
  @Input()
  keyName = 'name';
  @Input()
  concatFieldsForName?: any[];
  @Input()
  itemSelect: any;
  @Input()
  form: FormGroup;
  @Input()
  inputId: string;
  @Input()
  isTimetrackingSituation: boolean;
  @Input()
  isDepartmentFromCompany: boolean;
  @Input()
  companyId: string;
  @Input()
  referenceDate: string;
  @Input()
  isDismissalReason: boolean;
  @Input()
  keyToExclude: any = [];
  @Input()
  usingType: any = [];
  @Input()
  minCharactersToSearch = 3;
  @Input()
  isWagetype: boolean;
  private isDropdown: boolean;
  @Input()
  multiple = false;
  @Input()
  serviceType: ServiceType = ServiceType.PAYROLL;
  @Output()
  onBlur: EventEmitter<any> = new EventEmitter();
  @Output()
  onSelect: EventEmitter<any> = new EventEmitter();
  @Output()
  onClear: EventEmitter<any> = new EventEmitter();

  suggestions: any[] = [];

  constructor(private service: InputRestAutoCompleteService) {}

  ngOnInit() {}

  filterQuery(event: any): any {
    const query = event.query;
    if (!(isNaN(query) && query.toString().length < this.minCharactersToSearch)) {
      try {
        if (this.isTimetrackingSituation) {
          return this.service
            .query('autocompleteTimetrackingSituation', {
              valueSearch: query,
              referenceDate: this.referenceDate,
            })
            .subscribe(payload => this.formaterResponce(payload.result));
        } else if (this.isDismissalReason) {
          const params = { valueSearch: query };
          if (this.referenceDate) {
            params['referenceDate'] = this.referenceDate;
          }
          return this.service
            .query('autocompleteDismissalReason', params, ServiceType.GENERAL_REGISTER)
            .subscribe(payload => this.formaterResponce(payload.result));
        } else if (this.usingType && this.usingType.length) {
          return this.service
            .query('autocompleteOtherCompanyFilterUsingType', {
              searchText: query,
              usingType: this.usingType,
            })
            .subscribe(payload => this.formaterResponce(payload.result));
        } else if (this.isDepartmentFromCompany) {
          return this.service
            .query('autocompleteDepartmentQuery', {
              searchText: query,
              companyId: this.companyId,
              referenceDate: this.referenceDate,
            })
            .subscribe(payload => this.formaterResponce(payload.result));
        } else if (this.isWagetype) {
            const params = { searchText: query, companyId: this.companyId };
            return this.service
            .query('autocompleteWagetypeQuery', params, ServiceType.ENTRY)
            .subscribe(payload => this.formaterResponce(payload.result));
        }
        this.service
            .query('autocomplete', this.getParamsRest(query), this.serviceType).subscribe(payload => this.formaterResponce(payload.result));
      } catch (e) {
        console.log(e);
      }
    }
  }

  formaterResponce(result) {
    this.suggestions = [];
    const valsResult = [];
    result.map(value => {
      const valueConcat = {
        tableId: value.tableId,
        name: '',
      };
      if (this.isTimetrackingSituation || this.isDismissalReason || (this.usingType && this.usingType.length)) {
        if (this.keyToExclude.includes(value.fields && value.fields[2] && value.fields[2].value)) {
          return;
        }

        let fieldName = '';

        value.fields.map(val => {
          valueConcat[val.name] = val.value;
        });

        fieldName += value.fields.filter(val => val.name.toLowerCase() === 'code').map(code => (code ? (code.value += ' - ') : ''))[0];
        if (this.usingType && this.usingType.length && (!fieldName || fieldName === 'undefined')) {
          fieldName = '';
        }
        fieldName += value.fields.filter(val => val.name.toLowerCase() === 'name').map(name => (name ? name.value : ''))[0];

        valueConcat.name = fieldName;
        valsResult.push(valueConcat);
      } else {
        value.fields.map(val => {
          valueConcat[val.name] = val.value;
        });
        let fieldName = '';
        if (this.concatFieldsForName) {
          this.concatFieldsForName.map(val => {
            // se o campo for data, formata pro locale do usuário
            if (val.includes('date') || val.includes('Birthday')) {
              valueConcat[val] = _moment(valueConcat[val]).format('DD/MM/YYYY');
            }
            fieldName += valueConcat[val] + ' - ';
          });
          fieldName = fieldName.slice(0, -3);
        } else {
          if (this.keyCode) {
            fieldName += valueConcat[this.keyCode] + ' - ';
          }
          if (this.keyName) {
            fieldName += valueConcat[this.keyName];
          }
        }
        valueConcat.name = fieldName;
        valsResult.push(valueConcat);
      }
    });
    this.suggestions = [...valsResult];
    return valsResult;
  }

  getParamsRest(search: string): object {
    return {
      table: this.table,
      fields: this.fields,
      order: this.order,
      conditions: this.getConditionsRest(search),
      enableEntityFilters: this.enableEntityFilters,
    };
  }

  getConditionsRest(search: string) {
    const conditiosReturn = [
      {
        fields: this.conditionsFields || this.fields,
        expression: 'LIKE',
        value: `${search}`,
      },
    ];

    if (this.conditions) {
      this.conditions.map(val => {
        if (['IS_NULL', 'IS_NOT_NULL', 'IS_TRUE'].includes(val.expression) || isValid(val.value)) {
          conditiosReturn.push(val);
        }
      });
    }

    return conditiosReturn;
  }

  /**
   * Externiza a função de select das opções
   * <input-rest-auto-complete (onSelect)="onSelectHandle($event)" ></input-rest-auto-complete>
   * @param option
   */
  selectOption(option: object) {
    this.onSelect.emit(option);
  }

  async onClearItem(option: object) {
    await this.onClear.emit(option);
    this.form.get(this.name).reset();
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

  get autoCompleteObject() {
    return this._autoCompleteObject;
  }
}
