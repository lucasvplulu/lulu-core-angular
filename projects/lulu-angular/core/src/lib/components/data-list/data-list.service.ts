import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class DataListService {
  constructor(private http: HttpClient) {}

  getList(endpoint: string, httpParams: HttpParams): Observable<any> {
    return this.http.get(`${endpoint}`, { params: httpParams });
  }
}
