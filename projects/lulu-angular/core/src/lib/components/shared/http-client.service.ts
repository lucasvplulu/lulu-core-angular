import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceType } from '../../core/enums/serviceType';
import { catchError} from "rxjs/operators";
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { throwError } from 'rxjs';

@Injectable()
export class HttpClientService {
  constructor(private http: HttpClient, private messageService: MessageService, private translateService: TranslateService) {}

  query(path: string, body: object, service: ServiceType = ServiceType.PAYROLL): Observable<any> {
    const endpoit = `hcm/${service}/queries/${path}`;
    return this.http.post(endpoit, body)
    .pipe(
        catchError((exception: any): any => {
            if (exception && exception.status === 403)
                this.messageService.add({
                    severity: 'error',
                    summary: this.translateService.instant('hcm.lulu-angular.error'),
                    detail: this.translateService.instant("hcm.lulu-angular.permission_error_not_allowed_search"),
                    sticky: true,
                });

            return throwError(exception);
        })
    );
  }

  enumQuery(path: string, body: object, server = 'lulu-angular'): Observable<any> {
    const endpoit = `hcm/${server}/queries/${path}`;
    return this.http.post(endpoit, body)
        .pipe(
            catchError((exception: any): any => {
                if (exception && exception.status === 403)
                    this.messageService.add({
                        severity: 'error',
                        summary: this.translateService.instant('hcm.lulu-angular.error'),
                        detail: this.translateService.instant("hcm.lulu-angular.permission_error_not_allowed_search"),
                        sticky: true,
                    });

                return throwError(exception);
            })
        );
  }

  action(path: string, body: object): Observable<any> {
    const endpoit = `hcm/payroll/actions/${path}`;
    return this.http.post(endpoit, body)
        .pipe(
            catchError((exception: any): any => {
                if (exception && exception.status === 403)
                    this.messageService.add({
                        severity: 'error',
                        summary: this.translateService.instant('hcm.lulu-angular.error'),
                        detail: this.translateService.instant("hcm.lulu-angular.permission_error_not_allowed"),
                        sticky: true,
                    });

                return throwError(exception);
            })
        );
  }

  recruitmentAction(path: string, body: object): Observable<any> {
    const endpoint = `hcm/recruitment/actions/${path}`;
    return this.http.post(endpoint, body)
        .pipe(
            catchError((exception: any): any => {
                if (exception && exception.status === 403)
                    this.messageService.add({
                        severity: 'error',
                        summary: this.translateService.instant('hcm.lulu-angular.error'),
                        detail: this.translateService.instant("hcm.lulu-angular.permission_error_not_allowed"),
                        sticky: true,
                    });

                return throwError(exception);
            })
        );
  }

  get(path: string): Observable<any> {
    const endpoit = `hcm/payroll/entities/${path}`;
    return this.http.get(endpoit)
        .pipe(
            catchError((exception: any): any => {
                if (exception.status === 403)
                    this.messageService.add({
                        severity: 'error',
                        summary: this.translateService.instant('hcm.lulu-angular.error'),
                        detail: this.translateService.instant("hcm.lulu-angular.permission_error_not_allowed_search"),
                        sticky: true,
                    });

                return throwError(exception);
            })
        );
  }

  getAutoComplete(entity: string, filter: string, service: ServiceType = ServiceType.PAYROLL): Observable<any> {
    const endpoit = `hcm/${service}/entities/${entity}?filter=${filter}&size=10&orderby=code+asc`;
    return this.http.get(endpoit)
        .pipe(
            catchError((exception: any): any => {
                if (exception && exception.status === 403)
                    this.messageService.add({
                        severity: 'error',
                        summary: this.translateService.instant('hcm.lulu-angular.error'),
                        detail: this.translateService.instant("hcm.lulu-angular.permission_error_not_allowed_search"),
                        sticky: true,
                    });

                return throwError(exception);
            })
        );
  }

  patch(path: string, body: object): Observable<any> {
    const endpoit = `hcm/payroll/entities/${path}`;
    return this.http.patch(endpoit, body)
        .pipe(
            catchError((exception: any): any => {
                if (exception && exception.status === 403)
                    this.messageService.add({
                        severity: 'error',
                        summary: this.translateService.instant('hcm.lulu-angular.error'),
                        detail: this.translateService.instant("hcm.lulu-angular.permission_error_not_allowed"),
                        sticky: true,
                    });

                return throwError(exception);
            })
        );
  }

  post(path: string, body: object): Observable<any> {
    const endpoit = `hcm/payroll/${path}`;
    return this.http.post(endpoit, body)
        .pipe(
            catchError((exception: any): any => {
                if (exception && exception.status === 403)
                    this.messageService.add({
                        severity: 'error',
                        summary: this.translateService.instant('hcm.lulu-angular.error'),
                        detail: this.translateService.instant("hcm.lulu-angular.permission_error_not_allowed"),
                        sticky: true,
                    });

                return throwError(exception);
            })
        );
  }

  put(path: string, body: object): Observable<any> {
    const endpoit = `hcm/payroll/entities/${path}`;
    return this.http.put(endpoit, body)
        .pipe(
            catchError((exception: any): any => {
                if (exception && exception.status === 403)
                    this.messageService.add({
                        severity: 'error',
                        summary: this.translateService.instant('hcm.lulu-angular.error'),
                        detail: this.translateService.instant("hcm.lulu-angular.permission_error_not_allowed"),
                        sticky: true,
                    });

                return throwError(exception);
            })
        );
  }

  delete(path: string, key?: string): Observable<any> {
    const endpoit = key ? `hcm/payroll/entities/${path}/${key}` : `hcm/payroll/entities/${path}`;
    return this.http.delete(endpoit)
        .pipe(
            catchError((exception: any): any => {
                if (exception && exception.status === 403)
                    this.messageService.add({
                        severity: 'error',
                        summary: this.translateService.instant('hcm.lulu-angular.error'),
                        detail: this.translateService.instant("hcm.lulu-angular.permission_error_not_allowed"),
                        sticky: true,
                    });

                return throwError(exception);
            })
        );
  }
}
