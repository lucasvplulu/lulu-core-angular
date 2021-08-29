import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClientService } from '../shared/http-client.service';
import { ServiceType } from '../../core/enums/serviceType';

@Injectable()
export class InputRestAutoCompleteService {
  constructor(private http: HttpClientService) {}

  query(path: string, body: object, service: ServiceType = ServiceType.PAYROLL): Observable<any> {
    return this.http.query(path, body, service);
  }
}
