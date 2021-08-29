import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceType } from '../../core/enums';

import { HttpClientService } from '../shared/http-client.service';

@Injectable()
export class InputRestAutoCompleteModelService {
  constructor(private http: HttpClientService) {}

  query(path: string, body: object, service: ServiceType = ServiceType.PAYROLL): Observable<any> {
    return this.http.query(path, body, service);
  }
}
