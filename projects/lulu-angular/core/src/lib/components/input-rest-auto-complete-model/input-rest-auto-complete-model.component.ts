import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ServiceType } from '../../core/enums/serviceType';
import { InputRestAutoCompleteModelService } from './input-rest-auto-complete-model.service';
import { isValid, _moment } from './../utils/helpers';

export interface IConditions {
    fields: Array<string[]>;
    fieldType: string;
    expression: string;
    value: string;
}

@Component({
    selector: 'input-rest-auto-complete-model',
    templateUrl: './input-rest-auto-complete-model.component.html',
    styleUrls: ['./input-rest-auto-complete-model.component.css'],
})

export class InputRestAutoCompleteModelComponent implements OnInit {

    private _model: any;
    @Input() name: string;
    @Input() table: string;
    @Input() order: Array<any[]>;
    @Input() fields: Array<any[]>;
    @Input() conditionsFields?: Array<any[]>;
    @Input() conditions: Array<IConditions>;
    @Input() placeholder: string;
    @Input() readonly: boolean;
    @Input() required: boolean;
    @Input() disabled: boolean;
    @Input() dropdown: boolean;
    @Input() forceSelection = true;
    @Input() error: object;
    @Input() emptyMessage: string;
    @Input() keyCode: string;
    @Input() keyName = 'name';
    @Input() concatFieldsForName?: any[];
    @Input() itemSelect: any;
    @Input() style: any;
    @Input() inputStyle: any;
    @Input() keysToExclude: any = [];
    @Input() isWagetype: boolean;
    @Input() companyId: string;
    @Input() wagetypeReferenceDates?: { entryReferenceStartDate: string, entryReferenceEndDate: string };
    @Output() onBlur: EventEmitter<any> = new EventEmitter();
    @Output() onSelect: EventEmitter<any> = new EventEmitter();
    @Output() onClear: EventEmitter<any> = new EventEmitter();
    @Output() onFocus: EventEmitter<any> = new EventEmitter();
    @Output() modelChange: EventEmitter<any> = new EventEmitter();

    suggestions: any[] = [];

    constructor(private service: InputRestAutoCompleteModelService) {
    }

    ngOnInit() {

    }

    filterQuery(event: any) {
        const query = event.query;
        if (!(isNaN(query) && (query.toString().length < 3))) {
            try {
                if (this.isWagetype) {
                    const params = { searchText: query, companyId: this.companyId, ...this.wagetypeReferenceDates };
                    return this.service
                        .query('autocompleteWagetypeQuery', params, ServiceType.ENTRY)
                        .subscribe(payload => this.formaterResponce(payload.result));
                }
                this.service.query('autocomplete', this.getParamsRest(query)).subscribe(payload => this.formaterResponce(payload.result));
            } catch (e) {
                console.log('Erro ao buscar no back');
            }
        }
    }

    formaterResponce(result) {
        this.suggestions = [];
        const valsResult = [];
        result.map((value) => {
            const valueConcat = {
                tableId: value.tableId,
                name: '',
            };
            value.fields.map((val) => {
                valueConcat[val.name] = val.value;
            });

            if (this.keysToExclude.includes(value && value.tableId)) {
                return;
            }

            let fieldName = '';
            if (this.concatFieldsForName) {
                this.concatFieldsForName.map(val => {
                    // se o campo for data, formata pro locale do usuário
                    if (val.includes('date')) {
                        valueConcat[val] = _moment(valueConcat[val]).format('L');
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
        });
        this.suggestions = valsResult;
        return valsResult;
    }

    getParamsRest(search: string): object {
        return {
            'table': this.table,
            'fields': this.fields,
            'order': this.order,
            'conditions': this.getConditionsRest(search),
        };
    }

    getConditionsRest(search: string) {
        const conditiosReturn = [{
            'fields': this.conditionsFields || this.fields,
            'expression': 'LIKE',
            'value': `${ search }`,
        }];

        if (this.conditions) {
            this.conditions.map(val => {
                if (!['IS_NULL', 'IS_NOT_NULL', 'IS_TRUE'].includes(val.expression)
                    && isValid(val.value)) {
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

    onClearItem(option: object) {
        this.onClear.emit(option);
    }

    onBlurItem(option: object) {
        this.onBlur.emit(option);
    }

    onFocusItem(option: object) {
        this.onFocus.emit(option);
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
