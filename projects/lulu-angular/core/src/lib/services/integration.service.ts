import { Injectable } from '@angular/core';

import { HttpClientService } from '../components/shared/http-client.service';
import { Observable } from 'rxjs';

@Injectable()
export class IntegrationService {
  constructor(private http: HttpClientService) {}

  hasModule(module): Observable<any> {
    return this.http.query('hasModule', { module: module });
  }
}
