import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class DataListRestService {
  constructor(private http: HttpClient) {}

  getList(endpoint: string, body: object): Observable<any> {
    return this.http.post(`${endpoint}`, body);
  }
}
