import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { DirectionEnumeration } from '../../core/enums';
import { DataListRestService } from './data-list-rest.service';

@Component({
  selector: 'l-data-list-rest',
  templateUrl: './data-list-rest.component.html',
  styleUrls: ['./data-list-rest.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DataListRestService],
})
export class DataListRestComponent implements OnInit, OnDestroy {
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
  first = 1;
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
  totalRecords: number;
  @Input()
  orderBy: { field: string; direction: DirectionEnumeration }[];
  @Input()
  singularMessageRecords: string;
  @Input()
  pluralMessageRecords: string;
  @Input()
  keyPayload: string;
  @Input()
  initParameters: any;

  @Output()
  lazyLoad: EventEmitter<any> = new EventEmitter();
  @Output()
  loadingChange: EventEmitter<any> = new EventEmitter();
  @Output()
  listDataChange: EventEmitter<any> = new EventEmitter();
  @Output()
  selectedDataChange: EventEmitter<any> = new EventEmitter();
  @Output()
  headerCheckboxToggle: EventEmitter<any> = new EventEmitter();

  private _loading: boolean;
  private _listData: any[];
  private _selectedData: any[];
  private _searchParameters: any;
  private ngUnsubscribe = new Subject();

  constructor(private dataListService: DataListRestService) {}

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

    this.getlistData(event.rows, Math.floor(event.first / event.rows) + 1);
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
      this.dataListService
        .getList(this.endpoint, {
          page: { current: offset, size: size, orderBy: this.orderBy },
          ...this.initParameters,
          ...this._searchParameters,
        })
        .pipe(
          takeUntil(this.ngUnsubscribe),
          map((data: any) => data && data.result)
        )
        .subscribe((data: any) => {
          this.listData = data[this.keyPayload];
          this.totalRecords = data.countResult;
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

  @Input()
  set parameters(searchParameters: any) {
    if (searchParameters) {
      this._searchParameters = { ...searchParameters };

      if (this.dataListTable) {
        this.dataListTable.first = 0;
      }

      this.onFilter();
    }
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
}
