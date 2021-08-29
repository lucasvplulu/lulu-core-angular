import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { SplitButton } from 'primeng/splitbutton';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EntityODataParameter } from '../../core/entities';
import { DirectionEnumeration } from '../../core/enums';
import { DataListService } from './data-list.service';
import { EntityODataResponse } from './entity-odata-response';

@Component({
  selector: 'c-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DataListComponent implements OnInit, OnDestroy {
  @ViewChild('dataListTable', { static: false })
  dataListTable: Table;

  @Input()
  id: string;
  @Input()
  dataKey: string;
  @Input()
  rows = 10;
  @Input()
  emptyMessage: string;
  @Input()
  columns: any[];
  @Input()
  paginator = true;
  @Input()
  first = 0;
  @Input()
  alwaysShowPaginator = true;
  @Input()
  actions?: Function;
  @Input()
  actionLabel: string;
  @Input()
  selectionMode: string;
  @Input()
  lazy: boolean;
  @Input()
  isMultipleSelection: boolean;
  @Input()
  isSortable: boolean;
  @Input()
  showHeaderCheckBox: boolean;
  @Input()
  sortMode = 'multiple';
  @Input()
  endpoint: string;
  @Input()
  displayFields: string[];
  @Input()
  orderBy: { field: string; direction: DirectionEnumeration }[];
  @Input()
  singularMessageRecords: string;
  @Input()
  pluralMessageRecords: string;
  @Input()
  initParameters: EntityODataParameter[];

  @Output()
  lazyLoad: EventEmitter<any> = new EventEmitter();
  @Output()
  loadingChange: EventEmitter<any> = new EventEmitter();
  @Output()
  totalRecordsChange: EventEmitter<any> = new EventEmitter();
  @Output()
  listDataChange: EventEmitter<any> = new EventEmitter();
  @Output()
  selectedDataChange: EventEmitter<any> = new EventEmitter();
  @Output()
  headerCheckboxToggle: EventEmitter<any> = new EventEmitter();

  private _httpParams: HttpParams = new HttpParams();
  private _loading: boolean;
  private _totalRecords: number;
  private _listData: any[];
  private _selectedData: any[];
  private ngUnsubscribe = new Subject();

  constructor(private dataListService: DataListService) {}

  ngOnInit() {
    if (!this.lazy) {
      this.getlistData();
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getActions(data: any, index: number) {
    return this.actions(data, index);
  }

  handleClickActions(button: SplitButton) {
    const toClick = button.containerViewChild.nativeElement.getElementsByClassName('ui-splitbutton-menubutton')[0] as HTMLElement;
    toClick.click();
  }

  pagination(event) {
    if (!this.lazy) {
      this.getlistData(event.rows, Math.floor(event.first / event.rows));
    }
  }

  onLazyLoad(event) {
    this.loading = true;

    if (event.multiSortMeta && event.multiSortMeta.length) {
      this.orderBy = <{ field: string; direction: DirectionEnumeration }[]>[];
      event.multiSortMeta.map(value => {
        this.orderBy.push({ field: value.field, direction: value.order === 1 ? DirectionEnumeration.ASC : DirectionEnumeration.DESC });
      });
    }

    this.getlistData(event.rows, Math.floor(event.first / event.rows));
  }

  onFilter() {
    if (this.lazy) {
      this.loading = true;
    }

    this.getlistData();
  }

  get recordsMessage() {
    return `${this.totalRecords || 0} ${this.totalRecords === 1 ? this.singularMessageRecords : this.pluralMessageRecords}`;
  }

  getlistData(size = this.rows, offset = this.first): void {
    if (this.endpoint) {
      this.configParameters(this.initParameters);
      this.configHttpParamsDisplayFields();
      this.configHttpParamsPagination(size.toString(), offset.toString());
      this.configHttpParamsOrderBy();
      this.dataListService
        .getList(this.endpoint, this.httpParams)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: EntityODataResponse) => {
          this.listData = data.contents;
          this.totalRecords = data.totalElements;
          if (this.lazy) {
            this.lazyLoad.emit(this.listData);
          }
        });
    } else {
      if (this.lazy) {
        this.lazyLoad.emit(this.listData);
      }
    }
  }

  /**
   *
   * @param size a quantidade de registros na página.
   * @param offset o número da página a ser recuperada, lembrando que a numeração de páginas começa em 0 (zero).
   */
  configHttpParamsPagination(size: string, offset: string): void {
    this.httpParams = this.httpParams.set('size', size);
    this.httpParams = this.httpParams.set('offset', offset);
  }

  /**
   * Gera o orderby do HttpParams
   */
  configHttpParamsOrderBy(): void {
    if (this.orderBy && this.orderBy.length) {
      let orderBy = '';
      this.orderBy.map(value => {
        if (orderBy) {
          orderBy += `,${value.field}+${value.direction}`;
        } else {
          orderBy += `${value.field}+${value.direction}`;
        }
      });

      this.httpParams = this.httpParams.set('orderby', orderBy);
    }
  }

  /**
   * Gera HttpParams dos campos a serem retornados na requisição.
   */
  configHttpParamsDisplayFields(): void {
    if (this.displayFields && this.displayFields.length) {
      this.httpParams = this.httpParams.set('displayfields', this.displayFields.toString());
    }
  }

  onHeaderCheckboxToggle(event) {
    this.headerCheckboxToggle.emit(event);
  }

  getFieldValue(rowData, col) {
    if (col['field'] && col['field'].includes('.')) {
      const objectPath = col['field'].split('.');
      objectPath.map(value => (rowData = rowData && rowData[value]));
      return rowData;
    }
    return rowData[col['field']];
  }

  private configParameters(entityODataParameters: EntityODataParameter[]) {
    let parameters = '';
    if (entityODataParameters) {
      entityODataParameters.forEach((parameter: EntityODataParameter) => {
        if (parameters) {
          parameters += ` and ${parameter.toString()}`;
        } else {
          parameters = `${parameter.toString()}`;
        }
      });

      this.httpParams = new HttpParams().set('filter', parameters);
    }
  }

  @Input()
  set parameters(entityODataParameters: EntityODataParameter[]) {
    this.configParameters(entityODataParameters);
    if (entityODataParameters) {
      if (this.dataListTable) {
        this.dataListTable.first = 0;
      }
      this.onFilter();
    }
  }

  set httpParams(value: HttpParams) {
    this._httpParams = value;
  }

  get httpParams() {
    return this._httpParams;
  }

  set loading(value: boolean) {
    this._loading = value;
    this.loadingChange.emit(this._loading);
  }

  @Input()
  get loading() {
    return this._loading;
  }

  set listData(value: any[]) {
    this._listData = value;
    this.listDataChange.emit(this._listData);
  }

  @Input()
  get listData() {
    return this._listData;
  }

  set selectedData(value: any[]) {
    this._selectedData = value;
    this.selectedDataChange.emit(this._selectedData);
  }

  @Input()
  get selectedData() {
    return this._selectedData;
  }

  set totalRecords(value: number) {
    this._totalRecords = value;
    this.totalRecordsChange.emit(this.totalRecords);
  }

  @Input()
  get totalRecords(): number {
    return this._totalRecords;
  }
}
