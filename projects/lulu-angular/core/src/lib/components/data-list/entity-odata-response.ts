export class EntityODataResponse {
  private _totalPages: number;
  private _totalElements: number;
  private _contents: any[];

  constructor(entityODataResponse: any) {
    this.totalPages = entityODataResponse.totalPages;
    this.totalElements = entityODataResponse.totalElements;
    this.contents = entityODataResponse.contents;
  }

  set totalPages(value: number) {
    this._totalPages = value;
  }

  get totalPages() {
    return this._totalPages;
  }

  set totalElements(value: number) {
    this._totalElements = value;
  }

  get totalElements() {
    return this._totalElements;
  }

  set contents(value: any[]) {
    this._contents = value;
  }

  get contents() {
    return this._contents;
  }
}
