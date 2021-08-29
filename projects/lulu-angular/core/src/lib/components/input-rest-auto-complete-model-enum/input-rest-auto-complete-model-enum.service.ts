import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClientService } from '../shared/http-client.service';

@Injectable()
export class InputRestAutoCompleteModelEnumService {
  constructor(private http: HttpClientService) {}

  query(server: string, enumeration: string): Observable<any> {
    const endpoit = `enumQuery`;
    const request = {
      names: [enumeration],
    };
    return this.http.enumQuery(endpoit, request, server);
  }
}
